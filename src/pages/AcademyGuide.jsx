import { motion } from 'framer-motion';
import { 
  Info, LogIn, MousePointer2, FolderOpen, 
  Download, ShieldAlert, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AcademyGuide() {
  const steps = [
    {
      icon: <LogIn className="text-ucak-blue" />,
      title: "Identification",
      desc: "Connectez-vous avec vos identifiants d'étudiant pour accéder aux ressources privées du club."
    },
    {
      icon: <MousePointer2 className="text-ucak-gold" />,
      title: "Choisir sa Filière",
      desc: "Sélectionnez Informatique & Réseaux (IR) ou Haute Étude Commerciale (HEC) selon votre parcours."
    },
    {
      icon: <FolderOpen className="text-ucak-green" />,
      title: "Accès au Drive",
      desc: "Cliquez sur 'Ouvrir le dossier'. Vous serez redirigé vers l'espace cloud officiel de votre niveau."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#05070a] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-20">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 bg-ucak-blue/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-ucak-blue"
          >
            <Info size={40} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black dark:text-white tracking-tighter mb-6">
            Comment ça <span className="text-ucak-blue">marche ?</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            Suivez ce guide pour maîtriser l'utilisation du Hub Académique MET.
          </p>
        </header>

        {/* --- ÉTAPES --- */}
        <div className="space-y-6 mb-20">
          {steps.map((step, i) => (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="flex items-start gap-8 p-8 bg-gray-50 dark:bg-white/2 rounded-[2.5rem] border border-gray-100 dark:border-white/5"
            >
              <div className="p-4 bg-white dark:bg-white/5 rounded-2xl shadow-sm">
                {step.icon}
              </div>
              <div>
                <h3 className="text-xl font-black dark:text-white mb-2">{i + 1}. {step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- CONSEILS & RÈGLES --- */}
        <section className="bg-ucak-blue/5 rounded-[3rem] p-10 md:p-16 border border-ucak-blue/10 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-black text-ucak-blue mb-8 flex items-center gap-2">
              <ShieldAlert size={28} /> Bon à savoir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <CheckCircle2 className="text-ucak-green shrink-0" size={20} />
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Les dossiers sont en <strong>lecture seule</strong>. Vous pouvez consulter et télécharger, mais pas modifier les fichiers originaux.
                </p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-ucak-green shrink-0" size={20} />
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Utilisez votre <strong>compte Google personnel</strong> pour ouvrir les dossiers Drive sans erreur d'autorisation.
                </p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-ucak-green shrink-0" size={20} />
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Les ressources sont mises à jour chaque semaine par la <strong>cellule pédagogique</strong>.
                </p>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="text-ucak-green shrink-0" size={20} />
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  En cas de lien mort, contactez un administrateur via la cloche de notifications.
                </p>
              </div>
            </div>
          </div>
          {/* Déco */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-ucak-blue opacity-5 rounded-full blur-3xl"></div>
        </section>

        {/* --- CTA FINAL --- */}
        <div className="mt-20 text-center">
          <Link to="/knowledge">
            <button className="px-12 py-5 bg-ucak-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-ucak-blue/30">
              C'est compris, j'accède aux cours <ChevronRight size={18} className="inline ml-2" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}