import diseases from '@/utils/diseases';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface DiagnosisState {
  currentQuestion: number;
  answeredQuestions: Record<string, boolean>;
  diagnosis: string | null;
}

const initialState: DiagnosisState = {
  currentQuestion: 0,
  answeredQuestions: {},
  diagnosis: null,
};

export const diagnosisSlice = createSlice({
  name: 'diagnosis',
  initialState,
  reducers: {
    answerQuestion: (state, action: PayloadAction<{ symptom: string, answer: boolean }>) => {
      state.answeredQuestions[action.payload.symptom] = action.payload.answer;
      state.currentQuestion += 1;
    },
    diagnose: (state) => {
      let maxMatches = 0;
      let likelyDisease = '';

      diseases.forEach(disease => {
        const matches = disease.symptoms.filter(symptom => state.answeredQuestions[symptom]).length;
        if (matches > maxMatches) {
          maxMatches = matches;
          likelyDisease = disease.name;
        }
      });

      state.diagnosis = likelyDisease || 'No disease found';
    },
    resetDiagnosis: (state) => {
      state.currentQuestion = 0;
      state.answeredQuestions = {};
      state.diagnosis = null;
    },
  },
});

export const { answerQuestion, diagnose, resetDiagnosis } = diagnosisSlice.actions;
export default diagnosisSlice.reducer;
