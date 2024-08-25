import { COLORS } from "@/constants";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

import { Ionicons, Fontisto } from "@expo/vector-icons";

const AppointmentScreen = () => {
  const [selectedTab, setSelectedTab] = useState<
    "Upcoming" | "Completed" | "Canceled"
  >("Upcoming");

  const renderAppointment = () => {
    return (
      <View style={styles.appointmentCard}>
        <Image
          source={{ uri: "https://via.placeholder.com/50" }}
          style={styles.doctorImage}
        />
        <View style={styles.appointmentInfo}>
          <Text style={styles.doctorName}>Dr. Romi Ahmed</Text>
          <Text style={styles.speciality}>Dentist Specialist</Text>
          <View style={styles.separator} />
          <View style={styles.appointmentDetails}>
            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Ionicons name="calendar-outline" size={20} color="#83829A" />
              </View>
              <Text style={styles.detailText}>8 Aug 2024</Text>
            </View>
            <View style={styles.detailRow}>
              <View style={styles.detailLabel}>
                <Fontisto name="stopwatch" size={20} color="#83829A" />
              </View>
              <Text style={styles.detailText}>5:00 PM</Text>
            </View>
            <Text style={styles.statusConfirmed}> ● Confirmed</Text>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.rescheduleButton}>
              <Text style={styles.buttonText}>Reschedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setSelectedTab("Upcoming")}
          style={[
            styles.tabButton,
            selectedTab === "Upcoming" && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("Completed")}
          style={[
            styles.tabButton,
            selectedTab === "Completed" && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Completed" && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("Canceled")}
          style={[
            styles.tabButton,
            selectedTab === "Canceled" && styles.activeTab,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "Canceled" && styles.activeTabText,
            ]}
          >
            Canceled
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render appointment cards based on the selected tab */}
      {selectedTab === "Upcoming" && renderAppointment()}
      {/* You can add more render logic for 'Completed' and 'Canceled' tabs */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#EFEFEF",
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#FFF",
  },
  appointmentCard: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    flexDirection: "row",
  },
  doctorImage: {
    width: 55,
    height: 55,
    borderRadius: 15,
    marginRight: 16,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  speciality: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  separator: {
    height: 1,
    width: 340,
    right: 65,
    backgroundColor: "#CCC",
    marginVertical: 10,
  },
  appointmentDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    right: 65,
  },
  detailRow: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    marginRight: 4,
    padding: 5
  },
  detailText: {
    fontSize: 12,
    fontFamily: "medium",
  },
  statusConfirmed: {
    color: "green",
    fontSize: 12,
    fontFamily: "medium",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    right: 65,
  },
  rescheduleButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 14,
  },
});

export default AppointmentScreen;
