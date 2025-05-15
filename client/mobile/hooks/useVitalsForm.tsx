import { useState } from 'react';

export interface VitalsState {
  systolic: string;
  diastolic: string;
  heartRate: string;
  temperature: string;
  comments: string;
}

export function useVitalsForm() {
  const [vitals, setVitals] = useState<VitalsState>({
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    comments: ''
  });

  const handleChange = (key: keyof VitalsState, value: string) => {
    setVitals(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return { vitals, handleChange };
}