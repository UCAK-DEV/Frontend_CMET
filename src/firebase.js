import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Ta configuration officielle Club MET
const firebaseConfig = {
  apiKey: "AIzaSyD-vbtp9xF7_3MV2wSpdnsohaAe5T5njWs",
  authDomain: "club-met.firebaseapp.com",
  projectId: "club-met",
  storageBucket: "club-met.firebasestorage.app",
  messagingSenderId: "14164083792",
  appId: "1:14164083792:web:6ab02f19132fb7d8123d55",
  measurementId: "G-7P8FSCEV78"
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);

/**
 * EXPORTS POUR LE HUB MET
 */

// 1. La Base de données (Utilisée pour les fonctionnalités temps réel)
export const db = getFirestore(app);

// 2. Le module d'Authentification
export const auth = getAuth(app);

// 3. Le fournisseur Google (Pour le bouton "Continuer avec Google")
export const googleProvider = new GoogleAuthProvider();

// Configuration optionnelle pour forcer la sélection du compte Google
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;