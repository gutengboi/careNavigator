import { COLORS } from "@/constants";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface SymptomQuestionProps {
  question: string;
  onAnswer: (answer: boolean) => void;
}

export const SymptomQuestion = ({
  question,
  onAnswer,
}: SymptomQuestionProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Kindly Answer the Question below with Yes or No</Text>
      <Text style={styles.question}>{question}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => onAnswer(true)}
          style={[styles.button, styles.yesButton]}
        >
          <Text style={styles.buttonText}>YES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onAnswer(false)}
          style={[styles.button, styles.noButton]}
        >
          <Text style={styles.buttonText}>NO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 380,
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: "semibold",
    marginBottom: 30,
    textAlign: "center",
  },
  question: {
    fontSize: 18,
    marginVertical: 20,
    marginBottom: 50,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: "40%",
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: "center",
  },
  yesButton: {
    backgroundColor: COLORS.primary,
  },
  noButton: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: 'semibold'
  },
});
