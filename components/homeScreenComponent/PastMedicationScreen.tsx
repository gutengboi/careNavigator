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
import { Ionicons } from "@expo/vector-icons"; // Icons library
import { COLORS } from "@/constants"; // Assuming you have a color scheme defined

const PastMedicationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);

  const medications = [
    {
      name: "Aspirin",
      dosage: "75 mg",
      duration: "Jan 2023 - Mar 2023",
      type: "Tablet",
      description: "Used to reduce pain, fever, or inflammation.",
    },
    {
      name: "Ibuprofen",
      dosage: "200 mg",
      duration: "Jun 2022 - Sep 2022",
      type: "Tablet",
      description: "Nonsteroidal anti-inflammatory drug used for pain relief.",
    },
    {
      name: "Amoxicillin",
      dosage: "500 mg",
      duration: "Nov 2021 - Dec 2021",
      type: "Capsule",
      description: "Antibiotic used to treat bacterial infections.",
    },
  ];

  const openModal = (medication) => {
    setSelectedMedication(medication);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedMedication(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Medications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medications</Text>

        {/* Medication List */}
        {medications.map((medication, index) => (
          <View key={index} style={styles.medicationCard}>
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationDosage}>
                Dosage: {medication.dosage}
              </Text>
              <Text style={styles.medicationDuration}>
                Duration: {medication.duration}
              </Text>
            </View>
            <TouchableOpacity onPress={() => openModal(medication)}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Text style={styles.addButtonText}>Add New Medication</Text>
        </TouchableOpacity> */}
      </View>

      {/* Modal for medication details */}
      {selectedMedication && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedMedication.name}</Text>
              <Text style={styles.modalText}>
                Type: {selectedMedication.type}
              </Text>
              <Text style={styles.modalText}>
                Dosage: {selectedMedication.dosage}
              </Text>
              <Text style={styles.modalText}>
                Duration: {selectedMedication.duration}
              </Text>
              <Text style={styles.modalText}>
                Description: {selectedMedication.description}
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
  medicationCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    marginBottom: 10,
  },
  medicationInfo: {
    flexDirection: "column",
  },
  medicationName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  medicationDosage: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  medicationDuration: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
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
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PastMedicationScreen;
