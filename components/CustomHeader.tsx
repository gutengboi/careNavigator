import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const CustomHeader = ({ title, onBackPress }: CustomHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackPress} style={styles.BackBtn}>
        <Ionicons name="chevron-back" size={30} color={COLORS.primary} />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  BackBtn: {
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    left: 10,
    top: SIZES.large,
  },
});

export default CustomHeader;