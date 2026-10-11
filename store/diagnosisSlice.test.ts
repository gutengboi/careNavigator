import diagnosisReducer, { answerQuestion, diagnose, resetDiagnosis } from "./diagnosisSlice";

jest.mock("@/utils/diseases", () => [
  { name: "Flu", symptoms: ["fever", "cough"], cause: "", prevention: "", treatment: "" },
  { name: "Cold", symptoms: ["cough", "sneeze"], cause: "", prevention: "", treatment: "" },
]);

type DiagnosisState = ReturnType<typeof diagnosisReducer>;

describe("diagnosisSlice", () => {
  const initialState: DiagnosisState = {
    currentQuestion: 0,
    answeredQuestions: {},
    diagnosis: null,
  };

  it("returns the initial state", () => {
    expect(diagnosisReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("records an answered symptom and advances currentQuestion", () => {
    const state = diagnosisReducer(
      initialState,
      answerQuestion({ symptom: "fever", answer: true })
    );
    expect(state.answeredQuestions.fever).toBe(true);
    expect(state.currentQuestion).toBe(1);
  });

  it("diagnoses the disease with the most matched symptoms", () => {
    let state: DiagnosisState = initialState;
    state = diagnosisReducer(state, answerQuestion({ symptom: "fever", answer: true }));
    state = diagnosisReducer(state, answerQuestion({ symptom: "cough", answer: true }));
    state = diagnosisReducer(state, diagnose());
    // Flu matches 2 symptoms (fever, cough); Cold matches only 1 (cough).
    expect(state.diagnosis).toBe("Flu");
  });

  it("breaks ties by picking the first disease reaching the max match count", () => {
    let state: DiagnosisState = initialState;
    state = diagnosisReducer(state, answerQuestion({ symptom: "cough", answer: true }));
    state = diagnosisReducer(state, diagnose());
    // Both Flu and Cold match 1 symptom (cough); Flu is listed first.
    expect(state.diagnosis).toBe("Flu");
  });

  it('falls back to "No disease found" when nothing matches', () => {
    const state = diagnosisReducer(initialState, diagnose());
    expect(state.diagnosis).toBe("No disease found");
  });

  it("resetDiagnosis clears answers, question index, and diagnosis", () => {
    let state: DiagnosisState = diagnosisReducer(
      initialState,
      answerQuestion({ symptom: "fever", answer: true })
    );
    state = diagnosisReducer(state, diagnose());
    state = diagnosisReducer(state, resetDiagnosis());
    expect(state).toEqual(initialState);
  });
});
