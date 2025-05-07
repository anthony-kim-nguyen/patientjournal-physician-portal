import {
    Container,
    SignInContainer,
    SignUpContainer,
    Form,
    Title,
    Input,
    Button,
    GhostButton,
    OverlayContainer,
    Overlay,
    LeftOverlayPanel,
    RightOverlayPanel,
    Paragraph,
  } from '../components/LoginComponents';
  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import Cookies from 'js-cookie';
  import axios from 'axios';
  import { API_BASE_URL } from '../api/config';
  import { Box } from '@mui/material';
  
  export default function Login() {
    const navigate = useNavigate();
  
    // State to toggle between sign-in and sign-up views
    const [isRegistering, setIsRegistering] = useState(false);
  
    // Form field state
    const [form, setForm] = useState({
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    });
  
    // Error message
    const [error, setError] = useState('');
  
    // Check for existing token and redirect if logged in
    useEffect(() => {
      const token = Cookies.get('access_token');
      if (token) {
        console.log('Token exists, redirecting to dashboard');
        navigate('/dashboard');
      }
    }, []);
  
    // Update form field
    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };
  
    // Handle login or registration
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
  
      try {
        // Register new user if in registration mode
        if (isRegistering) {
          await axios.post(
            `${API_BASE_URL}/register`,
            {
              username: form.username,
              password: form.password,
              email: form.email,
              role: 'practitioner',
              first_name: form.firstName,
              last_name: form.lastName,
            },
            { withCredentials: true }
          );
        }
  
        // Login request
        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('username', form.username);
        params.append('password', form.password);
  
        const loginRes = await axios.post(`${API_BASE_URL}/token`, params, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        });
  
        // Store token in secure cookie
        Cookies.set('access_token', loginRes.data.access_token, {
          secure: window.location.protocol === 'https:',
          sameSite: 'Strict',
          expires: 1,
        });
  
        // Redirect after login
        navigate('/dashboard');
      } catch (err: any) {
        console.error('Auth failed:', err);
        setError(err.response?.data?.detail || 'Authentication failed');
      }
    };
  
    return (
        <Box
            sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to right, #ffffff, #acb6e5)', // optional
            }}
        >
      
            <Container>
                {/* Sign-Up Form */}
                <SignUpContainer signinIn={!isRegistering}>
                <Form onSubmit={handleSubmit}>
                    <Title>Create Account</Title>
                    <Input placeholder="Username" value={form.username} onChange={handleChange('username')} required />
                    <Input type="password" placeholder="Password" value={form.password} onChange={handleChange('password')} required />
                    <Input placeholder="Email" value={form.email} onChange={handleChange('email')} required />
                    <Input placeholder="First Name" value={form.firstName} onChange={handleChange('firstName')} required />
                    <Input placeholder="Last Name" value={form.lastName} onChange={handleChange('lastName')} required />
                    <Button type="submit">Register & Login</Button>
                    {error && <Paragraph style={{ color: 'red' }}>{error}</Paragraph>}
                </Form>
                </SignUpContainer>
        
                {/* Sign-In Form */}
                <SignInContainer signinIn={!isRegistering}>
                <Form onSubmit={handleSubmit}>
                    <Title>Welcome Back</Title>
                    <Input placeholder="Username" value={form.username} onChange={handleChange('username')} required />
                    <Input type="password" placeholder="Password" value={form.password} onChange={handleChange('password')} required />
                    <Button type="submit">Login</Button>
                    {error && <Paragraph style={{ color: 'red' }}>{error}</Paragraph>}
                </Form>
                </SignInContainer>
        
                {/* Overlay with branding / switching panel */}
                <OverlayContainer signinIn={!isRegistering}>
                <Overlay signinIn={!isRegistering}>
                    {/* Left overlay for switching to sign-in */}
                    <LeftOverlayPanel signinIn={!isRegistering}>
                    <Title>Already Registered?</Title>
                    <Paragraph>Sign in with your credentials</Paragraph>
                    <GhostButton onClick={() => setIsRegistering(false)}>Sign In</GhostButton>
                    </LeftOverlayPanel>
        
                    {/* Right overlay for switching to sign-up */}
                    <RightOverlayPanel signinIn={!isRegistering}>
                    <Title>New Here?</Title>
                    <Paragraph>Register with us to get started</Paragraph>
                    <GhostButton onClick={() => setIsRegistering(true)}>Register</GhostButton>
                    </RightOverlayPanel>
                </Overlay>
                </OverlayContainer>
            </Container>
        </Box>
    );
  }
  