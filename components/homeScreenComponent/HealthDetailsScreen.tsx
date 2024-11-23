import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "@/constants"; // Assuming you have a color scheme defined

const HealthDetailsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* User Details Section */}
      <View style={styles.detailSection}>

        {/* Name */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name: </Text>
          <Text style={styles.detailValue}>John Doe</Text>
        </View>

        {/* Gender */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender: </Text>
          <Text style={styles.detailValue}>Male</Text>
        </View>

        {/* Birthday */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Birthday: </Text>
          <Text style={styles.detailValue}>Jan 1, 1992</Text>
        </View>

        {/* Height */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Height: </Text>
          <Text style={styles.detailValue}>180 cm</Text>
        </View>

        {/* Weight */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Weight: </Text>
          <Text style={styles.detailValue}>75 kg</Text>
        </View>

        {/* BMI */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>BMI: </Text>
          <Text style={styles.detailValue}>24.5</Text>
        </View>

        {/* Blood Group */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Group: </Text>
          <Text style={styles.detailValue}>O+</Text>
        </View>

        {/* Genotype */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Genotype: </Text>
          <Text style={styles.detailValue}>AA</Text>
        </View>

        {/* Blood Pressure */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Blood Pressure: </Text>
          <Text style={styles.detailValue}>120/80 mmHg</Text>
        </View>

        {/* Pulse Rate */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Pulse Rate: </Text>
          <Text style={styles.detailValue}>72 bpm</Text>
        </View>

        {/* Temperature */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Temperature: </Text>
          <Text style={styles.detailValue}>98.6 °F</Text>
        </View>

        {/* Respiratory Rate */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Respiratory Rate: </Text>
          <Text style={styles.detailValue}>16 bpm</Text>
        </View>

        {/* Vitals Recorded */}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Vitals Recorded: </Text>
          <Text style={styles.detailValue}>8 Aug 2024</Text>
        </View>
      </View>

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
        <Text style={styles.downloadButtonText}>Download</Text>
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
  detailSection: {
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
    width: 130, // Adjust width if necessary to align labels
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 50,
  },
  downloadButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HealthDetailsScreen;
