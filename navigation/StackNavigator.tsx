import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./BottomTabNavigation";
import { LoginPage } from "@/screen/auth";
import Signup from "@/screen/auth/Signup";
import Apptheme from "@/screen/Apptheme";
import ComingSoon from "@/screen/comingSoon";
import Chatbot from "@/screen/chatbot";
import CustomHeader from "@/components/CustomHeader";
import DiagnoseMe from "@/screen/diagnose/DiagnoseMe";
import AllergiesScreen from "@/screen/AllergiesScreen";
import AllergiesList from "@/components/AllergiesList";
import AppointmentScreen from "@/screen/AppointmentScreen";
import DoctorProfileScreen from "@/components/DoctorProfileScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomNavigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ComingSoon"
        component={ComingSoon}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Coming Soon"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Apptheme"
        component={Apptheme}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="AppTheme"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Chatbot"
        component={Chatbot}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Ask careBot"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DiagnoseMe"
        component={DiagnoseMe}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Diagnose Me"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Allergies"
        component={AllergiesScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Allergies"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AllergiesList"
        component={AllergiesList}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="AllergiesList"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="My appointments"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DoctorProfile"
        component={DoctorProfileScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="DoctorProfile"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      {/* 
      
      DoctorProfileScreen
      <Stack.Screen  AppointmentScreen
        name="DiagnoseMe"
        component={DiagnoseMe}
        options={{ headerShown: false }}
      />
      */}
    </Stack.Navigator>
  );
}
