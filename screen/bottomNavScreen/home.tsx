import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";
import DarkMode from "@/components/darkmode.context";

const Home = () => {
  const navigation = useNavigation();
  const [greeting, setGreeting] = useState("");
  const user = useSelector(selectUser);
  const { isDarkMode } = useContext(DarkMode);

  console.log(user);

  //console.log(user?.username, ": omoooo");

  useEffect(() => {
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      if (currentHour < 12) {
        setGreeting("Good morning");
      } else if (currentHour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    };

    updateGreeting();
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#F5F5F5" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <View style={styles.appBar}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/images/person.png")}
                style={styles.profile}
              />
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <Text
                style={[
                  styles.title,
                  {
                    marginTop: -1,
                    fontFamily: "medium",
                    fontSize: 14,
                    color: isDarkMode ? "#fff" : "#003366",
                  },
                ]}
              >
                {greeting}
              </Text>
              <Text
                style={[
                  styles.title,
                  {
                    marginTop: -4,
                    fontFamily: "bold",
                    textAlign: "left",
                    fontSize: 12,
                    color: isDarkMode ? "#fff" : "#003366",
                  },
                ]}
              >
                {user?.username || "Guest"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 30,
              borderWidth: 1,
              height: 27,
              width: 27,
              borderColor: COLORS.primary,
              right: 10,
            }}
            onPress={() => navigation.navigate("Chatbot")}
          >
            <Image
              source={require("../../assets/images/chatbot.png")}
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <View style={styles.headerBackground}>
            <View style={[styles.row, { padding: 10 }]}>
              <TouchableOpacity
                style={styles.headerbox}
                onPress={() => navigation.navigate("ComingSoon")}
              >
                <Image
                  source={require("../../assets/images/drugs.png")}
                  style={{ height: 25, width: 25 }}
                />
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: "bold",
                      fontSize: 10,
                      marginTop: 2,
                      margin: -5,
                    },
                  ]}
                >
                  Medicine
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerbox}
                onPress={() => navigation.navigate("LabTest")}
              >
                <Image
                  source={require("../../assets/images/testTubeRack.png")}
                  style={{ height: 25, width: 25 }}
                />
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: "bold",
                      fontSize: 10,
                      marginTop: 2,
                      margin: -5,
                    },
                  ]}
                >
                  Lab Test
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerbox}
                onPress={() => navigation.navigate("Allergies")}
              >
                <Image
                  source={require("../../assets/images/sneeze.png")}
                  style={{ height: 25, width: 25 }}
                />
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: "bold",
                      fontSize: 10,
                      marginTop: 2,
                      margin: -5,
                    },
                  ]}
                >
                  Allergies
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerbox}
                onPress={() => navigation.navigate("ComingSoon")}
              >
                <Image
                  source={require("../../assets/images/pharmacyStore.png")}
                  style={{ height: 25, width: 25 }}
                />
                <Text
                  style={[
                    styles.title,
                    {
                      fontFamily: "bold",
                      fontSize: 10,
                      marginTop: 2,
                      margin: -10,
                    },
                  ]}
                >
                  Pharmacy
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.whiteHeaderBackground,
            { backgroundColor: isDarkMode ? "#121212" : "#F5F5F5" },
          ]}
        >
          <Text
            style={{
              marginTop: 10,
              padding: 18,
              fontFamily: "semibold",
              color: isDarkMode ? "#fff" : "#003366",
            }}
          >
            Overview
          </Text>
          <View
            // horizontal
            // showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollContainer}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("HealthService")}
            >
              <Text style={styles.cardText}>Health Service</Text>
              <Image
                source={require("../../assets/images/medicalHistory.png")}
                style={{ height: 50, width: 50 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Appointment")}
            >
              <Text style={styles.cardText}>Appointments</Text>
              <Image
                source={require("../../assets/images/appointment.png")}
                style={{ height: 50, width: 50 }}
              />
            </TouchableOpacity>
            {/* <View style={styles.card}>
            <Text style={styles.cardText}>Card 3</Text>
          </View> */}
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("HealthSummary")}
            >
              <Image
                source={require("../../assets/images/medicalId.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text style={styles.title}>Health summary</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("MedicalHistory")}
            >
              <Image
                source={require("../../assets/images/medicalHistory.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text style={styles.title}>Medical History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("DiagnoseMe")}
            >
              <Image
                source={require("../../assets/images/diagnose.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text style={styles.title}>Diagnose Me</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("PastMedication")}
            >
              <Image
                source={require("../../assets/images/medicine.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text style={styles.title}>Past Medication</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("MedicalReport")}
            >
              <Image
                source={require("../../assets/images/healthReport.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text style={styles.title}>Report</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => navigation.navigate("DoctorScreen")}
            >
              <Image
                source={require("../../assets/images/stethoscope.png")}
                style={{ height: 50, width: 50 }}
              />
              <Text style={styles.title}>Consult Doctor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    padding: 15,
  },
  greetingText: {
    fontSize: 24,
    fontFamily: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "bold",
    marginBottom: 10,
  },
  header: {
    alignItems: "center",
    position: "relative",
    marginTop: 10,
    marginBottom: -70,
  },
  headerBackground: {
    height: 200,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
  },
  headerbox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 15,
    height: 60,
    width: 60,
    backgroundColor: "#FFF",
    borderRadius: 15,
  },
  whiteHeaderBackground: {
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: -35,
  },
  profile: {
    height: 30,
    width: 25,
    resizeMode: "contain",
    left: 7,
    top: 2,
  },
  imageContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#fff",
    borderColor: "#ADD4F2",
    borderRadius: 15,
    borderWidth: 1,
  },
  horizontalScrollContainer: {
    width: "100%",
    maxHeight: 100,
    marginBottom: 20,
    marginTop: 6,
    flexDirection: "row",
  },
  card: {
    width: 180,
    height: 100,
    backgroundColor: "#FFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    flexDirection: "row",
  },
  cardText: {
    fontSize: 14,
    fontWeight: "semibold",
    color: COLORS.primary,
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 15,
    height: 100,
    backgroundColor: "#E2EFFD",
    borderRadius: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 11,
    textAlign: "center",
    fontFamily: "bold",
    color: COLORS.primary,
  },
});

export default Home;
