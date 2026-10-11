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
    // React Navigation's documented pattern for typing every untyped
    // useNavigation()/navigate() call app-wide — the empty body is required.
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
