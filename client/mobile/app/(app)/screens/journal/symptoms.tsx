import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCarePlan } from '../../../../context/CarePlanContext';
import { useSymptomForm } from '../../../../hooks/useSymptomForm';
import SymptomSlider from '../../../../components/symptoms/SymptomSlider';
import { buildSymptomsBundle } from '@/components/symptoms/SymptomsBundle';
import { createJournalEntry } from '@/api_dao/journalEntry';
import homestyles from '../../../styles/HomeStyles';
import question from '@/app/models/Question';


export default function SymptomsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const isMyJournalFlow = params?.flow === 'myjournal';
    const { carePlanData } = useCarePlan();

    const patientId = carePlanData?.patient?.id;
    const patientName = carePlanData?.patient?.name?.[0]?.given?.[0];  

    const today = new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    });

    const {
        questionnaire, questions, symptoms, handleSliderChange, 
    } = useSymptomForm(carePlanData);

    const logSymptoms = async () => {
      console.log('[Submit] Final symptom scores:', symptoms);
      const bundle = buildSymptomsBundle(symptoms, questions, patientId, new Date().toISOString());

    
      try {
        await createJournalEntry(bundle);
        alert('Symptoms logged successfully!');
        if (isMyJournalFlow) {
          router.push({ pathname: '/screens/journal/medication', params: { flow: 'myjournal' } });
        } else {
          router.push('/home');
        }
      } catch (error) {
        console.error('❌ Failed to log symptoms:', error);
        alert('Failed to log symptoms. Please try again.');
      }
    };
    

    if (!questionnaire) {
        return (
          <View style={styles.centered}>
            <Text>No symptom questionnaire found in care plan.</Text>
          </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <TouchableOpacity
            style={[styles.backButton, { top: insets.top + 10 }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <ScrollView contentContainerStyle={{ paddingTop: insets.top, paddingBottom: 30 }}>
            <Text style={styles.dateText}>Date: {today}</Text>

            {questions.map((q: question) => (
              <SymptomSlider
                key={q.linkId}
                question={q}
                value={symptoms[q.linkId] ?? 5}
                onChange={handleSliderChange}
              />
            ))}

            <TouchableOpacity style={styles.logButton} onPress={logSymptoms}>
              <Text style={homestyles.buttonText}>
                {isMyJournalFlow ? 'Next' : 'Log Symptoms'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
    );
  }

  const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      position: 'absolute',
      left: 15,
      zIndex: 10,
      padding: 8,
      backgroundColor: '#f0f0f0',
      borderRadius: 8,
    },
    backText: {
      fontSize: 16,
      color: '#333',
      fontWeight: 'bold',
    },
    logButton: {
      width: '70%',
      backgroundColor: '#000080',
      paddingVertical: 10,
      borderRadius: 5,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 20,
    },
    dateText: {
      fontSize: 20,
      color: '#666',
      textAlign: 'center',
      marginBottom: 10,
    },
});