import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icons
import { COLORS } from "@/constants"; // Assuming you have a color scheme

const MedicalHistoryScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  // Sample data for medical history
  const medicalHistory = [
    {
      condition: "Hypertension",
      details:
        "Diagnosed in 2021. Currently on medication to control blood pressure.",
    },
    {
      condition: "Appendectomy",
      details: "Surgery in 2019 to remove the appendix.",
    },
    {
      condition: "Asthma",
      details: "Diagnosed in childhood. Uses an inhaler for symptom control.",
    },
    {
      condition: "Allergy to Penicillin",
      details: "Severe allergic reaction to penicillin antibiotics.",
    },
  ];

  const openModal = (historyItem) => {
    setSelectedHistoryItem(historyItem);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedHistoryItem(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Medical History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Past Medical Conditions</Text>

        {/* Medical History List */}
        {medicalHistory.map((historyItem, index) => (
          <View key={index} style={styles.historyCard}>
            <View style={styles.historyInfo}>
              <Text style={styles.historyCondition}>
                {historyItem.condition}
              </Text>
            </View>
            <TouchableOpacity onPress={() => openModal(historyItem)}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Modal for history details */}
      {selectedHistoryItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {selectedHistoryItem.condition}
              </Text>
              <Text style={styles.modalText}>
                {selectedHistoryItem.details}
              </Text>

              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  historyCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    marginBottom: 10,
  },
  historyInfo: {
    flexDirection: "column",
  },
  historyCondition: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.primary,
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MedicalHistoryScreen;
