import { COLORS } from "@/constants";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Allergy {
  category: string;
  items: string[];
}

const allergies: Allergy[] = [
  {
    category: "Food Allergies",
    items: [
      "Peanuts",
      "Tree nuts (e.g., almonds, walnuts, cashews)",
      "Shellfish (e.g., shrimp, crab, lobster)",
      "Fish (e.g., salmon, tuna)",
      "Milk",
      "Eggs",
    ],
  },
  {
    category: "Environmental Allergies",
    items: [
      "Pollen",
      "Dust mites",
      "Pet dander",
      "Mold spores",
      "Insect stings",
      "Latex",
    ],
  },
  {
    category: "Medication Allergies",
    items: [
      "Penicillin",
      "Aspirin",
      "NSAIDs",
      "Sulfa drugs",
      "Anticonvulsants",
      "Chemotherapy drugs",
    ],
  },
  {
    category: "Contact Allergies",
    items: [
      "Nickel",
      "Cosmetics",
      "Hair dyes",
      "Detergents and soaps",
      "Plants (e.g., poison ivy)",
    ],
  },
  {
    category: "Other Allergies",
    items: ["Insect stings", "Cockroach droppings", "Chemical sensitivities"],
  },
];

const AllergiesScreen = () => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const navigation = useNavigation();

  const toggleAllergySelection = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(
        selectedAllergies.filter((item) => item !== allergy)
      );
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const handleNext = () => {
    if (selectedAllergies.length >= 5) {
      navigation.navigate("AllergiesList", { selectedAllergies });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {allergies.map((allergyGroup, index) => (
          <View key={index} style={styles.allergyGroup}>
            <Text style={styles.title}>{allergyGroup.category}</Text>
            <View style={styles.allergyItemsContainer}>
              {allergyGroup.items.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.allergyButton,
                    selectedAllergies.includes(item) &&
                      styles.selectedAllergyButton,
                  ]}
                  onPress={() => toggleAllergySelection(item)}
                >
                  <Text
                    style={[
                      styles.allergyButtonText,
                      selectedAllergies.includes(item) &&
                        styles.selectedAllergyButtonText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.nextButton,
          selectedAllergies.length >= 5
            ? styles.activeNextButton
            : styles.inactiveNextButton,
        ]}
        onPress={handleNext}
        disabled={selectedAllergies.length < 5}
      >
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  allergyGroup: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  allergyItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  allergyButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
  },
  selectedAllergyButton: {
    backgroundColor: COLORS.primary,
  },
  allergyButtonText: {
    color: COLORS.primary,
  },
  selectedAllergyButtonText: {
    color: "#fff",
  },
  nextButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  activeNextButton: {
    backgroundColor: COLORS.primary,
  },
  inactiveNextButton: {
    backgroundColor: COLORS.tertiary,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllergiesScreen;

//COLORS.primary
