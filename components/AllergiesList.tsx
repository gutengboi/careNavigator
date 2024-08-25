import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants";

type SelectedAllergiesRouteProp = RouteProp<
  { SelectedAllergies: { selectedAllergies: string[] } },
  "SelectedAllergies"
>;

const AllergiesList: React.FC = () => {
  const route = useRoute<SelectedAllergiesRouteProp>();
  const navigation = useNavigation();
  const [allergies, setAllergies] = useState<string[]>(
    route.params.selectedAllergies
  );

  const handleDelete = (rowKey: string) => {
    const newData = [...allergies];
    const prevIndex = allergies.findIndex((item) => item === rowKey);
    newData.splice(prevIndex, 1);
    setAllergies(newData);
  };

  const handleAddMore = () => {
    navigation.navigate("Allergies");
  };

  return (
    <View style={styles.container}>
      <SwipeListView
        data={allergies.map((allergy) => ({ key: allergy }))}
        renderItem={({ item }) => (
          <View style={styles.allergyItem}>
            <Text style={styles.allergyText}>{item.key}</Text>
          </View>
        )}
        renderHiddenItem={({ item }) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.key)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
        disableRightSwipe
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handleAddMore}>
        <Ionicons name="add" size={30} color="#fff" />
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
  allergyItem: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginBottom: 8,
    borderRadius: 10,
  },
  allergyText: {
    fontSize: 18,
    color: "#333",
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 2,
    marginBottom: 8,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "80%",
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  floatingButton: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    elevation: 8,
  },
});

export default AllergiesList;
