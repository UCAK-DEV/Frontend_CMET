import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import { ShieldAlert, Clock, FileText, CheckCircle2, LogOut } from 'lucide-react';

export default function PendingApproval() {
  const { user, logout } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#05070a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 ucak-grid-pattern opacity-[0.05] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>

      <div className="w-full max-w-2xl bg-white dark:bg-[#0b101a] rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 border border-gray-100 dark:border-white/5">
        <div className="p-10 md:p-14 text-center">
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="w-24 h-24 bg-orange-50 dark:bg-orange-900/10 rounded-full flex items-center justify-center mx-auto mb-8 text-orange-500"
          >
            <Clock size={48} className="animate-pulse" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            Compte en <span className="text-orange-500">Attente</span>
          </h1>
          
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
            Bonjour <strong>{user?.full_name}</strong>. Votre inscription a bien été enregistrée, mais l'accès à l'espace membre est restreint.
          </p>

          <div className="bg-gray-50 dark:bg-white/5 rounded-3xl p-8 mb-10 text-left">
            <h3 className="font-black text-sm uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <ShieldAlert size={16} /> Procédure de validation
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                <span className="text-sm dark:text-gray-300 font-medium">Inscription initiale terminée.</span>
              </li>
              <li className="flex gap-4 opacity-50">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-white/20 flex items-center justify-center text-[10px] font-bold text-gray-400">2</div>
                <span className="text-sm dark:text-gray-300 font-medium">Vérification de votre carte étudiante par un administrateur.</span>
              </li>
              <li className="flex gap-4 opacity-50">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-white/20 flex items-center justify-center text-[10px] font-bold text-gray-400">3</div>
                <span className="text-sm dark:text-gray-300 font-medium">Activation de l'accès aux cours et votes.</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-ucak-blue text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-ucak-green transition-all shadow-lg"
            >
              Vérifier mon statut
            </button>
            <button 
              onClick={logout}
              className="px-8 py-4 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Déconnexion
            </button>
          </div>

        </div>
        
        <div className="bg-gray-50 dark:bg-black/20 p-6 text-center text-xs text-gray-400 font-medium">
          Besoin d'aide ? Contactez le support via <a href="mailto:support@club-met.sn" className="text-ucak-blue hover:underline">support@club-met.sn</a>
        </div>
      </div>
    </div>
  );
}
