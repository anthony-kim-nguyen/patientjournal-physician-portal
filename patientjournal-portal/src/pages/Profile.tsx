import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid,
} from '@mui/material';
import { fetchPractitionerProfile } from '../api/practitionerApi'; // Assuming your shared axios file is here

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch practitioner profile on component mount
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      console.log('🚫 No token found. Redirecting to login.');
      navigate('/');
      return;
    }

    fetchPractitionerProfile()
      .then((data) => {
        console.log('📦 Fetched practitioner profile:', data);
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch profile:', err);
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('access_token');
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%', p: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 4, bgcolor: '#f9f9f9' }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <Typography>
                    <strong>First Name:</strong> {profile.name?.[0]?.given?.[0] || 'N/A'}
                </Typography>
                <Typography>
                    <strong>Last Name:</strong> {profile.name?.[0]?.family || 'N/A'}
                </Typography>
                <Typography>
                    <strong>FHIR ID:</strong> {profile.id}
                </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                <Typography>
                    <strong>Resource Type:</strong> {profile.resourceType}
                </Typography>
                <Typography>
                    <strong>Last Updated:</strong>{' '}
                    {profile.meta?.lastUpdated
                    ? new Date(profile.meta.lastUpdated).toLocaleString()
                    : 'N/A'}
                </Typography>
                </Grid>
            </Grid>
            </Paper>

      )}

      <Button
        onClick={handleLogout}
        variant="outlined"
        color="error"
        sx={{ mt: 4 }}
      >
        Logout
      </Button>
    </Box>
  );
}
