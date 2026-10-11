import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { login } from "./authSlice";
import { requestWithRetry } from "../utils/apiClient";

jest.mock("../utils/apiClient", () => ({
  requestWithRetry: jest.fn(),
  getErrorMessage: (_error: unknown, fallback: string) => fallback,
}));

function createTestStore() {
  return configureStore({ reducer: { auth: authReducer } });
}

describe("login thunk - remember me persistence", () => {
  const user = { email: "a@b.com", username: "a" };

  beforeEach(() => {
    (requestWithRetry as jest.Mock).mockReset().mockResolvedValue(user);
  });

  it("persists the user to AsyncStorage when rememberMe is true", async () => {
    const store = createTestStore();
    await store.dispatch(login({ email: "a@b.com", password: "password1", rememberMe: true }));

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(user));
    expect(store.getState().auth.isLoggedIn).toBe(true);
  });

  it("clears any previously remembered user when rememberMe is false", async () => {
    await AsyncStorage.setItem("user", JSON.stringify({ email: "old@b.com" }));

    const store = createTestStore();
    await store.dispatch(login({ email: "a@b.com", password: "password1", rememberMe: false }));

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user");
    expect(await AsyncStorage.getItem("user")).toBeNull();
    // The session is still active for this app run even though it won't
    // survive a restart.
    expect(store.getState().auth.isLoggedIn).toBe(true);
  });
});
