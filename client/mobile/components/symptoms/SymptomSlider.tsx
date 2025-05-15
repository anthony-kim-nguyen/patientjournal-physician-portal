import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function SymptomSlider({ question, value, onChange }: {
  question: any;
  value: number;
  onChange: (key: string, value: number) => void;
}) {
  const getColor = (val: number) => {
    if (val <= 4) return 'red';
    if (val <= 7) return 'yellow';
    return 'green';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{question.text}</Text>
      <Text style={styles.value}>Your Answer: {value}</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={value}
        onValueChange={(val) => onChange(question.linkId, val)}
        minimumTrackTintColor={getColor(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 20,
    padding: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
