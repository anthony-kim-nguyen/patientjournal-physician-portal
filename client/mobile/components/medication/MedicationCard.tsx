import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import styles from '../../app/styles/MedicationStyle';

export const MedicationCard = ({
  index,
  med,
  expandedIndex,
  setExpandedIndex,
  showPickerIndex,
  setShowPickerIndex,
  isReminderMode,
  setMedList,
  medList,
  carePlanData
}: any) => {
  const toggleImageSize = () => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleReminderSet = async (selectedTime: Date) => {
    const now = new Date();
    const seconds = Math.floor((selectedTime.getTime() - now.getTime()) / 1000);

    if (seconds <= 0) {
      Alert.alert("Invalid Time", "Please select a time in the future.");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Medication Reminder',
        body: `Time to take ${med.name}`,
        sound: true,
      },
      trigger: {
        type: 'timeInterval',
        seconds,
        repeats: false,
      },
    });

    const updated = [...medList];
    updated[index].reminderSet = true;
    setMedList(updated);

    Alert.alert("Reminder Set", `Reminder for ${med.name} in ${Math.floor(seconds / 60)} minutes`);
  };

  const handleTaken = (takenTime: Date) => {
    const updated = [...medList];
    updated[index].taken = true;

    const patientId = carePlanData?.careplan?.subject?.reference || 'Patient/unknown';
    const medicationStatement = {
      resourceType: 'MedicationStatement',
      status: 'completed',
      medicationCodeableConcept: { text: updated[index].name },
      subject: { reference: patientId },
      effectiveDateTime: takenTime.toISOString(),
      dateAsserted: new Date().toISOString(),
      taken: 'y',
    };

    console.log('📝 Logged MedicationStatement:', medicationStatement);
    Alert.alert('✅ Taken Logged', `${updated[index].name} recorded at ${takenTime.toLocaleTimeString()}`);
    setMedList(updated);
  };

  return (
    <View key={index} style={styles.medContainer}>
      <TouchableOpacity onPress={toggleImageSize}>
        <Image source={med.image} style={[styles.medImage, expandedIndex === index && styles.expandedImage]} />
      </TouchableOpacity>

      <View style={styles.medText}>
        <Text style={[styles.medName, expandedIndex === index && styles.enlargedName]}>{med.name}</Text>
        <Text style={[styles.medDose, expandedIndex === index && styles.enlargedDose]}>{med.dose}</Text>
      </View>

      <TouchableOpacity
        style={[styles.checkmarkBox, (isReminderMode ? med.reminderSet : med.taken) && styles.checkedBox]}
        onPress={() => setShowPickerIndex(index)}
      >
        <Text style={styles.checkmarkText}>
          {isReminderMode ? (med.reminderSet ? '⏰' : '') : (med.taken ? '✔⏰' : '')}
        </Text>
      </TouchableOpacity>

      {showPickerIndex === index && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={(_, selectedTime) => {
            setShowPickerIndex(null);
            if (!selectedTime) return;

            const now = new Date();
            selectedTime.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());
            if (selectedTime <= now) selectedTime.setDate(selectedTime.getDate() + 1);

            isReminderMode ? handleReminderSet(selectedTime) : handleTaken(selectedTime);
          }}
        />
      )}
    </View>
  );
};