import * as React from 'react';
import { PageHeader, PageHeaderToolbar } from '@toolpad/core/PageContainer';
import { Button, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { type Router } from '@toolpad/core/AppProvider';
import CreateCarePlanForm from '../components/CreateCarePlanForm';
import { fetchAllPatients } from '../api/dao';

type Props = {
  router: Router;
};

function ProfileToolbar() {
  return (
    <PageHeaderToolbar>
      <Typography variant="body2">Practitioner Profile</Typography>
    </PageHeaderToolbar>
  );
}

function PatientsToolbar({ patientId, router }: { patientId?: string, router: Router }) {

  const [open, setOpen] = React.useState(false);
  const [patients, setPatients] = React.useState([]);

  React.useEffect(() => {
    const load = async () => {
      console.log('📥 Fetching patients in header...');
      try {
        const data = await fetchAllPatients();
        const entries = data?.entry ?? [];
        const mapped = entries.map((entry: any) => entry.resource);
  
        if (patientId) {
          const matched = mapped.find((p: any) => p.id === patientId);
          setPatients(matched ? [matched] : []);
        } else {
          setPatients(mapped);
        }
      } catch (err) {
        console.error('❌ Failed to load patients in header:', err);
      }
    };
  
    load();
  }, [patientId]);
  

  return (
    <>
      <PageHeaderToolbar>
        <Button
          startIcon={<CreateIcon />}
          color="primary"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          New CarePlan
        </Button>
      </PageHeaderToolbar>

      {open && patients.length > 0 && (
        <CreateCarePlanForm
          open={open}
          onClose={() => setOpen(false)}
          patients={patients}
          router={router}
        />
      )}

    </>
  );
}

export default function PageHeaderController({ router }: Props) {
  const { pathname } = router;

  const Toolbar = React.useCallback(() => {
    if (pathname === '/profile') return <ProfileToolbar />;

    if (pathname.startsWith('/patients')) {
      const match = pathname.match(/^\/patients\/([^/]+)$/);
      const patientId = match?.[1];
      return <PatientsToolbar patientId={patientId} />;
    }

    return null;
  }, [pathname]);

  return <PageHeader slots={{ toolbar: Toolbar }} />;
}

