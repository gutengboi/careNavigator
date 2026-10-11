import authReducer, { login, signup, logout, fetchUser, resetPassword } from "./authSlice";

describe("authSlice", () => {
  const initialState = {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  };

  it("returns the initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("login.pending sets loading and clears any previous error", () => {
    const state = authReducer(
      { ...initialState, error: "stale error" },
      { type: login.pending.type }
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("login.fulfilled logs the user in and stores the payload", () => {
    const user = { email: "a@b.com", username: "a" };
    const state = authReducer(initialState, { type: login.fulfilled.type, payload: user });
    expect(state.isLoggedIn).toBe(true);
    expect(state.user).toEqual(user);
    expect(state.loading).toBe(false);
  });

  it("login.rejected stores the error message", () => {
    const state = authReducer(initialState, {
      type: login.rejected.type,
      payload: "Invalid email or password",
    });
    expect(state.error).toBe("Invalid email or password");
    expect(state.isLoggedIn).toBe(false);
  });

  it("login.rejected with no payload falls back to null instead of undefined", () => {
    const state = authReducer(initialState, { type: login.rejected.type, payload: undefined });
    expect(state.error).toBeNull();
  });

  it("signup.fulfilled logs the user in just like login", () => {
    const user = { email: "new@b.com", username: "new" };
    const state = authReducer(initialState, { type: signup.fulfilled.type, payload: user });
    expect(state.isLoggedIn).toBe(true);
    expect(state.user).toEqual(user);
  });

  it("fetchUser.rejected sets a fixed error message (payload is never usable here)", () => {
    const state = authReducer(initialState, { type: fetchUser.rejected.type });
    expect(state.error).toBe("Failed to fetch user");
  });

  it("resetPassword.rejected with no payload falls back to null", () => {
    const state = authReducer(initialState, {
      type: resetPassword.rejected.type,
      payload: undefined,
    });
    expect(state.error).toBeNull();
  });

  it("logout.fulfilled clears the logged-in user", () => {
    const loggedIn = { isLoggedIn: true, user: { email: "a@b.com" }, loading: false, error: null };
    const state = authReducer(loggedIn, { type: logout.fulfilled.type });
    expect(state.isLoggedIn).toBe(false);
    expect(state.user).toBeNull();
  });
});
