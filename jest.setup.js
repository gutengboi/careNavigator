/* eslint-env jest */

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// @expo/vector-icons checks Font.isLoaded() synchronously when constructing an
// icon set, which calls into a native module with no real backing under Jest.
// Treat fonts as always loaded so icon components render instead of crashing.
jest.mock("expo-font", () => ({
  ...jest.requireActual("expo-font"),
  isLoaded: () => true,
}));
