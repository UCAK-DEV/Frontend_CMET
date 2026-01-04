import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, XCircle, CheckCircle2, AlertTriangle, Award, Calendar } from 'lucide-react';
import { api } from '../context/UserContext'; // Utilisation de l'instance API configurée
import logoUcak from '../assets/logo-ucak.png';

export default function VerifyStudent() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // loading, valid, invalid
  const [data, setData] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // APPEL API RÉEL VERS LE BACKEND
        const response = await api.get(`/api/v1/users/verify/${token}`);
        
        setData(response.data);
        setStatus('valid');
      } catch (e) {
        console.error("Erreur vérification:", e);
        setStatus('invalid');
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] flex flex-col items-center justify-center p-6 font-sans">
      <div className="mb-8 text-center">
         <img src={logoUcak} alt="UCAK" className="w-16 h-16 mx-auto mb-4 grayscale" />
         <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400">Système de Vérification Centralisé</p>
         <h1 className="text-xl font-black text-ucak-blue dark:text-white mt-1">Authentification Étudiant</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white dark:bg-[#151b2b] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden">
        
        {status === 'loading' && (
          <div className="p-12 text-center">
             <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-gray-100 dark:border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-ucak-blue border-t-transparent rounded-full animate-spin"></div>
                <ShieldCheck className="absolute inset-0 m-auto text-ucak-blue animate-pulse" size={24} />
             </div>
             <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Analyse en cours...</h2>
             <p className="text-sm text-gray-400">Interrogation de la base de données sécurisée UCAK.</p>
          </div>
        )}

        {status === 'valid' && data && (
          <div>
             <div className="bg-green-500 text-white p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <CheckCircle2 size={48} className="mx-auto mb-2 relative z-10" />
                <h2 className="text-2xl font-black uppercase tracking-widest relative z-10">Carte Certifiée</h2>
                <p className="text-[10px] font-bold uppercase opacity-80 mt-1 relative z-10">Vérifié le {new Date().toLocaleDateString()}</p>
             </div>

             <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 font-black text-2xl">
                      {data.full_name?.charAt(0)}
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Étudiant</p>
                      <h3 className="text-xl font-black text-ucak-blue dark:text-white">{data.full_name}</h3>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                      <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Matricule</p>
                      <p className="text-sm font-mono font-bold dark:text-gray-200">{data.matricule}</p>
                   </div>
                   <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                      <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Statut</p>
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-black uppercase">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> INSCRIT
                      </span>
                   </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-white/5">
                   <div className="flex items-center gap-3">
                      <Award size={16} className="text-ucak-gold" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{data.filiere}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-ucak-blue" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Promo {data.promo}</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {status === 'invalid' && (
          <div>
             <div className="bg-red-500 text-white p-8 text-center">
                <XCircle size={48} className="mx-auto mb-4" />
                <h2 className="text-xl font-black uppercase tracking-widest">Non Reconnu</h2>
             </div>
             <div className="p-8 text-center">
                <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium">
                   Ce QR Code est invalide ou ne provient pas de l'administration UCAK.
                </p>
                <Link to="/" className="text-xs font-bold text-ucak-blue dark:text-white hover:underline">Retour à l'accueil</Link>
             </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}