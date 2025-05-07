import { Box, Button, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const API_BASE_URL = 'https://eh7tt3obg4.execute-api.us-west-1.amazonaws.com';
//const API_BASE_URL = 'http://192.168.4.29:8000';

export default function Login() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      console.log('Token exists, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, []);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Submitting form:', form);

      if (isRegistering) {
        console.log('Registering user...');
        console.log(`${API_BASE_URL}/register`);
        const regRes = await axios.post(`${API_BASE_URL}/register`, {
          username: form.username,
          password: form.password,
          email: form.email,
          role: 'practitioner',
          first_name: form.firstName,
          last_name: form.lastName,
          
        },{withCredentials: true,});
        console.log('Registration successful:', regRes.data);
      }

      console.log('Logging in...');
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', form.username);
      params.append('password', form.password);

      const loginRes = await axios.post(`${API_BASE_URL}/token`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true,
      });

      console.log('Login successful:', loginRes.data);

      Cookies.set('access_token', loginRes.data.access_token, {
        secure: true,
        sameSite: 'Strict',
        expires: 1,
      });

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Auth failed:', err);
      if (err.response) {
        console.error('Error response:', err.response.data);
        setError(err.response.data?.detail || 'Authentication failed');
      } else {
        setError('Unexpected error occurred');
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', width: 300, margin: 'auto', mt: 10 }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        {isRegistering ? 'Register' : 'Login'}
      </Typography>

      <TextField label="Username" value={form.username} onChange={handleChange('username')} required />
      <TextField
        label="Password"
        type="password"
        value={form.password}
        onChange={handleChange('password')}
        required
        sx={{ mt: 2 }}
      />
      {isRegistering && (
        <>
          <TextField label="Email" value={form.email} onChange={handleChange('email')} sx={{ mt: 2 }} required />
          <TextField label="First Name" value={form.firstName} onChange={handleChange('firstName')} sx={{ mt: 2 }} required />
          <TextField label="Last Name" value={form.lastName} onChange={handleChange('lastName')} sx={{ mt: 2 }} required />
        </>
      )}

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        {isRegistering ? 'Register & Login' : 'Login'}
      </Button>
      <Button onClick={() => setIsRegistering(!isRegistering)} sx={{ mt: 1 }}>
        {isRegistering ? 'Already have an account? Login' : 'New user? Register'}
      </Button>

      {error && (
        <Typography color="error" textAlign="center" mt={2}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
