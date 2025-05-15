export function processObservations(entries: any[]) {
  const vitals = {
    labels: [] as string[],
    systolic: [] as number[],
    diastolic: [] as number[],
    heartRate: [] as number[],
    temperature: [] as number[],
  };

  const symptoms: Record<string, Record<string, number>> = {};
  const labelIndex: Record<string, number> = {};

  for (const { resource: obs } of entries) {
    const datetime = new Date(obs.effectiveDateTime);
    const date = datetime.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const time = datetime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const label = `${date} | ${time}`;

    const code = obs.code?.coding?.[0]?.code;
    const value = obs.valueQuantity?.value ?? obs.valueInteger;
    const text = obs.code?.text;

    if (typeof value !== 'number' || value === null || value === undefined) continue;

    if (!(label in labelIndex)) {
      labelIndex[label] = vitals.labels.length;
      vitals.labels.push(label);
      vitals.systolic.push(NaN);
      vitals.diastolic.push(NaN);
      vitals.heartRate.push(NaN);
      vitals.temperature.push(NaN);
    }

    const idx = labelIndex[label];

    if (code === '8480-6') vitals.systolic[idx] = value;
    else if (code === '8462-4') vitals.diastolic[idx] = value;
    else if (code === '8867-4') vitals.heartRate[idx] = value;
    else if (code === '8310-5') vitals.temperature[idx] = value;

    // Handle symptoms via text label
    if (text && !['8480-6', '8462-4', '8867-4', '8310-5'].includes(code)) {
      symptoms[text] ||= {};
      symptoms[text][label] = value;
    }
  }

  // Extract unique labels in datetime order
const uniqueLabelsWithIndex = vitals.labels.map((label, i) => ({
  label,
  index: i,
  time: new Date(label.split('|')[0].trim()) // crude but works if label format is consistent
}));

const last7 = uniqueLabelsWithIndex
  .sort((a, b) => a.time.getTime() - b.time.getTime())
  .slice(-7)
  .map(item => item.index);

// Rebuild vitals with only the last 7
vitals.labels = last7.map(i => vitals.labels[i]);
vitals.systolic = last7.map(i => vitals.systolic[i]);
vitals.diastolic = last7.map(i => vitals.diastolic[i]);
vitals.heartRate = last7.map(i => vitals.heartRate[i]);
vitals.temperature = last7.map(i => vitals.temperature[i]);

  return { vitals, symptoms };
}
