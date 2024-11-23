import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { COLORS } from '@/constants';

type MedicalReport = {
  id: string;
  date: string; // Original date string in YYYY-MM-DD format
  hospitalName: string;
  reason: string;
  doctor: string;
  prescription: string;
};

const initialReports: MedicalReport[] = [
  {
    id: '1',
    date: '2023-03-27',
    hospitalName: 'Healthy Family Centre',
    reason: 'Allergy Checkup',
    doctor: 'Dr. Jane Doe',
    prescription: 'Antihistamines',
  },
  {
    id: '2',
    date: '2023-04-10',
    hospitalName: 'Healthy Family Centre',
    reason: 'Diabetes Management',
    doctor: 'Dr. John Smith',
    prescription: 'Metformin',
  },
];

const MedicalReportScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reports, setReports] = useState<MedicalReport[]>(initialReports);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<MedicalReport | null>(null);

  // Function to format date in the required format: Monday, 27 March 2023
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleDelete = (report: MedicalReport) => {
    setReports(reports.filter(r => r.id !== report.id));
    setDeleteModalVisible(false);
  };

  const handleDeleteRequest = (report: MedicalReport) => {
    setReportToDelete(report);
    setDeleteModalVisible(true);
  };

  const filteredReports = reports.filter(report =>
    report.hospitalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: { item: MedicalReport }) => (
    <Card style={styles.card}>
      <Card.Content>
        {/* Row with date and delete action */}
        <View style={styles.headerRow}>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          <TouchableOpacity onPress={() => handleDeleteRequest(item)}>
            <Text style={styles.deleteText}>Delete Record</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.hospitalText}>{item.hospitalName}</Text>

        {/* Display all details directly on the card */}
        <Text style={styles.detailTitle}>Reason for Visit</Text>
        <Text style={styles.detailText}>{item.reason}</Text>

        <View style={styles.headerRow}>
        <Text style={styles.detailTitle}>Doctor Seen</Text>
        <Text style={styles.detailText}>{item.doctor}</Text>
        </View>

        <Text style={styles.detailTitle}>Drugs/Treatment Prescribed</Text>
        <Text style={styles.detailText}>{item.prescription}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search your report"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
      </View>
      <FlatList
        data={filteredReports}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.noReportText}>No reports found</Text>}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Delete Report</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this report from your record
              {/* {' '}
              {reportToDelete?.hospitalName} dated {reportToDelete && formatDate(reportToDelete.date)}? */}
            </Text>
            <View style={styles.modalButtons}>
            <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={() => reportToDelete && handleDelete(reportToDelete)}
              >
                <Text style={styles.textStyle}>Delete</Text>
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
    padding: 10,
    //backgroundColor: COLORS.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff', 
    borderRadius: 20,       
    paddingHorizontal: 10,
    paddingVertical: 5,      
    marginBottom: 10,
    borderWidth: 1,          
    borderColor: '#ccc',   
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchIcon: {
    marginLeft: 10,
  },
  card: {
    marginBottom: 10,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  hospitalText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  noReportText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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


export default MedicalReportScreen;
