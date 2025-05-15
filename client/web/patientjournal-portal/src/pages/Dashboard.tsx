import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider, type Router, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';

import logoImg from '../assets/PatientJournal_Logo.png';
import PageContentController from '../page-controllers/PageContentController';
import PageHeaderController from '../page-controllers/PageHeaderController';



const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Main items' },
  { segment: 'profile', title: 'Profile', icon: <PersonIcon /> },
  //{ segment: '', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'patients', title: 'Patients', icon: <GroupsIcon /> },
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
  const router = useRouter('/patients');

  return (
    <AppProvider
      branding={{
        logo: <img src={logoImg} alt="PatientJournal logo" style={{ height: 100, width: 'auto' }}/>,
        title: 'PatientJournal',
      }}
      navigation={NAVIGATION}
      router={router}
      theme={theme}
    >
      <DashboardLayout defaultSidebarCollapsed>
        <PageContainer slots={{ header: () => <PageHeaderController router={router} /> }}>
            <PageContentController router={router} />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
