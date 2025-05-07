import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Grid,
} from '@mui/material';
import { API_BASE_URL } from '../api/config';

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch practitioner profile on mount
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      console.log('🚫 No token found. Redirecting to login.');
      navigate('/');
      return;
    }

    axios
      .get(`${API_BASE_URL}/practitioner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        navigate('/');
      });
  }, []);

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
                <strong>First Name:</strong> {profile.first_name}
              </Typography>
              <Typography>
                <strong>Last Name:</strong> {profile.last_name}
              </Typography>
              <Typography>
                <strong>Email:</strong> {profile.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <strong>Username:</strong> {profile.username}
              </Typography>
              <Typography>
                <strong>FHIR ID:</strong> {profile.fhir_id}
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
