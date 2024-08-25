import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { AntDesign, MaterialIcons, Entypo, Feather } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/authSlice";
import DarkMode from "@/components/darkmode.context";

interface MenuItemProps {
  icon: {
    name: string;
    type: string;
  };
  title: string;
  description: string;
  onPress: () => void;
  iconColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  description,
  onPress,
  iconColor = "#000",
  titleColor = "#000",
  descriptionColor = "#777",
}) => {
  const IconComponent = getIconComponent(icon.type);

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconContainer}>
        <IconComponent name={icon.name} size={24} color={iconColor} />
      </View>
      <View style={styles.menuItemText}>
        <Text style={[styles.menuItemTitle, { color: titleColor }]}>
          {title}
        </Text>
        <Text style={[styles.menuItemDescription, { color: descriptionColor }]}>
          {description}
        </Text>
      </View>
      <Entypo name="chevron-right" size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

const getIconComponent = (type: string) => {
  switch (type) {
    case "antdesign":
      return AntDesign;
    case "entypo":
      return Entypo;
    case "material":
      return MaterialIcons;
    default:
      return MaterialIcons;
  }
};
interface ProfileProps {
  navigation: any
}

const Profile = ({ navigation }: ProfileProps) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(selectUser);
  const { isDarkMode } = useContext(DarkMode);

  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error: any) => {
        console.error("Logout failed: ", error);
      });
  };

  const showLogoutModal = () => {
    setModalVisible(true);
  };

  const confirmLogout = () => {
    setModalVisible(false);
    handleLogout();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#F5F5F5" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.headerBackground} />
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/person.png")}
              style={styles.profile}
            />
          </View>
        </View>
        <View style={styles.cameraIcon}>
          <TouchableOpacity>
            <Feather
              name="camera"
              size={20}
              color="#2E5392"
              style={{ alignItems: "center", left: 8, marginTop: 7 }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "bold",
            bottom: 50,
            alignSelf: "center",
            color: "#fff",
          }}
        >
          {user?.username}
        </Text>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <MenuItem
              icon={{ name: "person", type: "material" }}
              title="Personal Information"
              description="Manage your profile details."
              onPress={() => {}}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
            <MenuItem
              icon={{ name: "notifications-none", type: "material" }}
              title="Push Notifications"
              description="Customize your push notification settings."
              onPress={() => {}}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
            <MenuItem
              icon={{ name: "notifications-none", type: "material" }}
              title="App Theme"
              description="Change your app theme settings."
              onPress={() => navigation.navigate("Apptheme")}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
            <MenuItem
              icon={{ name: "lock-outline", type: "material" }}
              title="Privacy"
              description="Manage your information here."
              onPress={() => {}}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal</Text>
            <MenuItem
              icon={{ name: "description", type: "material" }}
              title="Terms of Service"
              description="Review our terms of service."
              onPress={() => {}}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
            <MenuItem
              icon={{ name: "visibility-off", type: "material" }}
              title="Privacy Policy"
              description="Learn about our privacy policy."
              onPress={() => {}}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
          </View>

          <View style={styles.section2}>
            <Text style={styles.sectionTitle}>Support</Text>
            <MenuItem
              icon={{ name: "feedback", type: "material" }}
              title="Send Feedback"
              description="Share your thoughts with us."
              onPress={() => {}}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
            <MenuItem
              icon={{ name: "group-add", type: "material" }}
              title="Invite Friend"
              description="Invite your friends."
              onPress={() => {}}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
            <MenuItem
              icon={{ name: "deleteuser", type: "antdesign" }}
              title="Delete Account"
              description="Erase your account."
              onPress={() => {}}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
            <MenuItem
              icon={{ name: "log-out", type: "entypo" }}
              title="Log Out"
              description="Sign off and take a break."
              onPress={showLogoutModal}
              iconColor="#2E5392"
              titleColor="#003366"
              descriptionColor="#003366"
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmLogout}
              >
                <Text style={styles.textStyle}>Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  header: {
    alignItems: "center",
    position: "relative",
    marginTop: 90,
    marginBottom: -85,
  },
  headerBackground: {
    height: 200,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
  },
  profile: {
    height: 99,
    width: 115,
    resizeMode: "contain",
  },
  imageContainer: {
    height: 120,
    width: 120,
    position: "absolute",
    bottom: 150,
    borderWidth: 5,
    backgroundColor: "#fff",
    borderColor: "#ADD4F2",
    borderRadius: 35,
  },
  content: {
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginTop: -35,
  },
  section: {
    marginTop: 20,
  },
  section2: {
    marginTop: 20,
    marginBottom: 35
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  iconContainer: {
    height: 40,
    width: 40,
    backgroundColor: "#E2EFFD",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    flex: 1,
    marginLeft: 10,
  },
  menuItemTitle: {
    fontFamily: "semibold",
    fontSize: 16,
    fontWeight: "500",
  },
  menuItemDescription: {
    fontSize: 14,
    fontFamily: "light",
  },
  cameraIcon: {
    backgroundColor: "#FFF",
    height: 35,
    width: 35,
    top: 125,
    right: 140,
    position: "absolute",
    borderRadius: 30,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginLeft: 20,
    elevation: 2,
    width: 100,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: COLORS.primary,
    gap: 15,
  },
  buttonConfirm: {
    backgroundColor: COLORS.red,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Profile;
