import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Camera, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="overflow-hidden">
      {/* --- SECTION 1 : HERO PRINCIPAL --- */}
      <section className="relative pt-36 pb-20 min-h-[90vh] flex items-center">
        
        {/* Arrière-plan Animé */}
        <div className="absolute inset-0 ucak-pattern opacity-30 pointer-events-none"></div>
        <div className="absolute top-20 left-0 w-96 h-96 bg-ucak-green/20 dark:bg-ucak-green/10 rounded-full blur-[100px] -z-10 animate-glow-pulse pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-ucak-gold/20 dark:bg-ucak-gold/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/50 dark:bg-ucak-dark-card/50 border border-ucak-gold/30 backdrop-blur-md text-ucak-blue dark:text-ucak-gold font-bold text-sm mb-8 uppercase tracking-wider"
          >
            <BookOpen size={16} /> <span>Savoir & Lumière</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-ucak-blue dark:text-white mb-6 leading-tight tracking-tight"
          >
            L'Excellence <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-ucak-green to-ucak-gold">Tech & Business</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
          >
            Le point de rencontre des futurs <b>Ingénieurs</b> et <b>Managers</b> de l'UCAK. 
            Innover, Entreprendre et Servir selon les valeurs de Touba.
          </motion.p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mb-20">
            <Link to="/login">
              <button className="px-8 py-4 bg-ucak-green text-white font-bold rounded-full shadow-lg shadow-ucak-green/30 hover:shadow-ucak-green/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                Rejoindre le Club <ChevronRight size={20} />
              </button>
            </Link>
            <Link to="/about">
              <button className="px-8 py-4 bg-white dark:bg-white/5 text-ucak-blue dark:text-white border border-gray-200 dark:border-white/10 font-bold rounded-full hover:bg-gray-50 dark:hover:bg-white/10 transition-all backdrop-blur-md">
                Découvrir le Bureau
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- SECTION 2 : FLASHBACKS (PHOTOS) --- */}
      <section className="py-20 bg-white dark:bg-ucak-dark border-t border-gray-100 dark:border-gray-800 relative">
        <div className="container mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black text-ucak-blue dark:text-white mb-2 flex items-center gap-3">
                <Camera className="text-ucak-gold" /> Vie du Campus
              </h2>
              <p className="text-gray-500 dark:text-gray-400">Retour en images sur les derniers événements marquants.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-ucak-green font-bold hover:underline mt-4 md:mt-0">
              Voir toute la galerie <ArrowRight size={18} />
            </button>
          </div>

          {/* GRILLE PHOTOS BENTO */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            
            {/* Grande Photo Gauche */}
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Hackathon UCAK" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ucak-blue/90 via-transparent to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <span className="bg-ucak-gold text-ucak-dark text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">Hackathon 2024</span>
                <h3 className="text-3xl font-bold text-white mb-2">Grand Magal Tech</h3>
                <p className="text-gray-200 text-sm line-clamp-2">50 étudiants réunis pour créer des solutions numériques au service des pèlerins.</p>
              </div>
            </div>

            {/* Photo Haut Droite */}
            <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Conférence" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-xl font-bold text-white">Conférence "Islam & Management"</h3>
                <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                  <Calendar size={12} /> <span>Décembre 2024</span>
                </div>
              </div>
            </div>

            {/* Petite Photo Bas 1 */}
            <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Workshop" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ucak-green/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-bold text-lg border-b-2 border-white pb-1">Team Building</span>
              </div>
            </div>

            {/* Petite Photo Bas 2 */}
            <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl cursor-pointer bg-ucak-blue flex flex-col items-center justify-center text-center p-6 border border-white/10">
              <div className="w-16 h-16 rounded-full bg-ucak-gold/20 flex items-center justify-center mb-4 text-ucak-gold">
                <Camera size={32} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Galerie</h3>
              <p className="text-white/60 text-xs mb-4">Voir les 150+ photos</p>
              <button className="text-white text-xs font-bold bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                Explorer
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}