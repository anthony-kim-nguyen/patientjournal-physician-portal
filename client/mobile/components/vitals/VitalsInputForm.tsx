import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export type VitalsState = {
  systolic: string;
  diastolic: string;
  heartRate: string;
  temperature: string;
  comments: string;
};

type VitalsInputFormProps = {
  vitals: VitalsState;
  onChange: (key: keyof VitalsState, value: string) => void;
};

export default function VitalsInputForm({ vitals, onChange }: VitalsInputFormProps) {
  return (
    <>
      <View style={styles.rowInputContainer}>
        <Text style={styles.questionText}>Blood Pressure:</Text>
        <TextInput
          value={vitals.systolic}
          onChangeText={(text) => onChange('systolic', text)}
          placeholder="Systolic"
          keyboardType="numeric"
          style={styles.smallInput}
        />
        <TextInput
          value={vitals.diastolic}
          onChangeText={(text) => onChange('diastolic', text)}
          placeholder="Diastolic"
          keyboardType="numeric"
          style={styles.smallInput}
        />
      </View>

      <View style={styles.rowInputContainer}>
        <Text style={styles.questionText}>Heart Rate:</Text>
        <TextInput
          value={vitals.heartRate}
          onChangeText={(text) => onChange('heartRate', text)}
          placeholder="Enter value..."
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.rowInputContainer}>
        <Text style={styles.questionText}>Temperature:</Text>
        <TextInput
          value={vitals.temperature}
          onChangeText={(text) => onChange('temperature', text)}
          placeholder="Enter value..."
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.commentContainer}>
        <Text style={styles.questionText}>Comments:</Text>
        <TextInput
          value={vitals.comments}
          onChangeText={(text) => onChange('comments', text)}
          placeholder="Optional notes..."
          placeholderTextColor="gray"
          multiline
          numberOfLines={4}
          style={styles.commentInput}
        />
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  rowInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
  },
  smallInput: {
    width: 90,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
  },
  commentContainer: {
    marginVertical: 10,
  },
  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  questionText: {
    fontSize: 16,
  },
});