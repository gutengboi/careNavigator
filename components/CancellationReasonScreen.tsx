import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For back arrow
import { COLORS } from '@/constants'; // Assuming you have a color scheme defined

interface Props {
  title: string;
  onBackPress?: () => void;
}

const CancellationReasonScreen = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reasons = ['Rescheduling', 'Weather Conditions', 'Unexpected Work', 'Others'];

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    if (reason !== 'Others') {
      setCustomReason(''); // Clear custom reason if other reason is selected
    }
  };

  const handleCancel = () => {
    // Handle the appointment cancellation logic here
    console.log('Selected Reason:', selectedReason);
    console.log('Custom Reason:', customReason);
  };

  const isSubmitDisabled = selectedReason === 'Others' && !customReason;

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Please let us know why you’re canceling your appointment.
      </Text>

      {reasons.map((reason, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioContainer}
          onPress={() => handleReasonSelect(reason)}
        >
          <View style={styles.radioButtonOuter}>
            {selectedReason === reason && <View style={styles.radioButtonInner} />}
          </View>
          <Text style={styles.radioLabel}>{reason}</Text>
        </TouchableOpacity>
      ))}

      {selectedReason === 'Others' && (
        <TextInput
          style={styles.customReasonInput}
          placeholder="Enter your reason here..."
          value={customReason}
          onChangeText={setCustomReason}
          multiline
        />
      )}

      <TouchableOpacity 
        style={[styles.cancelButton, isSubmitDisabled && styles.disabledButton]} 
        onPress={handleCancel}
        disabled={isSubmitDisabled}
      >
        <Text style={styles.cancelButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  radioButtonOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  radioLabel: {
    fontSize: 16,
  },
  customReasonInput: {
    borderWidth: 1,
    borderColor:  COLORS.primary,
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  disabledButton: {
    backgroundColor: '#CCC', // Grey out the button when disabled
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CancellationReasonScreen;
