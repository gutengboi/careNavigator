import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackBtn, Button } from "../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/index";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/authSlice";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state: any) => state.auth);

  const invalidForm = () => {
    Alert.alert(
      "Invalid Form",
      "Please provide all required fields",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {},
        },
      ],
      { defaultIndex: 1, cancelable: false }
    );
  };

  const handleLogin = async (values: FormValues) => {
    setModalVisible(true);
    dispatch(login(values))
      .unwrap()
      .then((user: any) => {
        setModalVisible(false);
        if (user) {
          navigation.replace("BottomNavigation");
        }
      })
      .catch((error) => {
        setModalVisible(false);
        Alert.alert("Login Error", error, [{ text: "OK" }]);
      });
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be 20 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Provide a valid email address")
      .required("Required"),
  });

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../../assets/images/bk.png")}
            style={styles.cover}
          />
          <Text style={styles.title}>Welcome Back</Text>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              values,
              errors,
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
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter Password"
                      onFocus={() => setFieldTouched("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      secureTextEntry={!isPasswordVisible}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity
                      onPress={() => setPasswordVisible(!isPasswordVisible)}
                    >
                      <MaterialCommunityIcons
                        name={
                          isPasswordVisible ? "eye-outline" : "eye-off-outline"
                        }
                        size={20}
                        color={COLORS.gray}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <Button
                  loader={isLoading}
                  title="L O G I N"
                  onPress={isValid ? handleSubmit : invalidForm}
                  isValid={isValid}
                />

                <Text
                  style={styles.registration}
                  onPress={() => navigation.navigate("Signup")}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
      {/* Modal for showing the loading indicator */}
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalBackground}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 3,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge - 2,
    color: COLORS.primary,
    alignItems: "center",
    marginBottom: SIZES.xxLarge,
  },
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "left",
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
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  registration: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds a translucent dark background
  },
});

export default LoginPage;
