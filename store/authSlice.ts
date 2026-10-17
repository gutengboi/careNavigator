import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  requestWithRetry,
  getErrorMessage,
  setAuthToken,
  setStreamToken,
} from "../utils/apiClient";

interface User {
  email: string;
  username?: string;
  location?: string;
}

interface LoginResponse {
  appToken: string;
  streamToken: string;
  user: User;
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
  { email: string; password: string; rememberMe: boolean },
  { rejectValue: string }
>("auth/login", async ({ email, password, rememberMe }, { rejectWithValue }) => {
  try {
    const { user, appToken, streamToken } = await requestWithRetry<LoginResponse>({
      method: "post",
      url: "/login",
      data: { email, password },
    });
    if (rememberMe) {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("appToken", appToken);
      await AsyncStorage.setItem("streamToken", streamToken);
    } else {
      // Clear out any previously remembered session so this login doesn't
      // survive an app restart just because an earlier one opted in.
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("appToken");
      await AsyncStorage.removeItem("streamToken");
    }
    setAuthToken(appToken);
    setStreamToken(streamToken);
    return user;
  } catch (error) {
    console.log(error);
    return rejectWithValue(getErrorMessage(error, "Invalid email or password"));
  }
});

export const signup = createAsyncThunk<
  User,
  { email: string; password: string; username: string },
  { rejectValue: string }
>("auth/signup", async ({ email, password, username }, { rejectWithValue }) => {
  try {
    // /register only returns a confirmation message (the account isn't
    // verified yet), so build the user from what we already know rather
    // than from the response body.
    const response = await requestWithRetry<{ otp?: string }>({
      method: "post",
      url: "/register",
      data: { email, password, username },
    });
    if (__DEV__ && response?.otp) {
      console.log("[DEV] Registration OTP:", response.otp);
    }
    // Don't persist the session or log the user in yet — the account isn't
    // verified until verifyRegistrationOTP succeeds, and the new fetchUser()
    // session restore on launch would otherwise treat an unverified signup
    // as a logged-in user.
    return { email, username };
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Signup failed"));
  }
});

export const verifyRegistrationOTP = createAsyncThunk<
  void,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/verifyRegistrationOTP", async ({ email, otp }, { rejectWithValue }) => {
  try {
    await requestWithRetry({
      method: "post",
      url: "/verify-registration-Otp",
      data: { email, otp },
    });
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Invalid OTP"));
  }
});

export const forgotPassword = createAsyncThunk<void, { email: string }, { rejectValue: string }>(
  "auth/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await requestWithRetry<{ otp?: string }>({
        method: "post",
        url: "/forgot-password",
        data: { email },
      });
      if (__DEV__ && response?.otp) {
        console.log("[DEV] Password reset OTP:", response.otp);
      }
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to send reset OTP."));
    }
  }
);

export const resetPassword = createAsyncThunk<
  void,
  { email: string; otp: string; newPassword: string },
  { rejectValue: string }
>("auth/resetPassword", async ({ email, otp, newPassword }, { rejectWithValue }) => {
  try {
    await requestWithRetry({
      method: "post",
      url: "/reset-password",
      data: { email, otp, newPassword },
    });
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to reset password."));
  }
});

export const verifyOTP = createAsyncThunk<
  void,
  { email: string; otp: string },
  { rejectValue: string }
>("auth/verifyOTP", async ({ email, otp }, { rejectWithValue }) => {
  try {
    await requestWithRetry({
      method: "post",
      url: "/verify-otp",
      data: { email, otp },
    });
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Invalid OTP"));
  }
});

export const logout = createAsyncThunk<null, void>("auth/logout", async () => {
  try {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("appToken");
    await AsyncStorage.removeItem("streamToken");
    setAuthToken(null);
    setStreamToken(null);
    return null;
  } catch {
    return Promise.reject("Logout failed");
  }
});

export const fetchUser = createAsyncThunk<User | null, void>("auth/fetchUser", async () => {
  try {
    const userString = await AsyncStorage.getItem("user");
    if (!userString) {
      return null;
    }
    const [appToken, streamToken] = await Promise.all([
      AsyncStorage.getItem("appToken"),
      AsyncStorage.getItem("streamToken"),
    ]);
    setAuthToken(appToken);
    setStreamToken(streamToken);
    return JSON.parse(userString);
  } catch {
    return Promise.reject("Failed to fetch user");
  }
});

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
        state.error = action.payload ?? null;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        // Not logged in yet — the account still needs OTP verification.
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? null;
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
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch user";
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
        state.error = action.payload ?? null;
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
        state.error = action.payload ?? null;
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
        state.error = action.payload ?? null;
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
        state.error = action.payload ?? null;
      });
  },
});

export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
