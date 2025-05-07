import { Box } from '@mui/material';
import { type Router } from '@toolpad/core/AppProvider';
import Profile from '../pages/Profile';
import Patients from '../pages/Patients';
import PatientDetail from '../pages/PatientDetail.tsx';

type PageContentControllerProps = {
  router: Router;
};

export default function PageContentController({ router }: PageContentControllerProps) {
  const { pathname } = router;

  if (pathname === '/profile') {
    return (
      <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Profile />
      </Box>
    );
  }

  if (pathname === '/patients') {
    return <Patients router={router} />;
  }
  

  // Handle /patients/:id route
  if (pathname.startsWith('/patients/')) {
    const id = pathname.split('/')[2]; // Extract the patient ID
    return <PatientDetail patientId={id} />;
  }

  return <Box>404 Not Found</Box>;
}
