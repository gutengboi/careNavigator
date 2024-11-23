import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "../config/auth";

interface User {
  email: string;
  username?: string;
  location?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

// const APP_TOKEN = "my-App-token";
// const STREAM_TOKEN_KEY = "my-stream-token";
//export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const login = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const user = response.data;
    await AsyncStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    console.log(error);
    return rejectWithValue(
      error.response?.data?.message || "Invalid email or password"
    );
  }
});

export const signup = createAsyncThunk<
  User,
  { email: string; password: string; username: string; },
  { rejectValue: string }
>(
  "auth/signup",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        username,
      });
      const user = response.data;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const verifyRegistrationOTP = createAsyncThunk<
  void,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/verifyRegistrationOTP", async ({ email, otp }, { rejectWithValue }) => {
  try {
    await axios.post(`${API_URL}/verify-registration-otp`, { email, otp });
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Invalid OTP");
  }
});

export const forgotPassword = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>("auth/forgotPassword", async ({ email }, { rejectWithValue }) => {
  try {
    await axios.post(`${API_URL}/forgot-password`, { email });
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to send reset OTP."
    );
  }
});

export const resetPassword = createAsyncThunk<
  void,
  { email: string; otp: string; newPassword: string },
  { rejectValue: string }
>(
  "auth/resetPassword",
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/reset-password`, {
        email,
        otp,
        newPassword,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password."
      );
    }
  }
);

export const verifyOTP = createAsyncThunk<
  void,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/verifyOTP", async ({ email, otp }, { rejectWithValue }) => {
  try {
    await axios.post(`${API_URL}/verify-otp`, { email, otp });
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Invalid OTP");
  }
});

export const logout = createAsyncThunk<null, void>("auth/logout", async () => {
  try {
    await AsyncStorage.removeItem("user");
    return null;
  } catch (error) {
    return Promise.reject("Logout failed");
  }
});

export const fetchUser = createAsyncThunk<User | null, void>(
  "auth/fetchUser",
  async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch (error) {
      return Promise.reject("Failed to fetch user");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = !!action.payload;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(verifyRegistrationOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyRegistrationOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyRegistrationOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectIsLoggedIn = (state: { auth: AuthState }) =>
  state.auth.isLoggedIn;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
