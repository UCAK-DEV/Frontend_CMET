import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, ShieldCheck, Zap, Briefcase, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Hero() {
  const { user } = useUser();

  return (
    <div className="overflow-hidden">
      <section className="relative pt-36 pb-24 min-h-[95vh] flex items-center">
        {/* Fond */}
        <div className="absolute inset-0 ucak-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-ucak-green/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          
          {/* LOGIQUE DYNAMIQUE */}
          {user ? (
            // === VUE ÉTUDIANT (Connecté) ===
            <>
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-ucak-blue/10 text-ucak-blue dark:text-ucak-gold font-bold text-xs mb-8 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Session Active
              </motion.div>
              
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black text-ucak-blue dark:text-white mb-6">
                Bon retour, <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green to-ucak-gold">{user.full_name.split(' ')[0]}</span>.
              </motion.h1>
              
              <p className="text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                Votre espace numérique est prêt. Reprenez vos cours là où vous les avez laissés ou consultez vos dernières notifications.
              </p>

              <div className="flex justify-center gap-4">
                <Link to="/dashboard">
                  <button className="px-10 py-5 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform flex items-center gap-3">
                    <LayoutDashboard size={20} /> Mon Tableau de Bord
                  </button>
                </Link>
              </div>
            </>
          ) : (
            // === VUE VISITEUR (Public) ===
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-white/40 dark:bg-ucak-dark-card/40 border border-ucak-gold/20 backdrop-blur-xl text-ucak-blue dark:text-ucak-gold font-black text-xs mb-10 uppercase tracking-[0.2em] shadow-xl"
              >
                <Sparkles size={14} className="animate-pulse" /> <span>Technologie • Management • Innovation</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-[7rem] font-black text-ucak-blue dark:text-white mb-8 leading-[0.9] tracking-tighter"
              >
                L'Excellence <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green via-ucak-gold to-ucak-green bg-[length:200%_auto] animate-gradient-x">
                  Pluridisciplinaire
                </span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-4xl mx-auto mb-14">
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed italic">
                  "De l'Ingénierie Informatique aux Hautes Études Commerciales, formez-vous aux métiers de demain avec éthique et rigueur."
                </p>
              </motion.div>

              <div className="flex flex-col md:flex-row justify-center gap-6 mb-24">
                {/* MODIFICATION ICI : Texte et Lien */}
                <Link to="/login">
                  <button className="px-10 py-5 bg-ucak-blue dark:bg-ucak-green text-white font-black rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-ucak-green/40 hover:-translate-y-2 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                    Espace Étudiants <ChevronRight size={18} />
                  </button>
                </Link>
                
                {/* Lien qui posait problème (Découvrir) */}
                <Link to="/about">
                  <button className="px-10 py-5 bg-white dark:bg-white/5 text-ucak-blue dark:text-white border border-gray-200 dark:border-white/10 font-black rounded-2xl hover:bg-gray-50 dark:hover:bg-white/10 transition-all backdrop-blur-xl uppercase tracking-widest text-xs">
                    Découvrir l'Institution
                  </button>
                </Link>
              </div>
            </>
          )}

        </div>
      </section>

      {/* Piliers */}
      {!user && (
        <section className="py-24 bg-gray-50 dark:bg-ucak-dark-card/20 relative border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -15 }} className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
                <div className="w-16 h-16 bg-ucak-blue/10 rounded-2xl flex items-center justify-center mb-8 text-ucak-blue"><Zap size={32} /></div>
                <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-4">Savoir Utile</h3>
                <p className="text-gray-500 dark:text-gray-300 leading-relaxed mb-6">Sciences, Technologie et Gestion pour servir la communauté.</p>
              </motion.div>
              <motion.div whileHover={{ y: -15 }} className="bg-ucak-blue p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group text-white">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 text-white"><ShieldCheck size={32} /></div>
                <h3 className="text-2xl font-black mb-4">Action Vertueuse</h3>
                <p className="text-white/80 leading-relaxed mb-6">Un engagement éthique dans le monde professionnel.</p>
              </motion.div>
              <motion.div whileHover={{ y: -15 }} className="bg-white dark:bg-ucak-dark-card p-10 rounded-[3rem] shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
                <div className="w-16 h-16 bg-ucak-gold/10 rounded-2xl flex items-center justify-center mb-8 text-ucak-gold"><Briefcase size={32} /></div>
                <h3 className="text-2xl font-black text-ucak-blue dark:text-white mb-4">Leadership</h3>
                <p className="text-gray-500 dark:text-gray-300 leading-relaxed mb-6">Entrepreneuriat et Innovation au cœur de la formation.</p>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}