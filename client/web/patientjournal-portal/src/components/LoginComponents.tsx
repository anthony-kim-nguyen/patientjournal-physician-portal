import { styled } from '@mui/material/styles';
import { Box, Button as MuiButton, TextField, Typography, Link } from '@mui/material';
import bgImageSignIn from '../assets/signin.jpg';
import bgImageSignUp from '../assets/signup.jpg';

// Props interface to toggle between Sign In and Sign Up states
interface ToggleProps {
  signinIn?: boolean;
}

// Outer container for the entire auth card
export const Container = styled(Box)({
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  position: 'relative',
  overflow: 'hidden',
  width: '1100px',
  maxWidth: '100%',
  minHeight: '700px',
  display: 'flex',                // Enables centering content
  alignItems: 'center',           // Vertically center
  justifyContent: 'center',       // Horizontally center
});

// Left container for the Sign Up form
export const SignUpContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'signinIn',
})<ToggleProps>(({ signinIn }) => ({
  position: 'absolute',
  top: 0,
  height: '100%',
  width: '50%',
  display: 'flex',                  // Center contents
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.6s ease-in-out',
  left: 0,
  opacity: signinIn ? 0 : 1,
  transform: signinIn ? 'none' : 'translateX(100%)',
  zIndex: signinIn ? 1 : 5,
}));

// Right container for the Sign In form
export const SignInContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'signinIn',
})<ToggleProps>(({ signinIn }) => ({
  position: 'absolute',
  top: 0,
  height: '100%',
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.6s ease-in-out',
  left: 0,
  zIndex: 2,
  transform: signinIn ? 'none' : 'translateX(100%)',
}));

// Shared Form styling used in both Sign In and Sign Up
export const Form = styled('form')({
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 50px',
  height: '100%',
  width: '100%',
  textAlign: 'center',
});

// Typography for the form's title
export const Title = styled(Typography)({
  fontWeight: 'bold',
  margin: 0,
});

// Styled MUI TextField for consistent input appearance
export const Input = styled(TextField)({
  backgroundColor: '#eee',
  margin: '8px 0',
  width: '100%',
});

// Primary CTA button (Login/Register)
export const Button = styled(MuiButton)({
  borderRadius: '20px',
  border: '1px solid #0033ee',
  backgroundColor: '#0033ee',
  color: '#fff',
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '12px 45px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  transition: 'transform 80ms ease-in',
  '&:active': {
    transform: 'scale(0.95)',
  },
});

// Outlined "ghost" button for secondary actions
export const GhostButton = styled(Button)({
  backgroundColor: 'transparent',
  borderColor: '#ffffff',
});

// Custom link styling
export const Anchor = styled(Link)({
  color: 'blue',
  fontSize: '14px',
  textDecoration: 'none',
  margin: '15px 0',
});

// Overlay wrapper that slides during toggle
export const OverlayContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'signinIn',
})<ToggleProps>(({ signinIn }) => ({
  position: 'absolute',
  top: 0,
  left: '50%',
  width: '50%',
  height: '100%',
  overflow: 'hidden',
  transition: 'transform 0.6s ease-in-out',
  zIndex: 100,
  transform: signinIn ? 'none' : 'translateX(-100%)',
}));

// Dual-panel overlay with background image and content
export const Overlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'signinIn',
})<ToggleProps>(({ signinIn }) => ({
  backgroundImage: signinIn
    ? `url(${bgImageSignIn})`
    : `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bgImageSignUp})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  position: 'relative',
  left: '-100%',
  height: '100%',
  width: '200%',
  transform: signinIn ? 'none' : 'translateX(50%)',
  transition: 'transform 0.6s ease-in-out',
}));

// Shared panel container for overlay content
export const OverlayPanel = styled(Box)({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0 40px',
  textAlign: 'center',
  top: 0,
  height: '100%',
  width: '50%',
  transition: 'transform 0.6s ease-in-out',
});

// Panel that slides in from the left
export const LeftOverlayPanel = styled(OverlayPanel, {
  shouldForwardProp: (prop) => prop !== 'signinIn',
})<ToggleProps>(({ signinIn }) => ({
  transform: signinIn ? 'translateX(-20%)' : 'translateX(0)',
}));

// Panel that slides in from the right
export const RightOverlayPanel = styled(OverlayPanel, {
  shouldForwardProp: (prop) => prop !== 'signinIn',
})<ToggleProps>(({ signinIn }) => ({
  right: 0,
  transform: signinIn ? 'translateX(0)' : 'translateX(20%)',
}));

// Styled paragraph component for descriptions
export const Paragraph = styled(Typography)({
  fontSize: '14px',
  fontWeight: 100,
  lineHeight: '20px',
  letterSpacing: '0.5px',
  margin: '20px 0 30px',
});
