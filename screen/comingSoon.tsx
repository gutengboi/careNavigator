import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/comingSoon.png")}
        style={styles.image}
      />
      {/* <Text style={styles.text}>Coming Soon</Text> */}
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
