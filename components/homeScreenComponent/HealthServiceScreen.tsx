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

const HealthServiceScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Sample data for health services
  const healthServices = [
    {
      service: "General Consultation",
      description:
        "A consultation with a general practitioner to discuss overall health and wellness.",
      details:
        "This service includes a full physical examination, review of medical history, and discussion of any symptoms or concerns you may have. Duration: 30 minutes.",
    },
    {
      service: "Lab Tests",
      description:
        "Blood tests, urine tests, and other lab services to diagnose and monitor health conditions.",
      details:
        "A variety of lab tests available, including blood glucose, cholesterol levels, liver function tests, and more. Results will be available within 1-2 days.",
    },
    {
      service: "Vaccinations",
      description:
        "Administering vaccines to prevent illnesses such as the flu, hepatitis, and more.",
      details:
        "Our healthcare professionals provide a range of vaccinations, including seasonal flu shots, travel vaccines, and routine immunizations. Duration: 10-15 minutes.",
    },
    {
      service: "Dental Care",
      description:
        "Dental services, including routine cleanings, fillings, and oral exams.",
      details:
        "Our dentists offer a range of services, from regular cleanings and fluoride treatments to fillings, crowns, and other restorative procedures. Duration varies depending on the service.",
    },
    {
      service: "Mental Health Services",
      description:
        "Counseling and therapy sessions to address mental health concerns.",
      details:
        "Our mental health services include individual counseling sessions, therapy for anxiety and depression, and group therapy options. Duration: 45 minutes per session.",
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedService(null);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Health Services</Text>
      </View> */}

      {/* Health Services Section */}
      <View style={styles.section}>
        {healthServices.map((serviceItem, index) => (
          <View key={index} style={styles.serviceCard}>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{serviceItem.service}</Text>
              <Text style={styles.serviceDescription}>
                {serviceItem.description}
              </Text>
            </View>
            <TouchableOpacity onPress={() => openModal(serviceItem)}>
              <Ionicons
                name="information-circle-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Modal for service details */}
      {selectedService && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedService.service}</Text>
              <Text style={styles.modalText}>{selectedService.details}</Text>

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
  serviceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceInfo: {
    flexDirection: "column",
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
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

export default HealthServiceScreen;
