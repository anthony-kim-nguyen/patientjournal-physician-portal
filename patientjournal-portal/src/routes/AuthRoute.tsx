import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface AuthRouteProps {
  children: React.ReactNode;
}

export default function AuthRoute({ children }: AuthRouteProps) {
  const token = Cookies.get('access_token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
