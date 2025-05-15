import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import SymptomsQuestionnaire from './SymptomsQuestionnaire';
import MedicationRequestInput from './MedicationRequestInput';
import {
  createQuestionnaire,
  createMedicationRequest,
  createCarePlan,
  fetchPractitionerProfile,
  fetchPatientById,
} from '../api/dao';
import { type Router } from '@toolpad/core/AppProvider';

interface Patient {
  id: string;
  name?: { given?: string[]; family?: string }[];
}

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  patients: Patient[];
  router?: Router; // Router is passed from Toolpad layout
}

export default function CreateCarePlanForm({ open, onClose, patients, router }: Props) {
  useEffect(() => {
    console.log('🧾 Patients passed into form:', patients);
  }, [patients]);
  
  console.log(JSON.stringify(patients));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [symptomQuestions, setSymptomQuestions] = useState<string[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [authorRef, setAuthorRef] = useState<string>('');

  // Automatically select patient ID from router path if on /patients/:id
  useEffect(() => {
    const segments = router?.pathname?.split('/') || [];

    const lastSegment = segments[segments.length - 1];
    const isPatientId = lastSegment?.length > 0;
    if (isPatientId) {
      setSelectedPatientId(lastSegment);
      fetchPatientById(lastSegment)
        .then((res) => {
          console.log('📥 Auto-selected patient from route:', res.data);
        })
        .catch((err) => {
          console.error('❌ Failed to auto-fetch patient info:', err);
        });
    }
  }, [router?.pathname]);

  // Get practitioner profile for authoring CarePlan
  useEffect(() => {
    console.log('📡 Fetching practitioner profile...');
    fetchPractitionerProfile()
      .then((res) => {
        const practitionerRef = `Practitioner/${res.data.id}`;
        setAuthorRef(practitionerRef);
        console.log('👤 Author (Practitioner) ref set:', practitionerRef);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch practitioner profile:', err);
      });
  }, []);

  const handleAddMedication = (med: Medication) => {
    console.log('➕ Adding medication:', med);
    setMedications((prev) => [...prev, med]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Submitting care plan creation form');

    if (!selectedPatientId || !authorRef) {
      console.error('❌ Missing required patient or author info.');
      return;
    }

    try {
      // Step 1: Build and send Questionnaire
      const questionnairePayload = {
        resourceType: 'Questionnaire',
        status: 'active',
        title,
        description,
        subjectType: ['Patient'],
        item: symptomQuestions.map((q) => ({
          linkId: Math.random().toString(36).substring(2, 8),
          text: q,
          type: 'string',
        })),
        meta: { tag: [{ code: 'symptoms' }] },
        author: { reference: authorRef },
        subject: { reference: `Patient/${selectedPatientId}` },
      };
      console.log('📦 Questionnaire payload:', questionnairePayload);
      const questionnaire = await createQuestionnaire(questionnairePayload);
      console.log('✅ Created Questionnaire:', questionnaire.data);

      // Step 2: Send MedicationRequest for each med
      const medRequests = await Promise.all(
        medications.map(async (med) => {
          const medPayload = {
            resourceType: 'MedicationRequest',
            status: 'active',
            intent: 'order',
            subject: { reference: `Patient/${selectedPatientId}` },
            authoredOn: new Date().toISOString(),
            requester: { reference: authorRef },
            medicationCodeableConcept: { text: med.name },
            dosageInstruction: [{ text: `${med.dosage}, ${med.frequency}` }],
          };
          console.log('📮 MedicationRequest payload:', medPayload);
          const res = await createMedicationRequest(medPayload);
          console.log('✅ Created MedicationRequest:', res.data);
          return res.data;
        })
      );

      // Step 3: Create CarePlan linking to questionnaire + meds
      const carePlanPayload = {
        resourceType: 'CarePlan',
        status: 'active',
        intent: 'plan',
        title,
        description,
        subject: { reference: `Patient/${selectedPatientId}` },
        author: { reference: authorRef },
        created: new Date().toISOString(),
        activity: [
          {
            detail: {
              kind: 'ServiceRequest',
              instantiatesCanonical: [`Questionnaire/${questionnaire.data.id}`],
              code: { text: 'Complete symptom questionnaire' },
              scheduledString: 'Daily',
            },
          },
          ...medRequests.map((req) => ({ reference: { reference: `MedicationRequest/${req.id}` } })),
        ],
      };

      console.log('📦 CarePlan payload:', carePlanPayload);
      const carePlan = await createCarePlan(carePlanPayload);
      console.log('✅ Created CarePlan:', carePlan.data);

      onClose();
    } catch (err: any) {
      console.error('❌ Failed to create care plan:', err);
      if (err.response?.data) {
        console.error('🔍 Error details:', err.response.data);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Care Plan</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Patient selector dropdown */}
          <FormControl fullWidth required>
            <InputLabel>Patient</InputLabel>
            <Select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              label="Patient"
            >
              {patients.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name?.[0]?.given?.join(' ') || 'Unnamed'} {p.name?.[0]?.family || ''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            required
          />

          <SymptomsQuestionnaire onUpdate={setSymptomQuestions} />
          <MedicationRequestInput onAdd={handleAddMedication} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
