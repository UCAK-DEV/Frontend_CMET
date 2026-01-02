import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, BookOpen, ExternalLink, ChevronDown, Award, MapPin, GraduationCap, Building2, Layout, Lock, Globe } from 'lucide-react';

// Composant pour les Sections Animées
const FadeInSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function About() {
  const [activeDept, setActiveDept] = useState(0);

  const departments = [
    { title: "Informatique & Télécoms", status: "Ouvert", icon: Layout, desc: "Formation d'ingénieurs en développement logiciel, réseaux, IA et cybersécurité." },
    { title: "Hautes Études Commerciales (HEC)", status: "Ouvert", icon: Building2, desc: "Management, Marketing, Finance et Gestion des entreprises." },
    { title: "Génie Électromécanique", status: "Bientôt", icon: Award, desc: "Maintenance industrielle, robotique et systèmes embarqués." },
    { title: "Génie Civil & BTP", status: "Bientôt", icon: MapPin, desc: "Construction, architecture et gestion des travaux publics." },
    { title: "Artisanat & Industrie", status: "Bientôt", icon: Users, desc: "Valorisation des métiers manuels et industrialisation locale." },
  ];

  const bureauMembers = [
    { name: "Serigne Mbacké", role: "Président", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=400&h=400" },
    { name: "Sokhna Diarra", role: "Secrétaire Générale", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400" },
    { name: "Moussa Fall", role: "Resp. Tech", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=400&h=400" },
    { name: "Fatou Ndiaye", role: "Resp. HEC", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=400&h=400" },
  ];

  // CORRECTION : On récupère l'icône active ici pour éviter l'erreur dans le JSX
  const ActiveIcon = departments[activeDept].icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark overflow-hidden">
      
      {/* 1. HERO SECTION : L'UNIVERSITÉ (CCAK) */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Parallaxe */}
        <div className="absolute inset-0 bg-ucak-blue">
           <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80" alt="Campus CCAK" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-ucak-dark"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mt-20">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }}>
             <span className="bg-ucak-gold text-ucak-dark font-bold px-4 py-1 rounded-full text-xs tracking-widest uppercase mb-4 inline-block shadow-lg">Institution Mère</span>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">
            Université Cheikh <br/> Ahmadoul Khadim
          </motion.h1>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
             <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
               Un pôle d'excellence académique alliant modernité scientifique et valeurs culturelles au cœur de Touba.
             </p>
             <a href="https://ccak.edu.sn" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-ucak-blue px-8 py-4 rounded-full font-bold hover:bg-ucak-gold hover:text-ucak-dark transition-all shadow-xl hover:scale-105">
                Visiter le site officiel CCAK <ExternalLink size={18} />
             </a>
          </motion.div>
        </div>
      </section>

      {/* 2. SÉPARATION DES PORTAILS (Explication Claire) */}
      <section className="py-10 -mt-20 relative z-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            
            {/* Carte Portail Université */}
            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-white dark:bg-ucak-dark-card p-8 rounded-3xl shadow-xl border-t-4 border-ucak-blue flex items-start gap-4">
               <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-ucak-blue dark:text-blue-300">
                  <Globe size={32} />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-ucak-blue dark:text-white mb-2">Site Officiel CCAK</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Pour les inscriptions administratives, le calendrier universitaire global et les actualités du rectorat.</p>
                  <span className="text-xs font-bold text-ucak-blue flex items-center gap-1">Public <ExternalLink size={12}/></span>
               </div>
            </motion.div>

            {/* Carte Portail Club MET */}
            <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-ucak-dark text-white p-8 rounded-3xl shadow-xl border-t-4 border-ucak-green flex items-start gap-4 relative overflow-hidden">
               <div className="absolute -right-10 -top-10 w-32 h-32 bg-ucak-green rounded-full blur-[50px] opacity-20"></div>
               <div className="p-3 bg-ucak-green/20 rounded-xl text-ucak-green">
                  <Lock size={32} />
               </div>
               <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">Plateforme Club MET</h3>
                  <p className="text-sm text-gray-300 mb-4">Espace réservé aux étudiants UFR MET pour les cours, CV, Élections et Projets.</p>
                  <span className="text-xs font-bold text-ucak-green flex items-center gap-1">Accès Restreint UFR</span>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. PRÉSENTATION UFR MET */}
      <section className="py-24 px-6 bg-white dark:bg-ucak-dark-card/50">
        <div className="container mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="text-ucak-green font-bold text-sm uppercase tracking-widest">Notre Composante</span>
              <h2 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mt-2 mb-6">UFR Métiers & Technologies</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                "Former l'élite technologique de demain." L'UFR MET est la branche technique de l'université, dédiée aux savoir-faire pratiques et à l'innovation.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
             {/* Liste des Départements */}
             <div className="lg:col-span-5 space-y-4">
                {departments.map((dept, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setActiveDept(idx)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all border-l-4 ${
                      activeDept === idx 
                      ? 'bg-ucak-blue text-white border-ucak-gold shadow-lg scale-105' 
                      : 'bg-gray-50 dark:bg-ucak-dark-card text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                       <h3 className="font-bold text-lg">{dept.title}</h3>
                       {dept.status === 'Ouvert' ? (
                         <span className="text-[10px] bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full font-bold border border-green-500/20">OUVERT</span>
                       ) : (
                         <span className="text-[10px] bg-gray-500/20 text-gray-500 px-2 py-1 rounded-full font-bold">À VENIR</span>
                       )}
                    </div>
                  </motion.div>
                ))}
             </div>

             {/* Détail Département (Visuel) */}
             <div className="lg:col-span-7">
                <motion.div 
                  key={activeDept}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-ucak-green/5 dark:bg-ucak-green/10 p-10 rounded-3xl border border-ucak-green/20 h-full flex flex-col justify-center min-h-[400px] relative overflow-hidden"
                >
                   {/* CORRECTION DU BUG ICI : Utilisation de ActiveIcon */}
                   <div className="absolute -right-20 -bottom-20 text-ucak-green/5 dark:text-ucak-green/10">
                      <ActiveIcon size={300} />
                   </div>
                   
                   <div className="relative z-10">
                      <div className="w-16 h-16 bg-ucak-green text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-ucak-green/30">
                         <ActiveIcon size={32} />
                      </div>
                      <h3 className="text-3xl font-bold text-ucak-blue dark:text-white mb-4">{departments[activeDept].title}</h3>
                      <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {departments[activeDept].desc}
                      </p>
                      
                      {departments[activeDept].status === 'Ouvert' && (
                        <div className="bg-white dark:bg-ucak-dark-card p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                           <h4 className="font-bold text-ucak-blue dark:text-white mb-2 flex items-center gap-2">
                              <GraduationCap size={20} className="text-ucak-gold"/> Admission
                           </h4>
                           <ul className="text-sm text-gray-500 space-y-2">
                              <li>• Bac Scientifique (S1, S2) ou Technique (T1, T2) requis.</li>
                              <li>• Sélection stricte sur dossier (Maths, Physique, Français).</li>
                              <li>• Entretien de motivation pour les admissibles.</li>
                           </ul>
                        </div>
                      )}
                   </div>
                </motion.div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. LE CLUB MET (LE STAFF) */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
           <FadeInSection>
             <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                <div className="max-w-2xl">
                   <h2 className="text-4xl font-black text-ucak-blue dark:text-white mb-4">Le Bureau du Club</h2>
                   <p className="text-gray-600 dark:text-gray-400 text-lg">
                      Une équipe dévouée d'étudiants élus pour dynamiser la vie du campus et créer des opportunités.
                   </p>
                </div>
                <button className="hidden md:block bg-ucak-gold text-ucak-dark px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors">
                   Contacter le Bureau
                </button>
             </div>
           </FadeInSection>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bureauMembers.map((member, idx) => (
                 <FadeInSection key={idx} delay={idx * 0.1}>
                    <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer">
                       <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       <div className="absolute inset-0 bg-gradient-to-t from-ucak-blue via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                       <div className="absolute bottom-0 left-0 p-6">
                          <p className="text-ucak-gold font-bold text-xs uppercase tracking-widest mb-1">{member.role}</p>
                          <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                       </div>
                    </div>
                 </FadeInSection>
              ))}
           </div>
        </div>
      </section>

    </div>
  );
}