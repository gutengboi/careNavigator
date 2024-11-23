import React from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "../../store/authSlice"; // Adjust the path to your authSlice
import { COLORS, SIZES } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BackBtn, Button } from "@/components"; // Use your custom Button component here
import { RootState } from "@/store/store"; // Adjust if needed

interface ResetPasswordProps {
  route: {
    params: {
      email: string;
      otp: string;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

interface ResetPasswordValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = ({ route, navigation }: ResetPasswordProps) => {
  const { email, otp } = route.params; // Get the email and OTP passed from OTPScreen
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  const handleResetPassword = async (values: ResetPasswordValues) => {
    dispatch(
      resetPassword({
        email: email,
        otp: otp,
        newPassword: values.newPassword,
      })
    )
      .unwrap()
      .then(() => {
        Alert.alert("Success", "Password reset successful.", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      })
      .catch((err: string) => {
        // Enhanced error handling logic
        let errorMessage = "An error occurred. Please try again.";
        if (err === "Invalid OTP") {
          errorMessage = "The OTP provided is invalid. Please try again.";
        } else if (err === "Email not found") {
          errorMessage = "The email provided does not exist.";
        }
        Alert.alert("Error", errorMessage);
      });
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={{ marginTop: 5, right: 10 }}>
          <BackBtn onPress={() => navigation.goBack()} />
        </View>

        <Image
          source={require("../../assets/images/resetPass.png")}
          style={styles.image}
        />

        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={styles.wrapper}>
                <Text style={styles.label}>New Password</Text>
                <View
                  style={styles.inputWrapper(
                    touched.newPassword ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Enter new password"
                    secureTextEntry
                    onChangeText={handleChange("newPassword")}
                    onBlur={handleBlur("newPassword")}
                    value={values.newPassword}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.newPassword && errors.newPassword && (
                  <Text style={styles.errorMessage}>{errors.newPassword}</Text>
                )}
              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Confirm Password</Text>
                <View
                  style={styles.inputWrapper(
                    touched.confirmPassword ? COLORS.secondary : COLORS.offwhite
                  )}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />
                  <TextInput
                    placeholder="Confirm new password"
                    secureTextEntry
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorMessage}>
                    {errors.confirmPassword}
                  </Text>
                )}
              </View>

              <Button
                title="Reset Password"
                onPress={handleSubmit}
                isValid={
                  !!(
                    values.newPassword &&
                    values.confirmPassword &&
                    values.newPassword === values.confirmPassword
                  )
                }
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
    width: SIZES.width / 2,
    height: SIZES.height / 3,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    textAlign: "left",
  },
  inputWrapper: (borderColor: string) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
});

export default ResetPassword;
