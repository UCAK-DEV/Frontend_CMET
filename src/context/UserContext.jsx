import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

// Configuration de l'instance Axios
// On pointe vers la racine car vos contrôleurs ont des préfixes différents
// AuthController => /api/v1/auth
// UsersController => /users
const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Initialisation : Vérifier si un utilisateur est déjà connecté (Token en cache)
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('club_met_user');

      if (token && savedUser) {
        // On remet le token dans les headers par défaut pour toutes les futures requêtes
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // 2. Inscription (Register)
  const register = async (registerData) => {
    try {
      // Appel vers POST http://localhost:3000/api/v1/auth/register
      // registerData contient : { matricule, email, password, full_name, filiere, promo }
      await api.post('/api/v1/auth/register', registerData);
      return { success: true };
    } catch (error) {
      console.error("Erreur Inscription:", error);
      // Récupération du message d'erreur (parfois un tableau si class-validator renvoie plusieurs erreurs)
      const message = error.response?.data?.message || "Échec de l'inscription.";
      return { 
        success: false, 
        message: Array.isArray(message) ? message[0] : message 
      };
    }
  };

  // 3. Connexion (Login)
  const login = async (email, password) => {
    try {
      // Appel vers POST http://localhost:3000/api/v1/auth/login
      const response = await api.post('/api/v1/auth/login', { email, password });
      
      // Le backend renvoie : { access_token: "...", user: { ... } }
      const { access_token, user: userData } = response.data;

      // Sauvegarde dans le LocalStorage (persistance)
      localStorage.setItem('token', access_token);
      localStorage.setItem('club_met_user', JSON.stringify(userData));

      // Configuration immédiate d'Axios pour les prochaines requêtes authentifiées
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Mise à jour de l'état React
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Erreur Connexion:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Email ou mot de passe incorrect." 
      };
    }
  };

  // 4. Déconnexion (Logout)
  const logout = () => {
    setUser(null);
    // Nettoyage complet
    localStorage.removeItem('club_met_user');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  // 5. Mise à jour du profil (Update)
  const updateUser = async (newInfo) => {
    try {
      // Appel vers PATCH http://localhost:3000/users/profile
      // newInfo contient les champs modifiés (ex: { filiere: "Génie Logiciel" })
      const response = await api.patch('/users/profile', newInfo);
      
      const updatedUser = response.data; // Le backend renvoie l'objet User mis à jour

      // Mise à jour locale pour que l'interface change immédiatement
      setUser(updatedUser);
      localStorage.setItem('club_met_user', JSON.stringify(updatedUser));
      
      return { success: true };
    } catch (error) {
      console.error("Erreur Update:", error);
      return { 
        success: false, 
        message: "Impossible de mettre à jour le profil." 
      };
    }
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}