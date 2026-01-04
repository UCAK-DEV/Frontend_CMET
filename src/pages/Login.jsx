import { useState } from 'react';
import { 
  Terminal, Mail, Lock, User, ArrowRight, Loader2, 
  BadgeCheck, School, GraduationCap, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // État pour le message de succès

  // État pour gérer tous les champs requis par le RegisterDto du backend
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    matricule: '',
    filiere: '',
    promo: ''
  });
  
  const { login, register } = useUser(); //
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(''); 
    setSuccessMsg(''); // On efface les messages quand l'utilisateur tape
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (isLogin) {
      // --- MODE CONNEXION ---
      const result = await login(formData.email, formData.password); //
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMsg(result.message);
      }
    } else {
      // --- MODE INSCRIPTION ---
      const result = await register(formData); //
      
      if (result.success) {
        setSuccessMsg("Votre compte étudiant a été créé avec succès ! Connectez-vous maintenant.");
        setIsLogin(true); // Redirige l'utilisateur vers le formulaire de login
        // On garde l'email pour faciliter la connexion
        setFormData(prev => ({ ...prev, password: '' })); 
      } else {
        setErrorMsg(result.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4 bg-ucak-light dark:bg-ucak-dark transition-colors">
      <div className="card-base w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        {/* COLONNE GAUCHE : FORMULAIRE */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white dark:bg-ucak-dark-card transition-colors">
          <h2 className="text-3xl font-black text-ucak-blue dark:text-white mb-2">
            {isLogin ? 'Bon retour' : 'Rejoindre le Club'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Portail officiel des membres du Club MET.
          </p>

          {/* Affichage des Erreurs */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2 border border-red-100 dark:border-red-800">
              <AlertCircle size={16} />
              {errorMsg}
            </div>
          )}

          {/* MESSAGE DE SUCCÈS (Nouveau) */}
          {successMsg && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-lg flex items-center gap-2 border border-green-100 dark:border-green-800">
              <CheckCircle2 size={16} />
              {successMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleAuth}>
            
            {!isLogin && (
               <>
                 <div className="relative">
                   <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                   <input 
                     type="text" name="full_name" placeholder="Nom complet (Ex: Baytir Sene)" 
                     value={formData.full_name} onChange={handleChange} required
                     className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white transition-all" 
                   />
                 </div>
                 <div className="relative">
                   <BadgeCheck className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                   <input 
                     type="text" name="matricule" placeholder="Matricule (Ex: 221045MET)" 
                     value={formData.matricule} onChange={handleChange} required
                     className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white transition-all" 
                   />
                 </div>
                 <div className="flex gap-4">
                    <div className="relative w-1/2">
                        <School className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" name="filiere" placeholder="Filière (Info)" 
                            value={formData.filiere} onChange={handleChange} required
                            className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white transition-all" 
                        />
                    </div>
                    <div className="relative w-1/2">
                        <GraduationCap className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" name="promo" placeholder="Promo (L3)" 
                            value={formData.promo} onChange={handleChange} required
                            className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white transition-all" 
                        />
                    </div>
                 </div>
               </>
            )}

            <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="email" name="email" placeholder="Email étudiant" 
                  value={formData.email} onChange={handleChange} required
                  className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white transition-all" 
                />
            </div>
            <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="password" name="password" placeholder="Mot de passe" 
                  value={formData.password} onChange={handleChange} required
                  className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white transition-all" 
                />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 bg-ucak-blue dark:bg-ucak-green text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01]"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Connexion' : "S'inscrire")} 
                {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
          
          <button 
            onClick={() => { setIsLogin(!isLogin); setErrorMsg(''); setSuccessMsg(''); }} 
            className="mt-6 text-sm text-center text-ucak-green dark:text-ucak-gold font-bold hover:underline"
          >
            {isLogin ? "Pas encore membre ? Créer un compte" : "J'ai déjà un compte"}
          </button>
        </div>

        {/* COLONNE DROITE : VISUEL */}
        <div className="hidden md:flex w-1/2 bg-ucak-blue dark:bg-black relative overflow-hidden items-center justify-center p-12 transition-colors">
          <div className="absolute inset-0 ucak-pattern opacity-20"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-ucak-green rounded-full blur-[80px] opacity-40"></div>
          
          <div className="relative z-10 text-white text-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl inline-block mb-6 border border-white/20 shadow-xl">
                <Terminal size={40} className="text-ucak-green" />
            </div>
            <h3 className="text-3xl font-black mb-4 leading-tight">L'Innovation au service<br/>de l'UFR MET.</h3>
            <p className="text-white/70 text-sm">Accédez à vos cours, participez aux élections et relevez des défis technologiques.</p>
          </div>
        </div>

      </div>
    </div>
  );
}