import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Sparkles, User, Hash, GraduationCap, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ 
    email: '', password: '', full_name: '', matricule: '', 
    filiere: 'Informatique & Télécoms', promo: 'Licence 1' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login, register } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (isRegister) {
        const res = await register(formData);
        if (res.success) {
           setSuccessMsg("Compte créé ! Redirection...");
           setTimeout(() => navigate('/dashboard'), 1500);
        } else setError(res.message || "Erreur inscription");
      } else {
        const res = await login(formData.email, formData.password);
        if (res.success) navigate('/dashboard');
        else setError("Identifiants incorrects");
      }
    } catch (err) { setError("Erreur technique"); } 
    finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-ucak-dark overflow-hidden">
      <div className={`hidden lg:flex w-1/2 relative items-center justify-center p-12 transition-colors duration-700 ${isRegister ? 'bg-purple-900' : 'bg-ucak-blue'}`}>
        <div className="absolute inset-0 ucak-pattern opacity-10"></div>
        <div className="relative z-10 text-white max-w-lg">
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8"><Sparkles className="text-ucak-gold" size={32} /></div>
           <h1 className="text-5xl font-black mb-6">{isRegister ? "Rejoignez l'Élite." : "L'Excellence Numérique."}</h1>
           <p className="text-lg text-white/80">Plateforme officielle du Club MET - UCAK.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
           <div className="text-center mb-8">
              <img src={logoUcak} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-ucak-blue dark:text-white">{isRegister ? "Créer un compte" : "Connexion"}</h2>
           </div>

           <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <>
                  <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-400">Nom Complet</label><div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={18} /><input name="full_name" onChange={handleChange} className="w-full pl-10 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-bold" placeholder="Moussa Diop" required /></div></div>
                  <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-400">Matricule</label><div className="relative"><Hash className="absolute left-3 top-3 text-gray-400" size={18} /><input name="matricule" onChange={handleChange} className="w-full pl-10 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-bold" placeholder="2023..." required /></div></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-400">Filière</label><select name="filiere" onChange={handleChange} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-bold text-xs"><option>Informatique & Télécoms</option><option>HEC</option><option>Génie Civil</option></select></div>
                    <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-400">Promo</label><select name="promo" onChange={handleChange} className="w-full p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-bold text-xs"><option>Licence 1</option><option>Licence 2</option><option>Licence 3</option></select></div>
                  </div>
                </>
              )}
              
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-400">Email</label><div className="relative"><Mail className="absolute left-3 top-3 text-gray-400" size={18} /><input name="email" type="email" onChange={handleChange} className="w-full pl-10 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-bold" placeholder="etudiant@ucak.sn" required /></div></div>
              <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-gray-400">Mot de passe</label><div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={18} /><input name="password" type="password" onChange={handleChange} className="w-full pl-10 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-bold" placeholder="••••••" required /></div></div>

              <AnimatePresence>
                {error && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg flex items-center gap-2"><AlertTriangle size={14} /> {error}</motion.div>}
                {successMsg && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="p-3 bg-green-50 text-green-600 text-xs font-bold rounded-lg flex items-center gap-2"><CheckCircle2 size={14} /> {successMsg}</motion.div>}
              </AnimatePresence>

              <button type="submit" disabled={isLoading} className="w-full py-4 bg-ucak-blue text-white rounded-xl font-black uppercase tracking-widest hover:bg-ucak-green transition-all shadow-lg flex justify-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" /> : <>{isRegister ? "S'inscrire" : "Se connecter"} <ArrowRight size={18} /></>}
              </button>
           </form>

           <div className="mt-6 text-center pt-6 border-t border-gray-100 dark:border-white/5">
              <button onClick={() => setIsRegister(!isRegister)} className="text-sm font-bold text-ucak-blue hover:underline">
                {isRegister ? "J'ai déjà un compte" : "Créer un compte étudiant"}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}