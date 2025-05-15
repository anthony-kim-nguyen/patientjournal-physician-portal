import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

interface SymptomBarChartProps {
  symptomMap: { [question: string]: { [date: string]: number } };
  selectedQuestion: string;
  chartConfig: any;
}

export default function SymptomBarChart({
  symptomMap,
  selectedQuestion,
  chartConfig,
}: SymptomBarChartProps) {
  const dateToScore = symptomMap[selectedQuestion] || {};
  const labels = Object.keys(dateToScore);
  const rawValues = Object.values(dateToScore);
  const clampedValues = rawValues.map((v) => Math.min(10, Math.max(1, Math.round(v)))); 

  if (labels.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No data for "{selectedQuestion}"</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.chartTitle}>{selectedQuestion}</Text>
      <BarChart
        data={{
          labels,
          datasets: [{ data: clampedValues }],
        }}
        width={screenWidth - 20}
        height={200}
        fromZero={true}
        segments={9}
        chartConfig={chartConfig}
        style={styles.chart}
        verticalLabelRotation={-30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  chart: {
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  centered: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
