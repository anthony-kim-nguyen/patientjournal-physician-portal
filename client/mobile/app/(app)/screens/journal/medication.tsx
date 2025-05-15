import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCarePlan } from '../../../../context/CarePlanContext';
import { useMedicationList } from '../../../../hooks/useMedicationList';
import MedicationList from '../../../../components/medication/MedicationList';
import {FinishJournalButton} from '../../../../components/medication/FinishJournalButton';
import styles from '../../../styles/MedicationStyle';

export default function MedicationScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const isMyJournalFlow = params?.flow === 'myjournal';

  const { carePlanData } = useCarePlan();
  const [isReminderMode, setIsReminderMode] = useState(false);

  const [medList, setMedList] = useMedicationList(carePlanData?.medications);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 10 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
        <Text style={styles.header}>Medications</Text>

        <View style={styles.columnHeader}>
          <Text style={styles.columnHeaderText}>
            {isReminderMode ? 'Reminder?' : 'Taken?'}
          </Text>
        </View>

        <MedicationList
          medList={medList}
          setMedList={setMedList}
          isReminderMode={isReminderMode}
        />

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsReminderMode(!isReminderMode)}
        >
          <Text style={styles.editButtonText}>
            {isReminderMode ? 'Log Doses' : 'Set Alerts'}
          </Text>
        </TouchableOpacity>

        {isMyJournalFlow && <FinishJournalButton insets={insets}/>}
      </ScrollView>
    </View>
  );
}
