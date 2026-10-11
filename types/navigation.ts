export type RootStackParamList = {
  Login: undefined;
  BottomNavigation: undefined;
  Signup: undefined;
  VerifyOTP: { email: string };
  ForgetPassword: undefined;
  OTPScreen: { email: string };
  ResetPassword: { email: string; otp: string };
  ComingSoon: undefined;
  Apptheme: undefined;
  Chatbot: undefined;
  DiagnoseMe: undefined;
  Allergies: undefined;
  AllergiesList: { selectedAllergies: string[] };
  Appointment: undefined;
  DoctorProfile: { name: string; field: string; image: string };
  MedicalReport: undefined;
  CancelAppointment: undefined;
  ReviewScreen: undefined;
  HealthSummary: undefined;
  PastMedication: undefined;
  MedicalHistory: undefined;
  HealthService: undefined;
  HealthDetails: undefined;
  LabTest: undefined;
  DoctorScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
