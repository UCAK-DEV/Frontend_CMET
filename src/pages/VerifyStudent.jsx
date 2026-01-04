import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, XCircle, CheckCircle2, 
  AlertTriangle, User, Calendar, Award 
} from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png';

export default function VerifyStudent() {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // loading, valid, invalid
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulation d'un appel API sécurisé au backend pour vérifier le token
    const verifyToken = async () => {
      try {
        // Simulation de délai réseau
        await new Promise(r => setTimeout(r, 2000));
        
        // DÉCODAGE SIMULÉ (Dans un vrai projet, le backend ferait ça)
        // Ici on vérifie juste si le token contient le mot "SECURE" comme défini dans StudentCard
        if (token && token.includes('SECURE')) {
            // On extrait les infos (Simulation)
            setData({
                fullname: "Moussa Diop", // En vrai, viendrait de la BDD via le token
                matricule: "202300154",
                filiere: "Informatique & Télécoms",
                niveau: "Licence 2",
                status: "INSCRIT / EN RÈGLE",
                annee: "2025-2026"
            });
            setStatus('valid');
        } else {
            setStatus('invalid');
        }
      } catch (e) {
        setStatus('invalid');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] flex flex-col items-center justify-center p-6 font-sans">
      
      {/* En-tête Officiel */}
      <div className="mb-8 text-center">
         <img src={logoUcak} alt="UCAK" className="w-16 h-16 mx-auto mb-4 grayscale" />
         <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400">Système de Vérification Centralisé</p>
         <h1 className="text-xl font-black text-ucak-blue dark:text-white mt-1">Authentification Étudiant</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-[#151b2b] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-white/5 overflow-hidden"
      >
        
        {/* --- ÉTAT 1 : CHARGEMENT --- */}
        {status === 'loading' && (
          <div className="p-12 text-center">
             <div className="relative w-20 h-20 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-gray-100 dark:border-white/10 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-ucak-blue border-t-transparent rounded-full animate-spin"></div>
                <ShieldCheck className="absolute inset-0 m-auto text-ucak-blue animate-pulse" size={24} />
             </div>
             <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Analyse du Certificat...</h2>
             <p className="text-sm text-gray-400">Vérification de la signature cryptographique en cours.</p>
          </div>
        )}

        {/* --- ÉTAT 2 : VALIDE --- */}
        {status === 'valid' && data && (
          <div>
             <div className="bg-green-500 text-white p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 ucak-pattern opacity-10"></div>
                <CheckCircle2 size={48} className="mx-auto mb-2 relative z-10" />
                <h2 className="text-2xl font-black uppercase tracking-widest relative z-10">Carte Certifiée</h2>
                <p className="text-[10px] font-bold uppercase opacity-80 mt-1 relative z-10">Base de données UCAK • {new Date().toLocaleDateString()}</p>
             </div>

             <div className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-2xl flex items-center justify-center text-gray-400 font-black text-2xl">
                      {data.fullname.charAt(0)}
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Étudiant</p>
                      <h3 className="text-xl font-black text-ucak-blue dark:text-white">{data.fullname}</h3>
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
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> {data.status}
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
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Année {data.annee} • {data.niveau}</span>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* --- ÉTAT 3 : INVALIDE --- */}
        {status === 'invalid' && (
          <div>
             <div className="bg-red-500 text-white p-8 text-center">
                <XCircle size={48} className="mx-auto mb-4" />
                <h2 className="text-xl font-black uppercase tracking-widest">Document Non Reconnu</h2>
             </div>
             <div className="p-8 text-center">
                <AlertTriangle size={32} className="text-red-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium">
                   Le QR Code scanné ne correspond à aucun étudiant actif dans notre base de données ou a été révoqué.
                </p>
                <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30">
                   <p className="text-xs text-red-600 dark:text-red-400 font-bold">Code Erreur: INVALID_TOKEN_SIGNATURE</p>
                </div>
             </div>
          </div>
        )}
        
      </motion.div>

      <div className="mt-8 text-center">
         <Link to="/" className="text-xs font-bold text-ucak-blue dark:text-white hover:underline opacity-60 hover:opacity-100">
            Retour à l'accueil
         </Link>
      </div>
    </div>
  );
}