import { useEffect, useState } from 'react';
import { fetchAllPatients } from '../api/dao';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';
import { type Router } from '@toolpad/core/AppProvider';

interface PatientsProps {
  router: Router;
}

export default function Patients({ router }: PatientsProps) {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllPatients()
      .then((data) => {
        console.log('👥 Raw patients data:', data);
        const entries = data?.entry?.map((e: any) => e.resource) ?? [];
        setPatients(entries);
      })
      .catch((err) => {
        console.error('❌ Failed to load patients:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (id: string) => {
    router.navigate(`/patients/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 4 }}>
      <Divider sx={{ mb: 2 }} />
      <Box>
        {patients.map((patient) => (
          <Paper
            key={patient.id}
            onClick={() => handleClick(patient.id)}
            sx={{
              p: 2,
              mb: 2,
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#f5f5f5' },
            }}
          >
            <Typography variant="h6">
              {patient.name?.[0]?.given?.join(' ') ?? 'Unnamed'} {patient.name?.[0]?.family ?? ''}
            </Typography>
            <Typography variant="body2">FHIR ID: {patient.id}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
