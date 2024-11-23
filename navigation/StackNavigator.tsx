import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./BottomTabNavigation";
import { ForgetPassword, LoginPage, OTPScreen, ResetPassword, Signup, VerifyOTPScreen } from "@/screen/auth";
import Apptheme from "@/screen/Apptheme";
import ComingSoon from "@/screen/comingSoon";
import Chatbot from "@/screen/chatbot";
import CustomHeader from "@/components/CustomHeader";
import DiagnoseMe from "@/screen/diagnose/DiagnoseMe";
import AllergiesScreen from "@/screen/AllergiesScreen";
import AllergiesList from "@/components/AllergiesList";
import AppointmentScreen from "@/screen/AppointmentScreen";
import DoctorProfileScreen from "@/components/DoctorProfileScreen";
import MedicalReportScreen from "@/screen/MedicalReportScreen";
import CancellationReasonScreen from "@/components/CancellationReasonScreen";
import ReviewScreen from "@/components/ReviewScreen";
import {
  HealthSummaryScreen,
  PastMedicationScreen,
  MedicalHistoryScreen,
  HealthServiceScreen,
  HealthDetailsScreen,
  LabTestScreen,
  DoctorScreen,
} from "@/components/homeScreenComponent";

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
        name="VerifyOTP"
        component={VerifyOTPScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTPScreen"
        component={OTPScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
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
              title="Doctor's Profile"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="MedicalReport"
        component={MedicalReportScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Medical Report"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="CancelAppointment"
        component={CancellationReasonScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Reason"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Review"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="HealthSummary"
        component={HealthSummaryScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Health Summary"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="PastMedication"
        component={PastMedicationScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Past Medication"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="MedicalHistory"
        component={MedicalHistoryScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Medical History"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="HealthService"
        component={HealthServiceScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Health Service"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="HealthDetails"
        component={HealthDetailsScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Health Details"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      <Stack.Screen
        name="LabTest"
        component={LabTestScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Lab Test"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DoctorScreen"
        component={DoctorScreen}
        options={({ navigation }) => ({
          header: () => (
            <CustomHeader
              title="Doctors"
              onBackPress={() => navigation.goBack()}
            />
          ),
        })}
      />

      {/* 
      
      DoctorProfileScreen  HealthSummaryScreen
      <Stack.Screen  AppointmentScreen
        name="DiagnoseMe"
        component={DiagnoseMe}
        options={{ headerShown: false }}
      /> LabTestScreen
    
     
     
      
      */}
    </Stack.Navigator>
  );
}
