import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Vérifiez bien que toutes ces icônes sont importées
import { Mail, Lock, ArrowRight, Loader2, User, Hash, AlertTriangle, CheckCircle2, GraduationCap } from 'lucide-react';
import logoUcak from '../assets/logo-ucak.png';

const InputField = ({ icon: Icon, ...props }) => (
  <div className="group relative">
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ucak-blue transition-colors" size={20} />
    <input 
      {...props}
      className="w-full pl-12 pr-4 py-4 rounded-xl font-medium outline-none transition-all placeholder:text-gray-400
        bg-gray-50 border border-gray-200 text-gray-900 focus:border-ucak-blue focus:bg-white focus:ring-4 focus:ring-ucak-blue/10
        dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:border-ucak-blue dark:focus:bg-black/40"
    />
  </div>
);

const SelectField = ({ icon: Icon, children, ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />}
    <select 
      {...props}
      className={`w-full py-4 rounded-xl font-medium outline-none transition-all appearance-none cursor-pointer
        bg-gray-50 border border-gray-200 text-gray-900 focus:border-ucak-blue
        dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:border-ucak-blue
        ${Icon ? 'pl-12 pr-4' : 'px-4'}`}
    >
      {children}
    </select>
  </div>
);

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
    
    // Simulation délai
    await new Promise(r => setTimeout(r, 800));

    try {
      if (isRegister) {
        const res = await register(formData);
        if (res.success) {
           setSuccessMsg("Bienvenue ! Redirection...");
           setTimeout(() => navigate('/dashboard'), 1500);
        } else setError(res.message || "Échec de l'inscription");
      } else {
        const res = await login(formData.email, formData.password);
        if (res.success) navigate('/dashboard');
        else setError("Identifiants incorrects");
      }
    } catch (err) { setError("Erreur de connexion au serveur"); } 
    finally { setIsLoading(false); }
  };

  return (
    // min-h-[80vh] permet d'éviter que la page soit trop grande sur mobile avec la barre de nav
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden transition-colors duration-500">
      
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-ucak-blue/5 rounded-full blur-[100px] dark:hidden"></div>
        <div className="hidden dark:block absolute bottom-0 right-0 w-[500px] h-[500px] bg-ucak-blue/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-center py-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[500px] rounded-[2.5rem] shadow-2xl overflow-hidden relative
            bg-white border border-gray-100
            dark:bg-[#111] dark:border-white/10 dark:shadow-black/50"
        >
          <div className="h-2 w-full bg-gradient-to-r from-ucak-blue via-ucak-green to-ucak-gold"></div>

          <div className="p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center p-4 shadow-inner bg-gray-50 dark:bg-white/5">
                <img src={logoUcak} alt="Logo" className="w-full h-full object-contain drop-shadow-lg" />
              </div>
              <h1 className="text-3xl font-black mb-2 text-gray-900 dark:text-white">
                {isRegister ? "Rejoindre" : "Connexion"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Accédez à votre espace étudiant.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {isRegister && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <InputField icon={User} name="full_name" placeholder="Prénom" required onChange={handleChange} />
                      <InputField icon={Hash} name="matricule" placeholder="Matricule" required onChange={handleChange} />
                    </div>
                    <SelectField icon={GraduationCap} name="filiere" onChange={handleChange}>
                      <option>Informatique</option>
                      <option>HEC</option>
                    </SelectField>
                  </motion.div>
                )}
              </AnimatePresence>

              <InputField icon={Mail} type="email" name="email" placeholder="Email" required onChange={handleChange} />
              <InputField icon={Lock} type="password" name="password" placeholder="Mot de passe" required onChange={handleChange} />

              {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
              {successMsg && <p className="text-green-500 text-xs font-bold text-center">{successMsg}</p>}

              <button type="submit" disabled={isLoading} className="w-full py-4 mt-2 bg-ucak-blue text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-ucak-green transition-all flex justify-center items-center gap-2">
                {isLoading ? <Loader2 className="animate-spin" /> : (isRegister ? "S'inscrire" : "Se Connecter")}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => { setError(''); setIsRegister(!isRegister); }}
                className="text-sm font-bold text-ucak-blue dark:text-white hover:underline decoration-ucak-gold"
              >
                {isRegister ? "J'ai déjà un compte" : "Créer un compte"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}