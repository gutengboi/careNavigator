import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(!isValid ? COLORS.gray : COLORS.primary)}
    >
      {!loader ? (
        <Text style={styles.BtnText}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnStyle: (backgroundColor) => ({
    height: 50,
    width: "100%",
    backgroundColor: backgroundColor, // Make sure to define COLORS.primary in your constants
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    borderRadius: 12,
  }),
  BtnText: {
    fontSize: 18,
    color: COLORS.white,
    fontFamily: "bold",
  },
});
