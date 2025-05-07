import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { fetchPatientJournal } from '../api/practitionerApi';

export default function PatientDetail({ patientId }: { patientId: string }) {
  const [journal, setJournal] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientJournal(patientId)
      .then((data) => {
        console.log('📘 Journal entries:', data);
        setJournal(data);
      })
      .catch((err) => {
        console.error('Failed to fetch journal:', err);
      })
      .finally(() => setLoading(false));
  }, [patientId]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Patient Journal: {patientId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        journal.map((entry, i) => (
          <Paper key={i} sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1">
              {entry.code?.text || 'Observation'} – {entry.valueQuantity?.value}
              {entry.valueQuantity?.unit && ` ${entry.valueQuantity.unit}`}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {entry.effectiveDateTime}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
}
