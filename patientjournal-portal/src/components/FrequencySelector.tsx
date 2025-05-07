import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from '@mui/material';

const FREQUENCY_OPTIONS = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Every 4 hours',
  'Every 8 hours',
  'Before bedtime',
  'With meals',
  'As needed',
  'Custom',
];

export default function FrequencySelector({ onChange }: { onChange: (value: string) => void }) {
  const [frequency, setFrequency] = useState('');
  const [customFrequency, setCustomFrequency] = useState('');

  const handleSelectChange = (event: any) => {
    const value = event.target.value;
    setFrequency(value);
    if (value !== 'Custom') {
      onChange(value);
    } else {
      onChange(customFrequency); // send current custom freq on switch
    }
  };

  const handleCustomChange = (event: any) => {
    setCustomFrequency(event.target.value);
    onChange(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Frequency</InputLabel>
        <Select value={frequency} label="Frequency" onChange={handleSelectChange}>
          {FREQUENCY_OPTIONS.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {frequency === 'Custom' && (
        <TextField
          label="Custom Frequency"
          fullWidth
          value={customFrequency}
          onChange={handleCustomChange}
        />
      )}
    </Box>
  );
}
