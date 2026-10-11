import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import diagnosisReducer from "@/store/diagnosisSlice";
import DiagnoseMe from "./DiagnoseMe";

function renderWithStore() {
  const store = configureStore({ reducer: { diagnosis: diagnosisReducer } });
  return render(
    <Provider store={store}>
      <DiagnoseMe />
    </Provider>
  );
}

describe("DiagnoseMe", () => {
  it("shows a yes/no symptom question first", () => {
    renderWithStore();
    expect(screen.getByText("YES")).toBeOnTheScreen();
    expect(screen.getByText("NO")).toBeOnTheScreen();
  });

  it("shows a diagnosis result after answering all 7 questions", () => {
    renderWithStore();

    for (let i = 0; i < 7; i++) {
      fireEvent.press(screen.getByText("YES"));
    }

    expect(screen.getByText("Diagnosis Result")).toBeOnTheScreen();
    expect(screen.queryByText("YES")).toBeNull();
  });
});
