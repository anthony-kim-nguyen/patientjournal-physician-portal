// MedicationRequestInput.tsx
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FrequencySelector from './FrequencySelector';
import DeleteIcon from '@mui/icons-material/Close';
import { IconButton, ListItemSecondaryAction } from '@mui/material';


type Medication = {
  name: string;
  dosage: string;
  frequency: string;
};

type Props = {
  onAdd: (med: Medication) => void;
};

export default function MedicationRequestInput({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [medications, setMedications] = useState<Medication[]>([]);

  // Handle form submission
  const handleAdd = () => {
    if (!name || !dosage || !frequency) return;

    const newMed = { name, dosage, frequency };
    setMedications([...medications, newMed]);
    onAdd(newMed);

    // Clear inputs
    setName('');
    setDosage('');
    setFrequency('');
  };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Medication Request
            </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            {/* Show the list of added medications */}
        {medications.length > 0 && (
            <List dense>
                {medications.map((med, index) => (
                <ListItem key={index} divider>
                    <ListItemText
                    primary={`${med.name} — ${med.dosage}, ${med.frequency}`}
                    />
                    <ListItemSecondaryAction>
                    <IconButton
                        edge="end"
                        onClick={() => {
                        const updated = medications.filter((_, i) => i !== index);
                        setMedications(updated);
                        }}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                ))}
            </List>
        )}
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
            <TextField
                label="Medication Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ flex: 7 }}
            />
            <TextField
                label="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                fullWidth
                sx={{ flex: 3 }}
            />
        </Box>


        {/* FrequencySelector handles frequency input via dropdown and optional custom text */}
        <Box sx={{ flex: 1, minWidth: '300px', maxWidth: '50%' }}>
            <FrequencySelector onChange={(val) => setFrequency(val)} />
        </Box>


        <Button
            onClick={handleAdd}
            color="primary"
            variant="text"
            startIcon={<AddIcon />}
            sx={{ alignSelf: 'center' }}
        >
            <Typography variant="button">Add Medication</Typography>
        </Button>
        </Box>

        

         </Box>
    );
}
