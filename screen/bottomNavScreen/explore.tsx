import { View, Text, SafeAreaView } from "react-native";
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

// import {
//   ColorSchemeName,
//   StyleSheet,
//   Switch,
//   View,
//   useColorScheme,
// } from "react-native";
// import React, { useCallback, useContext, useEffect } from "react";
// import DarkMode from "@/components/darkmode.context";
// import { Card, Text } from "@/utils/Theme";

// export default function Explore() {
//   const { isDarkMode, setIsDarkMode, useDeviceSettings, setUseDeviceSettings } =
//     useContext(DarkMode);

//   const scheme = useColorScheme();

//   const currentActivatedTheme: ColorSchemeName = isDarkMode ? "dark" : "light";
//   function handleUseDeviceTheme() {
//     setUseDeviceSettings(!useDeviceSettings);
//     if (scheme === "dark") {
//       setIsDarkMode(true);
//       return;
//     }
//     setIsDarkMode(false);
//   }

//   const toggleDarkMode = useCallback(() => {
//     setIsDarkMode(!isDarkMode);
//   }, [isDarkMode, scheme, useDeviceSettings]);

//   useEffect(() => {
//     if (currentActivatedTheme !== scheme) {
//       setUseDeviceSettings(false);
//     }
//   }, [isDarkMode, useDeviceSettings]);

//   return (
//     <View>
//       <Card style={[styles.card]} isDarkMode={isDarkMode}>
//         <View style={styles.option}>
//           <Text style={[[styles.text]]} isDarkMode={isDarkMode}>
//             Use device theme
//           </Text>
//           <Switch
//             trackColor={{
//               true: "#02b875",
//               false: "gray",
//             }}
//             onChange={handleUseDeviceTheme}
//             value={useDeviceSettings}
//             thumbColor={"white"}
//           />
//         </View>

//         <View style={[styles.hr]} />

//         <View style={styles.option}>
//           <Text style={[[styles.text]]} isDarkMode={isDarkMode}>
//             Dark Mode
//           </Text>
//           <Switch
//             trackColor={{
//               true: "#02b875",
//               false: "gray",
//             }}
//             value={isDarkMode}
//             onChange={toggleDarkMode}
//             thumbColor={"white"}
//           />
//         </View>
//       </Card>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   hr: {
//     width: "100%",
//     height: 1,
//     backgroundColor: "gray",
//     opacity: 0.1,
//   },
//   text: {
//     fontFamily: "regular",
//     fontSize: 16,
//     textTransform: "capitalize",
//     opacity: 0.6,
//   },
//   option: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 12,
//   },
//   card: {
//     backgroundColor: "white",
//     margin: 15,
//     borderRadius: 8,
//   },
// });
