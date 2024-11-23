import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS } from "@/constants"; // Assuming you have a color scheme defined

const LabTestScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Lab Tests</Text>

        {/* Lab Test 1 */}
        <View style={styles.testCard}>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Test Name: </Text>
            <Text style={styles.testValue}>Complete Blood Count (CBC)</Text>
          </View>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Date: </Text>
            <Text style={styles.testValue}>15 Aug 2024</Text>
          </View>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Result: </Text>
            <Text style={styles.testValue}>Normal</Text>
          </View>
        </View>

        {/* Lab Test 2 */}
        <View style={styles.testCard}>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Test Name: </Text>
            <Text style={styles.testValue}>Liver Function Test</Text>
          </View>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Date: </Text>
            <Text style={styles.testValue}>12 July 2024</Text>
          </View>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Result: </Text>
            <Text style={styles.testValue}>Elevated ALT Levels</Text>
          </View>
        </View>

        {/* Lab Test 3 */}
        <View style={styles.testCard}>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Test Name: </Text>
            <Text style={styles.testValue}>Fasting Blood Sugar</Text>
          </View>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Date: </Text>
            <Text style={styles.testValue}>10 June 2024</Text>
          </View>
          <View style={styles.testRow}>
            <Text style={styles.testLabel}>Result: </Text>
            <Text style={styles.testValue}>95 mg/dL</Text>
          </View>
        </View>

        {/* More lab tests can be added similarly */}

        {/* Button to Download Report */}
        <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
          <Text style={styles.downloadButtonText}>Download Lab Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  testCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    marginBottom: 10,
  },
  testRow: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
  testLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    width: 130, // Adjust width to keep label alignment consistent
  },
  testValue: {
    fontSize: 16,
    color: "#333",
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  downloadButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LabTestScreen;
