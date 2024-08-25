// import { View, Text, SafeAreaView } from 'react-native'
// import React from 'react'
// import ColorList from '@/components/ColorList'

// const Create = () => {
//   return (
//     <SafeAreaView style={{ flex: 1, }}>
//     <View style={{ marginTop: 50 }}>
//       <ColorList color="#4C74AC" />
//     </View>
//   </SafeAreaView>
//   )
// }

// export default Create


import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const posts = [
  {
    id: '1',
    type: 'image',
    title: 'Just created a new character. What should I call him',
    uri: 'https://i.ebayimg.com/images/g/Ty0AAOSwMWJiErcL/s-l400.png',
    likes: 533,
    comments: 232,
  },
  {
    id: '2',
    type: 'text',
    title: 'Here’s a cool fact: React Native allows you to build mobile apps using only JavaScript!',
    likes: 150,
    comments: 45,
  },
  {
    id: '3',
    type: 'image',
    title: 'Just created a new character. What should I call him',
    uri: 'https://m.media-amazon.com/images/I/51-RP1QQE8L._AC_UY900_.jpg',
    likes: 533,
    comments: 232,
  },
  {
    id: '4',
    type: 'video',
    title: 'Check out this awesome gameplay!',
    uri: 'https://www.example.com/video.mp4', // Replace with a valid video URL
    likes: 789,
    comments: 320,
  },
];

const Create = () => {
  const renderItem = ({ item }: { item: typeof posts[0] }) => {
    return (
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        {item.type === 'image' && (
          <Image source={{ uri: item.uri }} style={styles.postImage} />
        )}
        {item.type === 'text' && (
          <Text style={styles.postText}>{item.title}</Text>
        )}
        
        {item.type === 'video' && (
          <Video
            source={{ uri: item.uri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            isLooping
            style={styles.postVideo}
          />
        )}
        <View style={styles.postActions}>
          <TouchableOpacity>
            <Ionicons name="arrow-up-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.postStats}>{item.likes}</Text>
          <TouchableOpacity>
            <Ionicons name="arrow-down-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.postStats}>{item.comments}</Text>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="share-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  postTitle: {
    color: 'white',
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  postText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  postVideo: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStats: {
    color: 'white',
    marginHorizontal: 5,
  },
});

export default Create;
