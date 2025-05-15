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
import { fetchPractitionerProfile } from '../api/dao';
import type { Practitioner } from '../models/Practitioner';

// Main profile page component for displaying FHIR Practitioner info
export default function Profile() {
  const navigate = useNavigate();

  // Holds the fetched practitioner profile data
  const [profile, setProfile] = useState<Practitioner | null>(null);

  // Tracks loading state while fetching profile data
  const [loading, setLoading] = useState(true);

  // Runs on component mount: checks for auth token and fetches profile
  useEffect(() => {
    const token = Cookies.get('access_token');

    // Redirect to login if token is missing
    if (!token) {
      console.warn('🚫 No token found. Redirecting to login.');
      navigate('/');
      return;
    }

    // Async function to fetch practitioner profile
    const loadProfile = async () => {
      try {
        const profile = await fetchPractitionerProfile();
        console.log('👤 Practitioner profile (data):', profile);
        setProfile(profile);
      } catch (err) {
        // Handle fetch failure and redirect
        console.error('❌ Failed to fetch profile:', err);
        navigate('/');
      } finally {
        // Stop loading spinner regardless of success/failure
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  // Clears auth token and redirects to login page
  const handleLogout = () => {
    Cookies.remove('access_token');
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%', p: 4 }}>
      {loading ? (
        // Show spinner while loading profile
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        // Render profile details once loaded
        <Paper elevation={3} sx={{ p: 4, bgcolor: '#f9f9f9' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>First Name:</strong>{' '}
                {profile?.name?.[0]?.given?.[0] || 'N/A'}
              </Typography>
              <Typography>
                <strong>Last Name:</strong>{' '}
                {profile?.name?.[0]?.family || 'N/A'}
              </Typography>
              <Typography>
                <strong>FHIR ID:</strong> {profile?.id || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Resource Type:</strong> {profile?.resourceType || 'N/A'}
              </Typography>
              <Typography>
                <strong>Last Updated:</strong>{' '}
                {profile?.meta?.lastUpdated
                  ? new Date(profile.meta.lastUpdated).toLocaleString()
                  : 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Logout button */}
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
