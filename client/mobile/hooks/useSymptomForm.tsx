import { useEffect, useState } from 'react';

export function useSymptomForm(carePlanData: any) {
  const [symptoms, setSymptoms] = useState<Record<string, number>>({});
  const activityList = carePlanData?.careplan?.activity ?? [];

  let questionnaireRef;
  for (const activity of activityList) {
    const canonicals = activity?.detail?.instantiatesCanonical;
    if (Array.isArray(canonicals)) {
      const match = canonicals.find((ref) => ref.startsWith('Questionnaire/'));
      if (match) {
        questionnaireRef = match;
        break;
      }
    }
  }

  const questionnaireId = questionnaireRef?.split('/')?.[1];
  const questionnaire = carePlanData?.questionnaires?.find(q => q?.id === questionnaireId);
  const questions = questionnaire?.item || [];

  useEffect(() => {
    if (!questionnaire) return;
    const initialState: Record<string, number> = {};
    for (const q of questions) {
      if (q?.linkId) initialState[q.linkId] = 5;
    }
    setSymptoms(initialState);
  }, [questionnaire]);

  const handleSliderChange = (key: string, value: number) => {
    setSymptoms(prev => ({ ...prev, [key]: value }));
  };

  return { questionnaire, questions, symptoms, handleSliderChange };
}
