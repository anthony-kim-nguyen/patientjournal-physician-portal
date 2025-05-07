import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function AuthRoute({ children }: { children: JSX.Element }) {
    const token = Cookies.get('access_token');
    if (!token) {
      console.log('🚫 No token found, redirecting to login');
      return <Navigate to="/" replace />;
    }
  
    console.log('✅ Token found, allowing access to dashboard');
    return children;
  }