import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '@/config/auth';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { COLORS } from '@/constants';

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
}; 

interface CustomMessageProps {
  currentMessage: IMessage;
}

export const Chatbot = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const test = async (userMessage: string) => {
    try {
      setIsTyping(true);
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ],
        model: 'gpt-4o-mini',
      });
  
      const aiMessage = completion.choices[0].message.content;
      const newMessage: IMessage = {
        _id: uuid.v4() as string,
        text: aiMessage,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'AI Assistant',
          avatar: 'https://placeimg.com/140/140/any',
        },
      };
  
      setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };
  
  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const userMessage = messages[0].text;
    test(userMessage);
  }, []);
  
  const CustomMessageText: React.FC<CustomMessageProps> = ({ currentMessage }) => {
    const textColor = currentMessage.user._id === 1 ? 'white' : 'black';

    return (
      <Markdown
        style={{
          body: {
            marginHorizontal: 10,
            fontSize: 16,
            color: textColor,
          },
          lineHeight: 20,
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        {currentMessage.text}
      </Markdown>
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Ionicons name="send" size={24} color= {COLORS.primary} />
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputPrimary}
      />
    );
  };

  return (
    <ImageBackground 
      source={require('../assets/images/careBot.jpeg')} // Add your background image here
      style={styles.background}
    >
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
        renderMessageText={CustomMessageText}
        isTyping={isTyping}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        placeholder="Type a message..."
        showUserAvatar
        renderAvatarOnTop
        alwaysShowSend
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    opacity: 0.7
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  inputToolbar: {
    borderTopWidth: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputPrimary: {
    backgroundColor: COLORS.gray2,
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 10,
  },
});

export default Chatbot;
