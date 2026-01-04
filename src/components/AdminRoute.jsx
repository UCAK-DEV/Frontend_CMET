import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Loading from './Loading';

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useUser();

  // On attend que l'utilisateur soit chargé
  if (loading) return <Loading />;

  // Si l'utilisateur n'est pas connecté OU n'est pas admin, on le renvoie au dashboard
  if (!user || !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Sinon, on affiche la page admin
  return children;
}