// GraphSummaryScreen.tsx
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, ScrollView, ActivityIndicator, StyleSheet, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { getMyJournalEntries } from '../../../api_dao/journalEntry';
import { processObservations } from '../../../components/graph/observationProcessor';
import { LineChart } from 'react-native-chart-kit';
import SymptomBarChart from '../../../components/graph/SymptomBarChart';
import VitalData from '@/app/models/Vitals';

const screenWidth = Dimensions.get('window').width;

export default function GraphSummaryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [vitalData, setVitalData] = useState<VitalData | null>(null);
  const [symptomMap, setSymptomMap] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    (async () => {
      try {
        const bundle = await getMyJournalEntries();
        // console.log("BUDLE==========",bundle);
        // console.log(JSON.stringify(bundle.entry.map(e => e.resource), null, 2));

        const { vitals, symptoms } = processObservations(bundle?.entry || []);
        setVitalData(vitals);
        setSymptomMap(symptoms);
      } catch (err) {
        console.error('❌ Error loading journal data:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: () => '#333',
    style: { borderRadius: 8 },
    propsForDots: { r: '3', strokeWidth: '2', stroke: '#333' },
    propsForBackgroundLines: { strokeDasharray: '' },
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={[styles.inlineBackButton, { top: insets.top + 10 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.inlineBackText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Patient Summary</Text>
        <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric'
        })}</Text>

        {vitalData && (
          <>
            <Text style={styles.chartTitle}>Blood Pressure (Systolic & Diastolic)</Text>
            <LineChart
              data={{
                labels: vitalData.labels,
                datasets: [
                  {
                    data: vitalData.systolic.map(v => typeof v === 'number' && isFinite(v) ? v : null),
                    color: () => 'red',
                    strokeWidth: 2
                  },
                  {
                    data: vitalData.diastolic.map(v => typeof v === 'number' && isFinite(v) ? v : null),
                    color: () => 'blue',
                    strokeWidth: 2
                  },
                ],
                legend: ['Systolic', 'Diastolic']
              }}
              width={screenWidth - 20}
              height={160}
              yAxisSuffix=" mmHg"
              yLabelsOffset={5}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              verticalLabelRotation={-30}
              decorator={() => (
                <View>
                  <View style={{
                    position: 'absolute',
                    top: 40,
                    height: 20,
                    marginLeft: 63,
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    width: '83%'
                  }} />
                  <View style={{
                    position: 'absolute',
                    top: 80,
                    height: 20,
                    marginLeft: 63,
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    width: '83%'
                  }} />
                </View>
              )}
              fromZero
            />

            <Text style={styles.chartTitle}>Heart Rate</Text>
            <LineChart
              data={{
                labels: vitalData.labels,
                datasets: [
                  {
                    data: vitalData.heartRate.map(v => typeof v === 'number' && isFinite(v) ? v : null),
                    color: () => 'green',
                    strokeWidth: 2
                  },
                ],
                legend: ['Heart Rate']
              }}
              width={screenWidth - 20}
              height={160}
              yAxisSuffix=" bpm"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              verticalLabelRotation={-30}
              fromZero
            />

            <Text style={styles.chartTitle}>Body Temperature</Text>
            <LineChart
              data={{
                labels: vitalData.labels,
                datasets: [
                  {
                    data: vitalData.temperature.map(v => typeof v === 'number' && isFinite(v) ? v : null),
                    color: () => 'orange',
                    strokeWidth: 2
                  },
                ],
                legend: ['Body Temperature']
              }}
              width={screenWidth - 20}
              height={160}
              yAxisSuffix=" F"
              chartConfig={chartConfig}
              bezier
              verticalLabelRotation={-30}
              style={styles.chart}
              fromZero
            />
          </>
        )}

        {Object.entries(symptomMap).map(([question, _]) => (
          <SymptomBarChart
            key={question}
            symptomMap={symptomMap}
            selectedQuestion={question}
            chartConfig={{
              ...chartConfig,
              yAxisLabel: '',
              yAxisSuffix: '',
              segments: 9,
              fromZero: true,
            }}
          />
        ))}

        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Return to Main Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    backgroundColor: '#fff',
    paddingBottom: 30,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5
  },
  chart: {
    marginVertical: 8,
    paddingBottom: 10,
    borderRadius: 8,
    alignSelf: 'center'
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5
  },
  inlineBackButton: {
    position: 'absolute',
    left: 15,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  inlineBackText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 30,
    marginBottom: 80,
    backgroundColor: '#000080',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});