import React from 'react';
import {  useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import VitalsInputForm from '../../../../components/vitals/VitalsInputForm';
import { useVitalsForm } from '../../../../hooks/useVitalsForm';
import { buildVitalsBundle } from '../../../../components/vitals/VitalsBundle';
import { createJournalEntry } from '../../../../api_dao/journalEntry';
import { useCarePlan } from '../../../../context/CarePlanContext';




function VitalsScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const params = useLocalSearchParams();
    const isMyJournalFlow = params.flow === 'myjournal';
    const { carePlanData } = useCarePlan();
    const patientId = carePlanData?.patient?.id;
    const patientName = carePlanData?.patient?.name?.[0]?.given?.[0];   

    const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const { vitals, handleChange } = useVitalsForm();

    const logVitals = async () => {
        const now = new Date().toISOString();
        const bundle = buildVitalsBundle(vitals, patientId);

        try {
        const response = await createJournalEntry(bundle);
        //console.log("Vitals submitted:", response);
        alert("Vitals logged to MyJournal successfully!");
        if (isMyJournalFlow) {
            router.push({ pathname: '/screens/journal/symptoms', params: { flow: 'myjournal' } });
        } else {
            router.push('/home');
        }
        } catch (error) {
        console.error("Failed to submit vitals:", error);
        alert("Error logging vitals. Please try again.");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableOpacity
                style={{ position: 'absolute', top: insets.top, left: 15, padding: 8, backgroundColor: '#f0f0f0', borderRadius: 8, zIndex: 10 }}
                onPress={() => router.back()}
            >
                <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>← Back</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: 30 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Date: {today}</Text>
                <VitalsInputForm vitals={vitals} onChange={handleChange} />


                <TouchableOpacity
                style={{ width: '70%', backgroundColor: '#000080', paddingVertical: 10, borderRadius: 5, alignItems: 'center', alignSelf: 'center', marginTop: 20 }}
                onPress={logVitals}
                >
                <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>Log Vitals</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default VitalsScreen;