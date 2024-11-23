import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons
import { COLORS } from "@/constants"; // Assuming you have a color scheme defined

const HealthSummaryScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfoSection}>
        <Text style={styles.nameText}>John Doe</Text>
        <Text style={styles.ageText}>Age: 32</Text>
        <Text style={styles.genderText}>Gender: Male</Text>
      </View>

      {/* Vital Signs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vital Signs</Text>
        <View style={styles.vitalSignRow}>
          <View style={styles.vitalSignCard}>
            <Text style={styles.vitalSignLabel}>Weight</Text>
            <Text style={styles.vitalSignValue}>75 kg</Text>
          </View>
          <View style={styles.vitalSignCard}>
            <Text style={styles.vitalSignLabel}>Blood Pressure</Text>
            <Text style={styles.vitalSignValue}>120/80 mmHg</Text>
          </View>
        </View>
        <View style={styles.vitalSignRow}>
          <View style={styles.vitalSignCard}>
            <Text style={styles.vitalSignLabel}>Heart Rate</Text>
            <Text style={styles.vitalSignValue}>72 bpm</Text>
          </View>
          <View style={styles.vitalSignCard}>
            <Text style={styles.vitalSignLabel}>BMI</Text>
            <Text style={styles.vitalSignValue}>24.5</Text>
          </View>
        </View>
      </View>

      {/* Recent Appointments Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Appointments</Text>
        <View style={styles.appointmentCard}>
          <Text style={styles.appointmentDoctor}>Dr. Romi Ahmed</Text>
          <Text style={styles.appointmentDetails}>Dentist - 8 Aug 2024</Text>
        </View>
        <View style={styles.appointmentCard}>
          <Text style={styles.appointmentDoctor}>Dr. Olivia Turner</Text>
          <Text style={styles.appointmentDetails}>
            Dermatologist - 5 June 2024
          </Text>
        </View>
      </View>

      {/* Medical History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical History</Text>
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Allergies</Text>
          <Text style={styles.historyDetails}>Pollen, Penicillin</Text>
        </View>
        <View style={styles.historyCard}>
          <Text style={styles.historyTitle}>Medications</Text>
          <Text style={styles.historyDetails}>Aspirin, Insulin</Text>
        </View>
      </View>

      {/* Button to View More */}
      <TouchableOpacity
        style={styles.viewMoreButton}
        onPress={() => navigation.navigate("HealthDetails")}
      >
        <Text style={styles.viewMoreButtonText}>View More Details</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  userInfoSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  ageText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  genderText: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
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
  vitalSignRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vitalSignCard: {
    width: "48%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    marginBottom: 10,
  },
  vitalSignLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  vitalSignValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  appointmentCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    marginBottom: 10,
  },
  appointmentDoctor: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  appointmentDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  historyCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  historyDetails: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  viewMoreButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 50,
  },
  viewMoreButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HealthSummaryScreen;
