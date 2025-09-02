import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'employee' | 'employer';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Role mismatch
  if (requiredRole && user.role !== requiredRole) {
    // Optionally, you could navigate to a 403 page. For now, send to home.
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
