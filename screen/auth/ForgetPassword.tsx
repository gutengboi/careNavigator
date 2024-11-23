import React from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Image,
  Modal, // Import Modal
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../../store/authSlice"; // Assuming the path to your authSlice
import { BackBtn, Button } from "@/components";
import { COLORS, SIZES } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ForgetPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: any) => state.auth);
  const [modalVisible, setModalVisible] = React.useState(false); // State for Modal visibility

  const handleForgotPassword = async (values) => {
    setModalVisible(true); // Show loading modal
    dispatch(forgotPassword({ email: values.email }))
      .unwrap()
      .then(() => {
        setModalVisible(false); // Hide loading modal
        Alert.alert("OTP Sent", "Please check your email for the OTP.");
        navigation.navigate("OTPScreen", { email: values.email }); // Navigate to OTPScreen, passing email
      })
      .catch((err) => {
        setModalVisible(false); // Hide loading modal
        Alert.alert("Error", err);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <KeyboardAvoidingView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View style={styles.container}>
          <View style={{marginTop: 5,right: 20}}>
          <BackBtn onPress={() => navigation.goBack()} />
            </View>
          <Image
            source={require("../../assets/images/forgetPass.png")}
            style={styles.cover}
          />
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleForgotPassword}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter Email"
                      onFocus={() => setFieldTouched("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                {/* Button */}
                <View style={styles.buttonContainer}>
                  <Button
                    loader={isLoading}
                    onPress={isValid ? handleSubmit : undefined}
                    title="Send OTP"
                    isValid={isValid}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>

        {/* Modal with ActivityIndicator */}
        <Modal transparent={true} visible={modalVisible}>
          <View style={styles.modalBackground}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  wrapper: {
    marginBottom: 20,
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "left",
  },
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  cover: {
    height: SIZES.height / 3.5,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
});

export default ForgetPassword;
