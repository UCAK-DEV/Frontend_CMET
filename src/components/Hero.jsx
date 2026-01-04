import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, ShieldCheck, Zap, ArrowRight, Quote, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import du contexte

export default function Hero() {
  const { user } = useUser(); // Récupération de l'état utilisateur

  return (
    <div className="overflow-hidden">
      {/* --- SECTION 1 : HERO PRINCIPAL --- */}
      <section className="relative pt-36 pb-24 min-h-[95vh] flex items-center">
        
        {/* Arrière-plan Dynamique */}
        <div className="absolute inset-0 ucak-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-ucak-green/10 rounded-full blur-[120px] -z-10 animate-glow-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-ucak-gold/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/40 dark:bg-ucak-dark-card/40 border border-ucak-gold/20 backdrop-blur-xl text-ucak-blue dark:text-ucak-gold font-black text-xs mb-10 uppercase tracking-[0.2em] shadow-xl"
          >
            <Sparkles size={14} className="animate-pulse" /> 
            <span>Savoir Utile • Action Vertueuse • Conduite Exemplaire</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[7rem] font-black text-ucak-blue dark:text-white mb-8 leading-[0.9] tracking-tighter"
          >
            L'Excellence entre <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green via-ucak-gold to-ucak-green bg-[length:200%_auto] animate-gradient-x">
              Tradition & Modernité
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mb-14"
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic">
              "Nous nous efforçons d'offrir une éducation complète qui prépare nos étudiants à exceller dans tous les domaines."
            </p>
          </motion.div>

          {/* --- BOUTONS D'ACTION INTELLIGENTS --- */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-24">
            {user ? (
              // CAS 1 : UTILISATEUR CONNECTÉ
              <Link to="/dashboard">
                <button className="px-10 py-5 bg-ucak-blue dark:bg-ucak-green text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-ucak-green/40 hover:-translate-y-2 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                  Accéder à mon Espace <LayoutDashboard size={18} />
                </button>
              </Link>
            ) : (
              // CAS 2 : VISITEUR
              <Link to="/login">
                <button className="px-10 py-5 bg-ucak-blue dark:bg-ucak-green text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-ucak-green/40 hover:-translate-y-2 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                  Devenir un Leader <ChevronRight size={18} />
                </button>
              </Link>
            )}

            <Link to="/about">
              <button className="px-10 py-5 bg-white dark:bg-white/5 text-ucak-blue dark:text-white border border-gray-200 dark:border-white/10 font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all backdrop-blur-xl uppercase tracking-widest text-xs">
                Découvrir l'Institution
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ... (Le reste de la section Piliers reste identique) ... */}
      <section className="py-24 bg-gray-50 dark:bg-ucak-dark-card/20 relative border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -15 }} className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="w-16 h-16 bg-ucak-blue/10 rounded-2xl flex items-center justify-center mb-8 text-ucak-blue"><Zap size={32} /></div>
              <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-4">Savoir Utile</h3>
              <p className="text-gray-500 dark:text-gray-300 leading-relaxed mb-6">Une quête permanente de connaissances scientifiques.</p>
            </motion.div>
            <motion.div whileHover={{ y: -15 }} className="bg-ucak-blue p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group text-white">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-white"><ShieldCheck size={32} /></div>
              <h3 className="text-2xl font-black mb-4">Action Vertueuse</h3>
              <p className="text-white/80 leading-relaxed mb-6">Traduire le savoir par des actes concrets et éthiques.</p>
            </motion.div>
            <motion.div whileHover={{ y: -15 }} className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
              <div className="w-16 h-16 bg-ucak-gold/10 rounded-2xl flex items-center justify-center mb-8 text-ucak-gold"><Sparkles size={32} /></div>
              <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-4">Conduite Exemplaire</h3>
              <p className="text-gray-500 dark:text-gray-300 leading-relaxed mb-6">Incarner les valeurs spirituelles et morales.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}