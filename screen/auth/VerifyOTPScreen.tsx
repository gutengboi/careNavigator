import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { verifyRegistrationOTP } from "../../store/authSlice";
import { BackBtn, Button } from "../../components"; // Custom button component
import { COLORS, SIZES } from "../../constants"; // Adjust according to your project
import { RootState } from "@/store/store"; // Adjust based on your store setup

interface VerifyOTPProps {
  route: {
    params: {
      email: string; // Email passed from the Signup screen
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const VerifyOTPScreen = ({ route, navigation }: VerifyOTPProps) => {
  const { email } = route.params;
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  // Input refs to move between inputs automatically
  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);

  const handleVerifyOTP = async (values: { otp: string }) => {
    dispatch(
      verifyRegistrationOTP({
        email: email,
        otp: values.otp,
      })
    )
      .unwrap()
      .then(() => {
        Alert.alert("Success", "OTP verification successful.");
        navigation.navigate("Login");
      })
      .catch((err: string) => {
        Alert.alert("Error", err);
      });
  };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required("OTP is required")
      .length(4, "OTP must be 4 digits"),
  });

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={{ marginTop: 5, right: 10 }}>
          <BackBtn onPress={() => navigation.goBack()} />
        </View>

        <Image
          source={require("../../assets/images/OTPVerify.png")}
          style={styles.image}
        />

        <Text style={styles.title}>Verify Your OTP</Text>
        <Text style={styles.subtitle}>
          Please enter the OTP sent to your email:
          <Text style={{ fontSize: SIZES.medium - 2, fontWeight: "bold" }}>
            {email}
          </Text>
        </Text>

        <Formik
          initialValues={{ otp: "" }}
          validationSchema={validationSchema}
          onSubmit={handleVerifyOTP}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View>
              <View style={styles.wrapper}>
                <View style={styles.otpContainer}>
                  <TextInput
                    ref={input1Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => {
                      setFieldValue("otp", values.otp.slice(1) + text);
                      text && input2Ref.current?.focus();
                    }}
                  />
                  <TextInput
                    ref={input2Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => {
                      setFieldValue(
                        "otp",
                        values.otp.charAt(0) + text + values.otp.slice(2)
                      );
                      text
                        ? input3Ref.current?.focus()
                        : input1Ref.current?.focus();
                    }}
                  />
                  <TextInput
                    ref={input3Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => {
                      setFieldValue(
                        "otp",
                        values.otp.slice(0, 2) + text + values.otp.slice(3)
                      );
                      text
                        ? input4Ref.current?.focus()
                        : input2Ref.current?.focus();
                    }}
                  />
                  <TextInput
                    ref={input4Ref}
                    style={styles.otpInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => {
                      setFieldValue("otp", values.otp.slice(0, 3) + text);
                      !text && input3Ref.current?.focus();
                    }}
                    onBlur={handleBlur("otp")}
                  />
                </View>
                {touched.otp && errors.otp && (
                  <Text style={styles.errorMessage}>{errors.otp}</Text>
                )}
              </View>

              <Button
                title="Verify OTP"
                onPress={handleSubmit}
                isValid={!!values.otp}
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
    padding: 20,
    backgroundColor: "#fff",
  },

  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 20,
  },
  subtitle: {
    fontSize: SIZES.small,
    textAlign: "center",
    marginBottom: 30,
  },
  wrapper: {
    marginBottom: 20,
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 50,
    textAlign: "center",
    fontSize: 18,
    color: COLORS.primary,
  },
  errorMessage: {
    color: COLORS.red,
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
});

export default VerifyOTPScreen;
