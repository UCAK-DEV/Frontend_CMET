import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // SIMULATION : On considère que l'utilisateur est connecté.
  // Plus tard, vous remplacerez 'true' par votre logique d'auth réelle (ex: localStorage.getItem('token'))
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    // Si pas connecté, redirection immédiate vers le Login
    return <Navigate to="/login" replace />;
  }

  // Si connecté, on laisse passer
  return children;
}