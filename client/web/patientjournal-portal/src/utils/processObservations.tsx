export interface VitalsData {
  labels: string[];
  systolic: number[];
  diastolic: number[];
  heartRate: number[];
  temperature: number[];
}

export function processObservations(entries: any[]): { vitals: VitalsData, symptoms: Record<string, Record<string, number>> } {
  const vitals: VitalsData = {
    labels: [],
    systolic: [],
    diastolic: [],
    heartRate: [],
    temperature: [],
  };

  const symptoms: Record<string, Record<string, number>> = {};
  const labelIndex: Record<string, number> = {};

  let vitalCount = 0;

  for (const obs of entries) {
    const datetime = new Date(obs.effectiveDateTime);
    const date = datetime.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const time = datetime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const label = `${date} | ${time}`;



    const code = obs.code?.coding?.find(c => !!c.code)?.code;
    const value = obs.valueQuantity?.value ?? obs.valueInteger;
    const text = obs.code?.text;

    if (typeof value !== 'number' || isNaN(value)) continue;

    if (!(label in labelIndex)) {
      labelIndex[label] = vitals.labels.length;
      vitals.labels.push(label);
      vitals.systolic.push(NaN);
      vitals.diastolic.push(NaN);
      vitals.heartRate.push(NaN);
      vitals.temperature.push(NaN);
    }

    const idx = labelIndex[label];

    if (code === '8480-6') {
      vitals.systolic[idx] = value;
      vitalCount++;
    } else if (code === '8462-4') {
      vitals.diastolic[idx] = value;
      vitalCount++;
    } else if (code === '8867-4') {
      vitals.heartRate[idx] = value;
      vitalCount++;
    } else if (code === '8310-5') {
      vitals.temperature[idx] = value;
      vitalCount++;
    } else if (text) {
      symptoms[text] ||= {};
      symptoms[text][label] = value;
    }
  }

  console.log(`✅ Vitals found: ${vitalCount} out of ${entries.length} observations`);
  console.log('🕒 Vitals labels:', vitals.labels);

  console.log("vitals: ",vitals);
  return { vitals, symptoms };
}
