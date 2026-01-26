// src/context/UserContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Création du contexte
const UserContext = createContext();

// Instance API connectée au Backend (Local ou Production via variable d'environnement)
const api = axios.create({
  // Utilise l'URL de votre backend Render en production, sinon localhost par défaut
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fournisseur de contexte utilisateur
 */
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification du rôle Administrateur
  const isAdmin = user?.role === 'ADMIN'; 

  // Initialisation de l'authentification au chargement de l'application
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('club_met_user');
      
      if (token && savedUser) {
        // Injection du token dans les headers de l'instance axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  /**
   * Fonction de connexion
   */
  const login = async (email, password) => {
    try {
      const response = await api.post('/api/v1/auth/login', { email, password });
      const { access_token, user: userData } = response.data;

      // Stockage local pour la persistance
      localStorage.setItem('token', access_token);
      localStorage.setItem('club_met_user', JSON.stringify(userData));
      
      // Configuration de l'instance API pour les futures requêtes
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Erreur de connexion" 
      };
    }
  };

  /**
   * Fonction d'inscription avec connexion automatique
   */
  const register = async (registerData) => {
    try {
      const response = await api.post('/api/v1/auth/register', registerData);
      const { access_token, user: userData } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('club_met_user', JSON.stringify(userData));
      
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(userData);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message;
      return { 
        success: false, 
        message: Array.isArray(message) ? message[0] : message 
      };
    }
  };

  /**
   * Fonction de déconnexion
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('club_met_user');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, loading, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * Hook personnalisé pour accéder facilement aux données utilisateur
 */
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
  }
  return context;
};

// Exportations nommées explicites pour garantir la compatibilité avec Vite/Rollup lors du build
export { UserProvider, useUser, api };