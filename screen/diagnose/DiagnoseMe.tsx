import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { DiagnosisResult } from "@/components/DiagnosisResult";
import { SymptomQuestion } from "@/components/SymptomQuestion";
import { shuffleQuestions } from "@/constants/shuffleQuestions";
import { RootState } from "@/store";
import {
  answerQuestion,
  diagnose,
  resetDiagnosis,
} from "@/store/diagnosisSlice";

const DiagnoseMe = () => {
  const dispatch = useDispatch();
  const { currentQuestion, diagnosis } = useSelector(
    (state: RootState) => state.diagnosis
  );
  const [questionCount, setQuestionCount] = useState(0);
  const symptomsList = shuffleQuestions().slice(0, 7); // Limit questions to 6

  const handleAnswer = (symptom: string, answer: boolean) => {
    dispatch(answerQuestion({ symptom, answer }));
    setQuestionCount(questionCount + 1);

    if (questionCount + 1 >= 7 || currentQuestion + 1 >= symptomsList.length) {
      dispatch(diagnose());
    }
  };

  return (
    <View style={styles.container}>
      {!diagnosis ? (
        <SymptomQuestion
          question={`Do you suffer from ${symptomsList[currentQuestion]}?`}
          onAnswer={(answer) =>
            handleAnswer(symptomsList[currentQuestion], answer)
          }
        />
      ) : (
        <DiagnosisResult
          diagnosis={diagnosis}
          onReset={() => {
            dispatch(resetDiagnosis());
            setQuestionCount(0);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
});

export default DiagnoseMe;
