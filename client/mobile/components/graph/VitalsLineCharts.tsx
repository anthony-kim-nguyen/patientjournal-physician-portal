import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const isValidNumber = (val: any): boolean =>
  typeof val === 'number' && !isNaN(val) && isFinite(val);

interface VitalsLineChartsProps {
  chartData: {
    labels: string[];
    systolic: number[];
    diastolic: number[];
    heartRate: number[];
    temperature: number[];
  };
  chartConfig: any;
}

const colorMap: Record<string, string> = {
  systolic: 'red',
  diastolic: 'blue',
  heartRate: 'green',
  temperature: 'orange',
};

export default function VitalsLineCharts({ chartData, chartConfig }: VitalsLineChartsProps) {
  const vitalKeys = ['systolic', 'diastolic', 'heartRate', 'temperature'];

  return (
    <>
      {vitalKeys.map((key) => {
        const values = chartData[key as keyof typeof chartData];
        if (!values.some(isValidNumber)) return null;

        return (
          <View key={key}>
            <Text style={styles.chartTitle}>{key.replace(/([A-Z])/g, ' $1')}</Text>
            <LineChart
              data={{
                labels: chartData.labels,
                datasets: [{
                  data: values.map(v => isValidNumber(v) ? v : null),
                  color: () => colorMap[key],
                  strokeWidth: 2,
                }],
                legend: [key.replace(/([A-Z])/g, ' $1')],
              }}
              width={screenWidth - 20}
              height={160}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              fromZero
            />
          </View>
        );
      })}
    </>
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
});
