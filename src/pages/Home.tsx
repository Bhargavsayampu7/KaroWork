import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Index from './Index';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'employer') {
      navigate('/employers', { replace: true });
    }
  }, [user, navigate]);

  // For employees or logged out users, show public home
  return <Index />;
}
