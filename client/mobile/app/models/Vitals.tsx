
type VitalData = {
        labels: string[];
        systolic?: number[];
        diastolic?: number[];
        heartRate?: number[];
        temperature?: number[];
        symptoms?: { [question: string]: number };
        
    };

export default VitalData