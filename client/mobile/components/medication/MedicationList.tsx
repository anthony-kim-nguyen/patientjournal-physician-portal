import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MedicationCard } from './MedicationCard';
import { useCarePlan } from '../../context/CarePlanContext';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

interface MedicationListProps {
  medList: any[];
  setMedList: React.Dispatch<React.SetStateAction<any[]>>;
  isReminderMode: boolean;
}

export default function MedicationList({ medList, setMedList, isReminderMode }: MedicationListProps) {
  const { carePlanData } = useCarePlan();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showPickerIndex, setShowPickerIndex] = useState<number | null>(null);

  const toggleImageSize = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleReminderSet = async (index: number, selectedTime: Date) => {
    const now = new Date();
    const seconds = Math.floor((selectedTime.getTime() - now.getTime()) / 1000);

    if (seconds <= 0) {
      Alert.alert("Invalid Time", "Please select a time in the future.");
      return;
    }

    const med = medList[index];

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

    Alert.alert(
      "Reminder Set",
      `Reminder for ${med.name} in ${Math.floor(seconds / 60)} minutes`
    );
  };

  const logTaken = (index: number, selected: Date) => {
    const updated = [...medList];
    updated[index].taken = true;
    setMedList(updated);

    const patientId = carePlanData?.careplan?.subject?.reference || "Patient/unknown";

    const medicationStatement = {
      resourceType: "MedicationStatement",
      status: "completed",
      medicationCodeableConcept: {
        text: updated[index].name,
      },
      subject: {
        reference: patientId,
      },
      effectiveDateTime: selected.toISOString(),
      dateAsserted: new Date().toISOString(),
      taken: "y",
    };

    console.log("📝 Logged MedicationStatement:", medicationStatement);
    Alert.alert("✅ Taken Logged", `${updated[index].name} recorded at ${selected.toLocaleTimeString()}`);
  };

  return (
    <>
      {medList.map((med, index) => (
        <View key={index}>
          <MedicationCard
            med={med}
            index={index}
            isReminderMode={isReminderMode}
            expandedIndex={expandedIndex}
            toggleImageSize={toggleImageSize}
            onPressCheck={() => setShowPickerIndex(index)}
          />

          {showPickerIndex === index && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={async (event, selectedTime) => {
                if (event.type === 'dismissed') {
                  setShowPickerIndex(null);
                  return;
                }

                const now = new Date();
                const selected = new Date(selectedTime || now);
                selected.setFullYear(now.getFullYear(), now.getMonth(), now.getDate());

                if (selected <= now) {
                  selected.setDate(selected.getDate() + 1);
                }

                if (isReminderMode) {
                  await handleReminderSet(index, selected);
                } else {
                  logTaken(index, selected);
                }

                setShowPickerIndex(null);
              }}
            />
          )}
        </View>
      ))}
    </>
  );
}
