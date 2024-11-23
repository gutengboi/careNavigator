import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS } from "../constants";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={isValid ? onPress : null}
      style={styles.btnStyle(isValid ? COLORS.primary : COLORS.gray)}
      disabled={!isValid}
    >
      {!loader ? (
        <Text style={styles.BtnText}>{title}</Text>
      ) : (
        <ActivityIndicator color={COLORS.white} size="small" /> // Set color and size
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnStyle: (backgroundColor) => ({
    height: 50,
    width: "100%",
    backgroundColor: backgroundColor,
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
