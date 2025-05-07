import * as React from 'react';
import { PageHeader, PageHeaderToolbar } from '@toolpad/core/PageContainer';
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { type Router } from '@toolpad/core/AppProvider';
import CreateCarePlanForm from '../components/CreateCarePlanForm';
import { fetchAllPatients } from '../api/practitionerApi';

type Props = {
  router: Router;
};

function PatientsToolbar() {
  return (
    <PageHeaderToolbar>
      <Typography variant="body2">Viewing all patients</Typography>
    </PageHeaderToolbar>
  );
}

function ProfileToolbar() {
  return (
    <PageHeaderToolbar>
      <Typography variant="body2">Practitioner Profile</Typography>
    </PageHeaderToolbar>
  );
}

function CarePlansToolbar() {
  const [open, setOpen] = React.useState(false);
  const [patients, setPatients] = React.useState([]);
  
  React.useEffect(() => {
    // Fetch patients from API
    fetchAllPatients().then((data) => {
      const rawEntries = data.entry ?? [];
      const mapped = rawEntries.map((entry: any) => entry.resource);
      setPatients(mapped);
    });
  }, []);

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

      <CreateCarePlanForm
        open={open}
        onClose={() => setOpen(false)}
        patients={patients}
      />
    </>
  );
}



export default function PageHeaderController({ router }: Props) {
  const { pathname } = router;

  const Toolbar = React.useCallback(() => {
    if (pathname.startsWith('/patients/')) return null;
    if (pathname === '/patients') return <PatientsToolbar />;
    if (pathname === '/profile') return <ProfileToolbar />;
    if (pathname === '/careplans') return <CarePlansToolbar />;
    return null;
  }, [pathname]);

  return <PageHeader slots={{ toolbar: Toolbar }} />;
}
