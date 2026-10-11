import { View, SafeAreaView } from "react-native";
import React from "react";
import ColorList from "@/components/ColorList";

const Explore = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 50 }}>
        <ColorList color="#4C74AC" />
      </View>
    </SafeAreaView>
  );
};

export default Explore;
