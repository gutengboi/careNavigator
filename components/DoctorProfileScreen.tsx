import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { CalendarList } from "react-native-calendars";

const DoctorProfileScreen  = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const selectTime = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: "https://example.com/doctor.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Dr. Theressa Wahler</Text>
        <Text style={styles.profileDetails}>
          General Practitioner • 6 yrs of exp.
        </Text>
      </View>

      <TouchableOpacity style={styles.scheduleButton}>
        <Text style={styles.scheduleButtonText}>Schedule</Text>
      </TouchableOpacity>

      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleHeader}>Today's Schedule</Text>

        <CalendarList
          horizontal
          pagingEnabled
          calendarWidth={350}
          minDate={"2024-08-01"}
          maxDate={"2024-08-31"}
          markedDates={{
            "2024-08-15": {
              selected: true,
              marked: true,
              selectedColor: "#3366ff",
            },
            "2024-08-16": { marked: true },
          }}
          theme={{
            selectedDayBackgroundColor: "#3366ff",
            todayTextColor: "#3366ff",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
          }}
        />

        <View style={styles.scheduleTimesContainer}>
          <Text>Choose schedule time</Text>
          <View style={styles.scheduleTimesRow}>
            {["08:30", "09:00", "09:30", "10:00"].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.scheduleTimeButton,
                  selectedTime === time && styles.selectedTimeButton,
                ]}
                onPress={() => selectTime(time)}
              >
                <Text
                  style={[
                    styles.scheduleTimeButtonText,
                    selectedTime === time && styles.selectedTimeButtonText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.scheduleTimesRow}>
            {["10:30", "11:00"].map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.scheduleTimeButton,
                  selectedTime === time && styles.selectedTimeButton,
                ]}
                onPress={() => selectTime(time)}
              >
                <Text
                  style={[
                    styles.scheduleTimeButtonText,
                    selectedTime === time && styles.selectedTimeButtonText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f8fc",
  },
  profileInfo: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileDetails: {
    fontSize: 14,
    color: "#6e7a8a",
    marginTop: 5,
  },
  scheduleButton: {
    backgroundColor: "#3366ff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  scheduleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  scheduleContainer: {
    marginTop: 20,
  },
  scheduleHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scheduleTimesContainer: {
    marginTop: 10,
  },
  scheduleTimesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  scheduleTimeButton: {
    backgroundColor: "#e3e5ea",
    padding: 10,
    borderRadius: 8,
    width: 70,
    alignItems: "center",
  },
  selectedTimeButton: {
    backgroundColor: "#3366ff",
  },
  scheduleTimeButtonText: {
    color: "#6e7a8a",
  },
  selectedTimeButtonText: {
    color: "#fff",
  },
});

export default DoctorProfileScreen;
