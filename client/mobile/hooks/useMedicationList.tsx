// 📁 context/useMedicationList.ts
import { useEffect, useState } from 'react';

export function useMedicationList(medications: any[] | undefined) {
  const [medList, setMedList] = useState<any[]>([]);

  useEffect(() => {
    if (!medications) return;

    const parsed = medications.map((med: any, idx: number) => {
      const medName = med.medicationCodeableConcept?.text || `Medication ${idx + 1}`;
      const dosageInstruction = Array.isArray(med.dosageInstruction) ? med.dosageInstruction[0] : null;
      const timing = dosageInstruction?.timing?.repeat?.timeOfDay?.[0] || '';
      const dose = dosageInstruction?.doseAndRate?.[0]?.doseQuantity?.value || '';
      const unit = dosageInstruction?.doseAndRate?.[0]?.doseQuantity?.unit || '';
      const fullDose = `${dose} ${unit}`.trim();

      return {
        name: medName,
        dose: fullDose && timing ? `${fullDose} @ ${timing}` : fullDose || 'Take as directed',
        taken: false,
        reminderSet: false,
        image: require('../assets/images/react-logo.png'),
      };
    });

    setMedList(parsed);
  }, [medications]);

  return [medList, setMedList] as const;
}