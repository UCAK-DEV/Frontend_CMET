import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Loading from './Loading';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) return <Loading />;

  // 1. Non connecté -> Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Connecté mais NON VÉRIFIÉ -> Salle d'attente
  // On laisse passer les admins pour qu'ils ne se bloquent pas eux-mêmes
  if (!user.is_ufr_verified && user.role !== 'ADMIN') {
    return <Navigate to="/pending" replace />;
  }

  // 3. Connecté et Vérifié (ou Admin) -> Accès autorisé
  return children;
}