import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext';
import { useCarePlan } from '../../context/CarePlanContext';
import { getPatientProfile } from '../../api_dao/patient';
import { getFullCarePlan } from '../../api_dao/careplan';
import homestyles from '../styles/HomeStyles';

export default function HomeScreen() {
  const router = useRouter();                         // For navigation between screens
  const { setUser } = useAuth();                      // Access auth context to allow logout
  const { setCarePlanData } = useCarePlan();          // Access care plan context to store global data
  const [patientName, setPatientName] = useState(''); // Local state for personalized greeting

  /**
   * useFocusEffect ensures this code runs every time
   * the screen comes into view (on mount and on return)
   */
  useFocusEffect(
    useCallback(() => {
      const loadEverything = async () => {
        try {
          const patient = await getPatientProfile();
          //console.log(patient);
          const name = patient?.name?.[0];
          const displayName = `${name?.given?.[0] || ''} ${name?.family || ''}`.trim();
          setPatientName(displayName || 'Patient');

          const data = await getFullCarePlan();
          setCarePlanData({ ...data, patient });
        } catch (err) {
          console.error("❌ Failed to load patient or care plan:", err);
          setPatientName('Patient');
        }
      };

      loadEverything(); 
    }, []) 
  );

  return (
    <View style={homestyles.container}>
      {/* Greeting with patient name */}
      <Text style={homestyles.greeting}>Hello, {patientName}</Text>

      {/* App logo */}
      <Image
        source={require('../../assets/images/PatientJournal_Logo.png')}
        style={homestyles.logo}
        resizeMode="contain"
      />

      {/* Starts the guided MyJournal flow: Vitals → Symptoms → Meds */}
      <TouchableOpacity
        style={homestyles.largeButton}
        onPress={() => router.push({ pathname: '/screens/journal/vitals', params: { flow: 'myjournal' } })}
      >
        <Text style={homestyles.buttonText}>MyJournal</Text>
      </TouchableOpacity>

      {/* Direct access to individual journal features */}
      <View style={homestyles.row}>
        <TouchableOpacity style={homestyles.smallButton} onPress={() => router.push('../screens/journal/medication')}>
          <Text style={homestyles.buttonText}>Meds</Text>
        </TouchableOpacity>

        <TouchableOpacity style={homestyles.smallButton} onPress={() => router.push('../screens/journal/symptoms')}>
          <Text style={homestyles.buttonText}>Symptoms</Text>
        </TouchableOpacity>

        <TouchableOpacity style={homestyles.smallButton} onPress={() => router.push('../screens/journal/vitals')}>
          <Text style={homestyles.buttonText}>Vitals</Text>
        </TouchableOpacity>
      </View>

      {/* Navigate to visual summary (e.g., graph-based data) */}
      <TouchableOpacity style={homestyles.largeButton} onPress={() => router.push('/screens/graph-summary')}>
        <Text style={homestyles.buttonText}>Graph Summary</Text>
      </TouchableOpacity>

      {/* Placeholder for future settings or customization options */}
      <TouchableOpacity style={homestyles.largeButton}>
        <Text style={homestyles.buttonText}>Options</Text>
      </TouchableOpacity>

      {/* Sign out and clear the user context */}
      <TouchableOpacity style={homestyles.signOutButton} onPress={() => {
                                                                          setUser(null);
                                                                          setCarePlanData(null);
                                                                          }}>
        <Text style={homestyles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
