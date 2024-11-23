import React, { useRef } from "react";
import { View, TextInput, Text, Alert, StyleSheet, Image,KeyboardAvoidingView,ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { verifyOTP } from "../../store/authSlice";
import { BackBtn, Button } from "@/components";
import { RootState } from "@/store/store";
import { SIZES } from "@/constants";

interface OTPScreenProps {
  route: {
    params: {
      email: string;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: object) => void;
  };
}

interface OTPValues {
  otp: string;
}

const OTPScreen = ({ route, navigation }: OTPScreenProps) => {
  const { email } = route.params;
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOTPSubmit = async (values: OTPValues, actions: FormikHelpers<OTPValues>) => {
    const otp = values.otp;
    dispatch(verifyOTP({ email, otp }))
      .unwrap()
      .then(() => {
        Alert.alert("OTP Verified", "You can now reset your password.");
        // navigation.navigate("ResetPassword", { email });
        navigation.navigate("ResetPassword", { email, otp });
      })
      .catch((err: any) => {
        Alert.alert("Error", err);
      });
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(4, "OTP must be exactly 4 digits")
      .required("OTP is required"),
  });

  const handleDigitChange = (
    text: string,
    index: number,
    values: OTPValues,
    setFieldValue: (field: string, value: any) => void
  ) => {
    let otpArray = values.otp.split("");
    otpArray[index] = text;
    const newOtp = otpArray.join("");
    setFieldValue("otp", newOtp);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
    <View style={styles.container}>
      <View style={{marginTop: 5,right: 10}}>
      <BackBtn onPress={() => navigation.goBack()}  />
      </View>

      <Formik
        initialValues={{ otp: "" }}
        validationSchema={validationSchema}
        onSubmit={handleOTPSubmit}
      >
        {({ handleSubmit, values, setFieldValue, errors, touched }) => (
          <View style={styles.centeredContent}>
            <Image
              source={require("../../assets/images/fgpotp.png")}
              style={styles.image}
            />

            <Text style={styles.informativeText}>
              Please check your email, <Text style={styles.emailText}>{email}</Text>, for the 4-digit OTP code.
            </Text>

            <View style={styles.otpContainer}>
              {[...Array(4)].map((_, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={values.otp[index] || ""}
                  onChangeText={(text) => handleDigitChange(text, index, values, setFieldValue)}
                  onKeyPress={({ nativeEvent }) =>
                    nativeEvent.key === "Backspace" && handleBackspace(nativeEvent.key, index)
                  }
                />
              ))}
            </View>

            {touched.otp && errors.otp && <Text style={styles.error}>{errors.otp}</Text>}

            <Button
              title="Verify OTP"
              onPress={handleSubmit}
              isValid={values.otp.length === 4}
              loader={loading}
            />
          </View>
        )}
      </Formik>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center", // Centers the content vertically
    flex: 1,
    marginBottom: 70
  },
  image: {
    //bottom: 60,
    height: SIZES.height / 2.2,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: 5, // Increased margin to move text and inputs more to the center
  },
  informativeText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  emailText: {
    fontWeight: "bold",
    color: "#000",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
    width: "80%",
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});

export default OTPScreen;
