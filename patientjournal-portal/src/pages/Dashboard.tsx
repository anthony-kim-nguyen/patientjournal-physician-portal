import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider, type Router, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';

import PageContentController from '../components/PageContentController';

const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Main items' },
  { segment: 'profile', title: 'Profile', icon: <PersonIcon /> },
  { segment: '', title: 'patient-journal', icon: <DashboardIcon /> },
  { segment: 'patients', title: 'Patients', icon: <GroupsIcon /> },
  { segment: 'careplans', title: 'CarePlans', icon: <EventIcon /> },
  { kind: 'divider' },
];

const theme = extendTheme({
  colorSchemes: { light: {}, dark: {} },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  return React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    }),
    [pathname]
  );
}

export default function DashboardLayoutBasic() {
  const router = useRouter('/');

  return (
    <AppProvider
      branding={{
        logo: <img src="/assets/PatientJournal_Logo.png" alt="PatientJournal logo" style={{ height: 40 }} />,
        title: 'MarcosMeet',
      }}
      navigation={NAVIGATION}
      router={router}
      theme={theme}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <PageContainer>
          <PageContentController router={router} />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
