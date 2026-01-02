import { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  // On essaie de récupérer l'utilisateur dans le stockage local au démarrage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('club_met_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email) => {
    // SIMULATION BACKEND : On crée un faux utilisateur complet
    const fakeUser = {
      name: "Moussa Diop",
      email: email,
      role: "STUDENT",
      matricule: "MET-2025-045",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      filiere: "Génie Logiciel",
      promo: "Licence 3",
      xp: 1250,
      badges: ["Major", "Génie du Code"]
    };
    
    setUser(fakeUser);
    localStorage.setItem('club_met_user', JSON.stringify(fakeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('club_met_user');
  };

  const updateUser = (newInfo) => {
    const updatedUser = { ...user, ...newInfo };
    setUser(updatedUser);
    localStorage.setItem('club_met_user', JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}