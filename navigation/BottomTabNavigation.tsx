import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/index";
import { Home, Profile, Create, Explore } from "@/screen/bottomNavScreen";

const Tab = createBottomTabNavigator();

const screenOptions: React.ComponentProps<typeof Tab.Navigator>["screenOptions"] = ({ route }) => ({
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    // On react-native-web, an absolutely-positioned tab bar breaks inactive
    // tab icons from ever painting their glyph (reproducible: the focused
    // tab's icon always renders, every other tab's never does, regardless
    // of which @expo/vector-icons font is used). Native doesn't have this
    // problem and absolute positioning is what makes the bar float above
    // the screen edge with rounded corners, so only drop it on web.
    position: Platform.OS === "web" ? undefined : "absolute",
    bottom: 25,
    left: 10,
    right: 10,
    elevation: 0,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderTopWidth: 0,
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0, // Remove the shadow on iOS
  },
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home" : "home";
    } else if (route.name === "Create") {
      return <Ionicons name={"notifications-outline"} size={size} color={color} />;
    } else if (route.name === "Explore") {
      return <Feather name={"compass"} size={size} color={color} />;
    } else if (route.name === "Profile") {
      iconName = focused ? "user" : "user";
    }

    return <AntDesign name={iconName as any} size={size} color={color} />;
  },
  tabBarLabelStyle: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "medium",
  },
  tabBarActiveTintColor: COLORS.primary,
  tabBarInactiveTintColor: COLORS.gray2,
});

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarLabel: "Create",
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: "Explore",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
