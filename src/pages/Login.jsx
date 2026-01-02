import { useState } from 'react';
import { Terminal, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // <--- IMPORT

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useUser(); // Récupérer la fonction login
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'un délai réseau (1.5s)
    setTimeout(() => {
      login(email); // Connexion
      setIsLoading(false);
      navigate('/dashboard'); // Redirection vers le Dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center p-4">
      <div className="card-base w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl dark:shadow-black/50">
        
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white dark:bg-ucak-dark-card">
          <h2 className="text-3xl font-black text-ucak-blue dark:text-white mb-2">
            {isLogin ? 'Bon retour' : 'Rejoindre le Club'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
            Portail des membres du Club MET.
          </p>

          <form className="space-y-5" onSubmit={handleAuth}>
            {!isLogin && (
               <div className="relative">
                 <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                 <input type="text" placeholder="Nom complet" className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white" required />
               </div>
            )}
            <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Email UCAK" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white" 
                  required
                />
            </div>
            <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input type="password" placeholder="Mot de passe" className="w-full pl-12 p-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-ucak-green outline-none dark:text-white" required />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full mt-4 bg-ucak-blue dark:bg-ucak-green text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Connexion' : "S'inscrire")} 
                {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>
          
          <button onClick={() => setIsLogin(!isLogin)} className="mt-6 text-sm text-center text-ucak-green dark:text-ucak-gold font-bold hover:underline">
            {isLogin ? "Créer un compte étudiant" : "J'ai déjà un compte"}
          </button>
        </div>

        <div className="w-full md:w-1/2 bg-ucak-blue dark:bg-black relative overflow-hidden flex items-center justify-center p-12">
          <div className="absolute inset-0 ucak-pattern opacity-30"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-ucak-green rounded-full blur-[80px] opacity-40"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-ucak-gold rounded-full blur-[80px] opacity-30"></div>
          
          <div className="relative z-10 text-white text-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl inline-block mb-6 border border-white/20">
                <Terminal size={40} />
            </div>
            <h3 className="text-3xl font-black mb-4">L'Innovation au service<br/>des Valeurs.</h3>
            <p className="text-white/70">Connectez-vous pour accéder à la base de connaissances et aux défis.</p>
          </div>
        </div>

      </div>
    </div>
  );
}