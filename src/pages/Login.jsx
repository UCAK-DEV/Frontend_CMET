import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Lock, ArrowRight, Loader2, Sparkles, CheckCircle2, 
  User, Hash, GraduationCap, Calendar, ArrowLeft 
} from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png';

export default function Login() {
  // État pour basculer entre Login et Register
  const [isRegister, setIsRegister] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    matricule: '',
    filiere: 'Informatique & Télécoms', // Valeur par défaut
    promo: 'Licence 1'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login, register } = useUser();
  const navigate = useNavigate();

  // Gestion des champs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); 
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (isRegister) {
        // --- MODE INSCRIPTION ---
        // Vérification basique
        if (!formData.full_name || !formData.matricule) {
          throw new Error("Veuillez remplir tous les champs obligatoires.");
        }

        const res = await register(formData);
        if (res.success) {
          setSuccessMsg("Compte créé avec succès ! Redirection...");
          // Petit délai pour lire le message avant de rediriger
          setTimeout(() => navigate('/dashboard'), 1500);
        } else {
          setError(res.message || "Erreur lors de l'inscription.");
        }

      } else {
        // --- MODE CONNEXION ---
        const res = await login(formData.email, formData.password);
        if (res.success) {
          navigate('/dashboard');
        } else {
          setError(res.message || "Identifiants incorrects.");
        }
      }
    } catch (err) {
      setError(err.message || "Une erreur technique est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: isRegister ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: isRegister ? -50 : 50 }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-ucak-dark overflow-hidden">
      
      {/* === COLONNE GAUCHE : VISUEL IMMERSIF === */}
      {/* On change légèrement le dégradé si on est en mode Register pour marquer la différence */}
      <div className={`hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center p-12 transition-colors duration-700 ${isRegister ? 'bg-ucak-dark' : 'bg-ucak-blue'}`}>
        <div className="absolute inset-0 ucak-pattern opacity-10"></div>
        <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br opacity-80 ${isRegister ? 'from-purple-900 to-black' : 'from-ucak-blue to-black'}`}></div>
        
        {/* Orbe Lumineux Animé */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className={`absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[150px] ${isRegister ? 'bg-purple-500' : 'bg-ucak-green'}`} 
        />
        
        <div className="relative z-10 text-white max-w-lg">
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
              <Sparkles className="text-ucak-gold" size={32} />
           </div>
           
           <AnimatePresence mode='wait'>
             <motion.div
               key={isRegister ? "reg-text" : "log-text"}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4 }}
             >
               <h1 className="text-5xl font-black mb-6 leading-tight">
                 {isRegister ? "Rejoignez l'Élite." : "L'Excellence Numérique."}
               </h1>
               <p className="text-lg text-blue-100 leading-relaxed mb-8">
                 {isRegister 
                   ? "Créez votre profil étudiant, accédez aux cours exclusifs et participez à la vie du campus numérique."
                   : "Accédez à votre Espace Numérique de Travail (ENT). Retrouvez vos cours, vos notes et gérez votre carrière académique."
                 }
               </p>
             </motion.div>
           </AnimatePresence>
           
           <div className="space-y-4">
              {["Bibliothèque Numérique 24/7", "Suivi de Carrière & Stages", "Réseau Alumni UCAK"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                   <CheckCircle2 size={18} className={isRegister ? "text-purple-400" : "text-ucak-green"} /> {item}
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* === COLONNE DROITE : FORMULAIRE DYNAMIQUE === */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto">
        <div className="w-full max-w-md">
           
           <div className="text-center mb-8">
              <img src={logoUcak} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                {isRegister ? "Créer un compte" : "Bon retour !"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isRegister ? "Remplissez le formulaire ci-dessous." : "Entrez vos identifiants pour accéder au Campus."}
              </p>
           </div>

           <AnimatePresence mode='wait'>
             <motion.form 
               key={isRegister ? "register" : "login"}
               variants={formVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
               onSubmit={handleSubmit} 
               className="space-y-5"
             >
                
                {/* CHAMPS SUPPLÉMENTAIRES POUR L'INSCRIPTION */}
                {isRegister && (
                  <>
                    <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nom Complet</label>
                       <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
                          <input 
                            name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Moussa Diop" required={isRegister}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-ucak-blue/20 focus:border-ucak-blue transition-all font-bold text-gray-700 dark:text-white text-sm"
                          />
                       </div>
                    </div>

                    <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Matricule</label>
                       <div className="relative group">
                          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
                          <input 
                            name="matricule" value={formData.matricule} onChange={handleChange} placeholder="202300XXX" required={isRegister}
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-ucak-blue/20 focus:border-ucak-blue transition-all font-bold text-gray-700 dark:text-white text-sm"
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Filière</label>
                         <div className="relative group">
                            <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue" size={16} />
                            <select 
                              name="filiere" value={formData.filiere} onChange={handleChange}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-10 pr-2 outline-none focus:ring-2 focus:ring-ucak-blue/20 focus:border-ucak-blue transition-all font-bold text-gray-700 dark:text-white text-xs appearance-none"
                            >
                              <option value="Informatique & Télécoms">Info & Télécoms</option>
                              <option value="HEC">HEC / Gestion</option>
                              <option value="Génie Civil">Génie Civil</option>
                            </select>
                         </div>
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Promo</label>
                         <div className="relative group">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue" size={16} />
                            <select 
                              name="promo" value={formData.promo} onChange={handleChange}
                              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-10 pr-2 outline-none focus:ring-2 focus:ring-ucak-blue/20 focus:border-ucak-blue transition-all font-bold text-gray-700 dark:text-white text-xs appearance-none"
                            >
                              <option value="Licence 1">Licence 1</option>
                              <option value="Licence 2">Licence 2</option>
                              <option value="Licence 3">Licence 3</option>
                              <option value="Master 1">Master 1</option>
                            </select>
                         </div>
                      </div>
                    </div>
                  </>
                )}

                {/* CHAMPS COMMUNS (Email & Password) */}
                <div className="space-y-1">
                   <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Universitaire</label>
                   <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleChange} placeholder="etudiant@ucak.edu.sn" required
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-ucak-blue/20 focus:border-ucak-blue transition-all font-bold text-gray-700 dark:text-white text-sm"
                      />
                   </div>
                </div>

                <div className="space-y-1">
                   <div className="flex justify-between ml-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mot de passe</label>
                      {!isRegister && <a href="#" className="text-[10px] font-bold text-ucak-blue hover:underline">Oublié ?</a>}
                   </div>
                   <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={18} />
                      <input 
                        type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required
                        className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-ucak-blue/20 focus:border-ucak-blue transition-all font-bold text-gray-700 dark:text-white text-sm"
                      />
                   </div>
                </div>

                {/* MESSAGES D'ERREUR OU SUCCÈS */}
                <AnimatePresence>
                  {error && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg flex items-center gap-2 border border-red-100 dark:border-red-900/20">
                       <AlertTriangle size={14} /> {error}
                    </motion.div>
                  )}
                  {successMsg && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-3 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 text-xs font-bold rounded-lg flex items-center gap-2 border border-green-100 dark:border-green-900/20">
                       <CheckCircle2 size={14} /> {successMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* BOUTON D'ACTION */}
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`w-full text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-xs
                    ${isRegister 
                      ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20' 
                      : 'bg-ucak-blue hover:bg-ucak-green shadow-ucak-blue/20 hover:shadow-ucak-green/30'
                    }`}
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <>{isRegister ? "S'inscrire" : "Connexion"} <ArrowRight size={16} /></>}
                </button>

             </motion.form>
           </AnimatePresence>

           {/* TOGGLE LOGIN / REGISTER */}
           <div className="mt-8 text-center pt-6 border-t border-gray-100 dark:border-white/5">
              <p className="text-xs text-gray-400 font-medium mb-3">
                 {isRegister ? "Vous avez déjà un compte ?" : "Pas encore de compte ?"}
              </p>
              <button 
                onClick={() => setIsRegister(!isRegister)}
                className="text-sm font-black text-gray-800 dark:text-white hover:text-ucak-blue dark:hover:text-ucak-gold transition-colors underline decoration-2 underline-offset-4"
              >
                {isRegister ? "Se connecter à l'ENT" : "Créer un compte étudiant"}
              </button>
           </div>

        </div>
      </div>
    </div>
  );
}

// Composant pour l'icône d'erreur (si non importé plus haut, ajoutez-le dans l'import lucide-react)
function AlertTriangle({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <path d="M12 9v4"></path>
      <path d="M12 17h.01"></path>
    </svg>
  );
}