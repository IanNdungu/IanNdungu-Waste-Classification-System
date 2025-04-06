
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthLayout = () => {
  const { isAuthenticated, userRole } = useAuth();
  
  // If user is already logged in, redirect to the appropriate dashboard
  if (isAuthenticated) {
    if (userRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (userRole === 'operator') {
      return <Navigate to="/operator" replace />;
    }
  }
  
  return <Outlet />;
};

export default AuthLayout;
