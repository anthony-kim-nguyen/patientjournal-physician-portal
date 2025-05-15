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
import { loginUser, registerUser } from '../api/authDao';
import { Box } from '@mui/material';

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
      if (isRegistering) {
        await registerUser({
          username: form.username,
          password: form.password,
          email: form.email,
          role: 'practitioner',
          first_name: form.firstName,
          last_name: form.lastName,
        });
      }

      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', form.username);
      params.append('password', form.password);

      const loginRes = await loginUser(params);
      if (!loginRes || !loginRes.data?.access_token) throw new Error('No access token returned');

      Cookies.set('access_token', loginRes.data.access_token, {
        secure: window.location.protocol === 'https:',
        sameSite: 'Strict',
        expires: 1,
      });

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
        background: 'linear-gradient(to right, #ffffff, #acb6e5)',
      }}
    >
      <Container>
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

        <SignInContainer signinIn={!isRegistering}>
          <Form onSubmit={handleSubmit}>
            <Title>Welcome Back</Title>
            <Input placeholder="Username" value={form.username} onChange={handleChange('username')} required />
            <Input type="password" placeholder="Password" value={form.password} onChange={handleChange('password')} required />
            <Button type="submit">Login</Button>
            {error && <Paragraph style={{ color: 'red' }}>{error}</Paragraph>}
          </Form>
        </SignInContainer>

        <OverlayContainer signinIn={!isRegistering}>
          <Overlay signinIn={!isRegistering}>
            <LeftOverlayPanel signinIn={!isRegistering}>
              <Title>Already Registered?</Title>
              <Paragraph>Sign in with your credentials</Paragraph>
              <GhostButton onClick={() => setIsRegistering(false)}>Sign In</GhostButton>
            </LeftOverlayPanel>

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
