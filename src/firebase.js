// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-vbtp9xF7_3MV2wSpdnsohaAe5T5njWs",
  authDomain: "club-met.firebaseapp.com",
  projectId: "club-met",
  storageBucket: "club-met.firebasestorage.app",
  messagingSenderId: "14164083792",
  appId: "1:14164083792:web:6ab02f19132fb7d8123d55",
  measurementId: "G-7P8FSCEV78"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // On exporte juste la DB