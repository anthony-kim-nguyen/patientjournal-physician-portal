import React, { useState } from 'react';
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

type Patient = {
  id: string;
  name?: { given?: string[]; family?: string }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  patients: Patient[];
};

export default function CreateCarePlanForm({ open, onClose, patients }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [symptomQuestions, setSymptomQuestions] = useState<string[]>([]);
    const [medications, setMedications] = useState<any[]>([]);


    const carePlanPayload = {
      patientId: selectedPatientId,
      title,
      description,
      questionnaire: symptomQuestions,
    };
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Submission logic here (e.g., call API with title, description, selectedPatientId)
      console.log({ title, description, selectedPatientId });
      onClose();
    };
    const handleAddMedication = (med: any) => {
      setMedications((prev) => [...prev, med]);
    };
    

    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create New Care Plan</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {/* Patient Dropdown */}
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
            <SymptomsQuestionnaire onUpdate={setSymptomQuestions}/>
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



