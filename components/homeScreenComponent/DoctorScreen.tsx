import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants"; 
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const doctorsData = [
  {
    id: 1,
    name: "Dr. Romi Ahmed",
    field: "Dentist",
    rating: 4.8,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx9_YGXkCZ96VfdvVYVGQSL7Pk3HSaIgmsYw&s",
  },
  {
    id: 2,
    name: "Dr. Olivia Turner",
    field: "Dermatologist",
    rating: 4.5,
    image:
      "https://img.freepik.com/free-photo/smiling-asian-male-doctor-pointing-upwards_1262-18321.jpg",
  },
  {
    id: 3,
    name: "Dr. John Doe",
    field: "General Medical Practice",
    rating: 4.7,
    image:
      "https://www.shutterstock.com/image-photo/healthcare-medical-staff-concept-portrait-600nw-2281024823.jpg",
  },
  {
    id: 4,
    name: "Dr. Sarah Smith",
    field: "Pediatrician",
    rating: 4.9,
    image:
      "https://www.citizenshospitals.com/static/uploads/130789a4-764e-4ee3-88fe-68f9278452d6-1692966652977.png", // Replace with actual image URL
  },
  // More doctors can be added here
];

const medicalFields = [
  "Dentist",
  "Dermatologist",
  "General Medical Practice",
  "Pediatrician",
  "Cardiologist",
  // Add more fields as necessary
];

const DoctorScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState(null);
  const navigation = useNavigation();


  const filterDoctors = () => {
    return doctorsData.filter((doctor) => {
      const matchesSearchQuery =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.field.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesField = selectedField
        ? doctor.field === selectedField
        : true;
      return matchesSearchQuery && matchesField;
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Search Field */}
      <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctor or field"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Medical Fields */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.fieldScroll}
      >
        {medicalFields.map((field) => (
          <TouchableOpacity
            key={field}
            style={[
              styles.fieldButton,
              selectedField === field && styles.selectedFieldButton,
            ]}
            onPress={() =>
              setSelectedField(field === selectedField ? null : field)
            }
          >
            <Text
              style={[
                styles.fieldButtonText,
                selectedField === field && styles.selectedFieldButtonText,
              ]}
            >
              {field}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <FlatList
        data={filterDoctors()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.doctorCard}
            onPress={() =>
              navigation.navigate("DoctorProfile", {
                name: item.name,
                field: item.field,
                image: item.image,
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.doctorField}>{item.field}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.doctorList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  fieldScroll: {
    marginBottom: 20,
  },
  fieldButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: "#EFEFEF",
    marginRight: 10,
  },
  selectedFieldButton: {
    backgroundColor: COLORS.primary,
  },
  fieldButtonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedFieldButtonText: {
    color: "#FFF",
  },
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
    marginBottom: 10,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  doctorField: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  doctorList: {
    marginBottom: 20,
  },
});

export default DoctorScreen;
