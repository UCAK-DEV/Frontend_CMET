import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Loading from './Loading';

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useUser();

  if (loading) return <Loading />;

  // Redirection si pas admin
  if (!user || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}