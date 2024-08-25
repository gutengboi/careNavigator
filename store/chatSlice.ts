import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_KEY } from "../config/auth";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  messages: [],
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk<
  Message,
  { text: string },
  { rejectValue: string }
>("chat/sendMessage", async ({ text }, { rejectWithValue }) => {
  try {
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      text,
      sender: "user",
    };

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: text }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Ensure the response structure is correct
    if (!response.data.choices || !response.data.choices.length) {
      throw new Error("Invalid response from OpenAI");
    }

    const botResponse = response.data.choices[0].message.content;

    const botMessage: Message = {
      id: `${Date.now()}-bot`,
      text: botResponse,
      sender: "bot",
    };

    const chatHistory = await AsyncStorage.getItem("chat");
    const updatedChat = chatHistory
      ? [...JSON.parse(chatHistory), userMessage, botMessage]
      : [userMessage, botMessage];
    await AsyncStorage.setItem("chat", JSON.stringify(updatedChat));

    return botMessage;
  } catch (error: any) {
    console.error("Failed to send message:", error);
    return rejectWithValue(
      error.response?.data?.message || "Failed to send message"
    );
  }
});

// Thunk to load chat history
export const fetchChatHistory = createAsyncThunk<
  Message[],
  void,
  { rejectValue: string }
>("chat/fetchChatHistory", async (_, { rejectWithValue }) => {
  try {
    const chatHistory = await AsyncStorage.getItem("chat");
    if (chatHistory) {
      return JSON.parse(chatHistory);
    }
    return [];
  } catch (error) {
    return rejectWithValue("Failed to load chat history");
  }
});

// Thunk to clear chat history
export const clearChatHistory = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("chat/clearChatHistory", async (_, { rejectWithValue }) => {
  try {
    await AsyncStorage.removeItem("chat");
    return;
  } catch (error) {
    return rejectWithValue("Failed to clear chat history");
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(clearChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearChatHistory.fulfilled, (state) => {
        state.loading = false;
        state.messages = [];
      })
      .addCase(clearChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export selectors to access the chat state
export const selectChatMessages = (state: { chat: ChatState }) =>
  state.chat.messages;
export const selectChatLoading = (state: { chat: ChatState }) =>
  state.chat.loading;
export const selectChatError = (state: { chat: ChatState }) => state.chat.error;

export default chatSlice.reducer;
