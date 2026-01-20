// src/context/UserContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

// Instance API connectée à votre Backend local
export const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification Admin via le rôle renvoyé par le Backend
  const isAdmin = user?.role === 'ADMIN'; 

  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('club_met_user');
      if (token && savedUser) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/v1/auth/login', { email, password });
      const { access_token, user: userData } = response.data;

      localStorage.setItem('token', access_token);
      localStorage.setItem('club_met_user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Erreur de connexion" };
    }
  };

  const register = async (registerData) => {
    try {
      // On récupère la réponse qui contient le token et l'utilisateur
      const response = await api.post('/api/v1/auth/register', registerData);
      const { access_token, user: userData } = response.data;

      // Connexion automatique après inscription
      localStorage.setItem('token', access_token);
      localStorage.setItem('club_met_user', JSON.stringify(userData));
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      setUser(userData);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message;
      return { success: false, message: Array.isArray(message) ? message[0] : message };
    }
  };

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

export const useUser = () => useContext(UserContext);