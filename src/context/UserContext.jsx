// src/context/UserContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

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
   * Fonction de connexion via Google
   */
  const loginWithGoogle = async () => {
    try {
      // 1. Authentification Firebase (Client)
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseToken = await result.user.getIdToken();
      
      // 2. Échange avec le Backend (Pour créer la session App)
      // On envoie le token + infos utiles pour pré-remplir le profil si nouveau
      const response = await api.post('/api/v1/auth/google', {
        token: firebaseToken,
        email: result.user.email,
        full_name: result.user.displayName,
        photo_url: result.user.photoURL
      });

      const { access_token, user: userData } = response.data;

      // 3. Stockage Session
      localStorage.setItem('token', access_token);
      localStorage.setItem('club_met_user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Erreur Google Auth:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Échec de l'authentification Google"
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
    <UserContext.Provider value={{ user, login, register, loginWithGoogle, logout, loading, isAdmin }}>
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