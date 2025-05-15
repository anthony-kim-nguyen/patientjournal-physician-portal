import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

interface JwtPayload {
  exp: number;
}

export default function AuthRoute({ children }: { children: JSX.Element }) {
  const token = Cookies.get('access_token');

  if (!token) {
    console.log('🚫 No token found, redirecting to login');
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      console.log('⚠️ Token expired, clearing and redirecting');
      Cookies.remove('access_token');
      return <Navigate to="/" replace />;
    }

    console.log('✅ Token valid, allowing access');
    return children;
  } catch (err) {
    console.error('❌ Failed to decode token', err);
    Cookies.remove('access_token');
    return <Navigate to="/" replace />;
  }
}
