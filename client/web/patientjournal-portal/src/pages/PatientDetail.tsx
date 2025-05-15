import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import {
  fetchJournalEntriesForPatient,
  fetchPatientById,
  fetchCarePlansForPatient,
} from '../api/dao';
import { type Router } from '@toolpad/core/AppProvider';
import VitalsGraph from '../components/VitalsGraph';
import { processObservations } from '../utils/processObservations';

interface Patient {
  id: string;
  name?: {
    given?: string[];
    family?: string;
  }[];
  gender?: string;
  birthDate?: string;
}

interface CarePlan {
  id: string;
  title?: string;
  status?: string;
  period?: {
    start?: string;
    end?: string;
  };
}

export default function PatientDetail({ patientId, router }: { patientId: string; router: Router }) {
  const [journal, setJournal] = useState<any[]>([]);
  const [careplans, setCarePlans] = useState<CarePlan[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [vitalData, setVitalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!patientId) return;

    Promise.all([
      fetchPatientById(patientId),
      fetchJournalEntriesForPatient(patientId),
      fetchCarePlansForPatient(patientId),
    ])
      .then(([patientData, journalData, carePlanData]) => {
        setPatient(patientData);
        //console.log("JDATA",journalData);
        const journalEntries = journalData ?? []; 
        setJournal(journalEntries);
        console.log("JOURNAL: ",journal);
        const { vitals } = processObservations(journalEntries);
        console.log("vitals",vitals);
        setVitalData(vitals);


        const plans = carePlanData?.entry?.map((e: any) => e.resource) ?? [];
        setCarePlans(plans);
      })
      .catch((err) => {
        console.error('❌ Failed to load patient details:', err);
      })
      .finally(() => setLoading(false));
  }, [patientId]);

  const getPatientName = () => {
    const given = patient?.name?.[0]?.given?.join(' ') ?? '';
    const family = patient?.name?.[0]?.family ?? '';
    return `${given} ${family}`.trim() || 'Unnamed Patient';
  };

  const handleCarePlanClick = (id: string) => {
    router.navigate(`/careplans/${id}`);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {getPatientName()}
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <VitalsGraph vitalData={vitalData} />
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            CarePlans
          </Typography>
          {careplans.length === 0 ? (
            <Typography variant="body2">No care plans available.</Typography>
          ) : (
            careplans.map((careplan) => (
              <Paper
                key={careplan.id}
                onClick={() => handleCarePlanClick(careplan.id)}
                sx={{
                  p: 2,
                  mb: 2,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <Typography variant="h6">{careplan.title ?? 'Untitled CarePlan'}</Typography>
                <Typography variant="body2">
                  Status: {careplan.status ?? 'Unknown'}
                </Typography>
                <Typography variant="body2">
                  Period: {careplan.period?.start ?? 'N/A'} → {careplan.period?.end ?? 'N/A'}
                </Typography>
              </Paper>
            ))
          )}
        </>
      )}
    </Box>
  );
}
