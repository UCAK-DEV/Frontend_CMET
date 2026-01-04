import { Hammer, ArrowLeft, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Showroom() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-ucak-dark px-6 flex flex-col items-center justify-center text-center">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <div className="inline-flex items-center justify-center p-6 bg-ucak-blue/10 rounded-full mb-8">
           <Construction size={64} className="text-ucak-blue" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mb-6">
          Projets Étudiants
        </h1>
        
        <p className="text-xl text-gray-500 mb-8 leading-relaxed">
          Le Showroom est en cours de développement. Bientôt, vous pourrez découvrir et voter pour les meilleures innovations du campus.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
           <Link to="/dashboard" className="px-8 py-3 bg-ucak-blue text-white rounded-xl font-bold uppercase tracking-widest hover:bg-ucak-green transition-all shadow-lg shadow-ucak-blue/20 flex items-center gap-2">
             <ArrowLeft size={20} /> Retour au Dashboard
           </Link>
        </div>
      </motion.div>

    </div>
  );
}