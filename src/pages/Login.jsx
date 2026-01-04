import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation d'un délai réseau pour l'effet UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Identifiants incorrects (Essayez: etudiant@ucak.sn / pass)');
      }
    } catch (err) {
      setError('Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-ucak-dark">
      
      {/* COLONNE GAUCHE : BRANDING IMMERSIF (Masqué sur mobile) */}
      <div className="hidden lg:flex w-1/2 bg-ucak-blue relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 ucak-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-ucak-blue via-ucak-blue to-black opacity-80"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-ucak-green rounded-full blur-[150px] opacity-30"></div>
        
        <div className="relative z-10 text-white max-w-lg">
           <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10">
              <Sparkles className="text-ucak-gold" size={32} />
           </div>
           <h1 className="text-5xl font-black mb-6 leading-tight">L'Excellence Numérique.</h1>
           <p className="text-lg text-blue-100 leading-relaxed mb-8">
             Accédez à votre Espace Numérique de Travail (ENT). Retrouvez vos cours, vos notes et gérez votre carrière académique en un clic.
           </p>
           
           <div className="space-y-4">
              {["Bibliothèque Numérique 24/7", "Suivi de Carrière & Stages", "Réseau Alumni UCAK"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                   <CheckCircle2 size={18} className="text-ucak-green" /> {item}
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* COLONNE DROITE : FORMULAIRE FOCUS */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md">
           
           <div className="text-center mb-10">
              <img src={logoUcak} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Bon retour !</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Entrez vos identifiants pour accéder au Campus.</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Universitaire</label>
                 <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={20} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="matricule@ucak.edu.sn"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-ucak-blue/20 focus:border-ucak-blue transition-all font-bold text-gray-700 dark:text-white"
                      required
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between ml-1">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-500">Mot de passe</label>
                    <a href="#" className="text-xs font-bold text-ucak-blue hover:underline">Oublié ?</a>
                 </div>
                 <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={20} />
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-ucak-blue/20 focus:border-ucak-blue transition-all font-bold text-gray-700 dark:text-white"
                      required
                    />
                 </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-red-500"></div> {error}
                </motion.div>
              )}

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-ucak-blue hover:bg-ucak-green text-white py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-ucak-blue/20 hover:shadow-ucak-green/30 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : <>Connexion <ArrowRight size={18} /></>}
              </button>

           </form>

           <p className="text-center mt-8 text-xs text-gray-400 font-medium">
              Problème de connexion ? <a href="#" className="text-ucak-blue font-bold hover:underline">Contactez le support DSI</a>
           </p>
        </div>
      </div>
    </div>
  );
}