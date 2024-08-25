import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import Prevention from "./Prevention";
import diseases from "@/utils/diseases";
import Treatment from "./Treatment";
import Cause from "./Cause";
import { COLORS } from "@/constants";

interface DiagnosisResultProps {
  diagnosis: string;
  onReset: () => void;
}

export const DiagnosisResult = ({
  diagnosis,
  onReset,
}: DiagnosisResultProps) => {
  const [modalVisible, setModalVisible] = useState<{
    cause: boolean;
    prevention: boolean;
    treatment: boolean;
  }>({
    cause: false,
    prevention: false,
    treatment: false,
  });

  // Find the details for the diagnosed disease
  const disease = diseases.find((d) => d.name === diagnosis);

  if (!disease) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Diagnosis Result</Text>
        <Text style={styles.diagnosis}>Diagnosis not found.</Text>
        <TouchableOpacity onPress={onReset} style={styles.button}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { cause, prevention, treatment } = disease;

  const handleModal = (type: keyof typeof modalVisible, isVisible: boolean) => {
    setModalVisible({ ...modalVisible, [type]: isVisible });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Diagnosis Result</Text>
      <Text style={styles.diagnosis}>You have been diagnosed with:</Text>
      <Text style={styles.disease}>{diagnosis}</Text>

      {/* Icons for Cause, Prevention, Treatment */}
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => handleModal("cause", true)}
          style={styles.iconWrapper}
        >
          <AntDesign name="exclamationcircle" size={24} color={COLORS.red} />
          <Text style={styles.iconLabel}>Cause</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleModal("prevention", true)}
          style={styles.iconWrapper}
        >
          <Ionicons name="shield-half" size={24} color="green" />
          <Text style={styles.iconLabel}>Prevention</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleModal("treatment", true)}
          style={styles.iconWrapper}
        >
          <Ionicons name="medkit" size={24} color={COLORS.primary} />
          <Text style={styles.iconLabel}>Treatment</Text>
        </TouchableOpacity>
      </View>

      <Cause
        visible={modalVisible.cause}
        onClose={() => handleModal("cause", false)}
        cause={cause}
      />

      <Prevention
        visible={modalVisible.prevention}
        onClose={() => handleModal("prevention", false)}
        prevention={prevention}
      />

      <Treatment
        visible={modalVisible.treatment}
        onClose={() => handleModal("treatment", false)}
        treatment={treatment}
      />

      <TouchableOpacity onPress={onReset} style={styles.button}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  diagnosis: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },
  disease: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.red,
    textAlign: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 15,
  },
  iconWrapper: {
    alignItems: "center",
  },
  iconLabel: {
    textAlign: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "semibold",
  },
});
