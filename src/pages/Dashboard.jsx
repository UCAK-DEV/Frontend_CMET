import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Activity, Award, QrCode, RefreshCw, Printer, ShieldCheck, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
// IMPORT CRUCIAL : Assurez-vous que le nom du fichier image est exact dans src/assets
import logoUcak from '../assets/logo-ucak.png'; 

export default function Dashboard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const user = {
    name: "Moussa Diop",
    dob: "12/04/2002",
    pob: "Touba",
    promo: "Licence 3",
    filiere: "Génie Logiciel",
    matricule: "MET-MBR-2025-045",
    annee: "2025-2026",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    xp: 1250,
    badges: ["Génie du Code", "Major", "Contributeur"]
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="pt-32 min-h-screen bg-ucak-light dark:bg-ucak-dark pb-20 print:pt-0 print:pb-0 print:bg-white">
      <div className="container mx-auto px-6 print:w-full print:max-w-none print:px-0">
        
        {/* HEADER DASHBOARD */}
        <div className="print:hidden mb-10">
          <h1 className="text-3xl font-black text-ucak-blue dark:text-white">Bureau Numérique</h1>
          <p className="text-gray-500">Bienvenue dans votre espace membre, {user.name.split(' ')[0]}.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
          
          {/* --- COLONNE GAUCHE --- */}
          <div className="lg:col-span-1 space-y-8 print:w-full print:space-y-0">
            
            {/* CARTE MEMBRE */}
            <div className="print:hidden bg-white dark:bg-ucak-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
               <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-ucak-blue dark:text-white flex items-center gap-2">
                     <ShieldCheck size={18} className="text-ucak-gold"/> Ma Carte Membre
                  </h2>
                  <button onClick={handlePrintCard} className="text-xs font-bold text-gray-500 hover:text-ucak-blue flex items-center gap-1">
                     <Printer size={14}/> Imprimer
                  </button>
               </div>
               
               {/* ZONE CARTE FLIP */}
               <div className="perspective-1000 group h-[54mm] w-full cursor-pointer mx-auto" onClick={() => setIsFlipped(!isFlipped)}>
                  <div className={`relative h-[54mm] w-full max-w-[86mm] mx-auto transition-all duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                     
                     {/* RECTO */}
                     <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl bg-white text-black border border-gray-200">
                        <div className="absolute top-0 left-0 w-2 h-full bg-ucak-blue"></div>
                        <div className="absolute top-0 right-0 w-4 h-full bg-ucak-green/10"></div>
                        
                        <div className="relative z-10 p-3 pl-5 h-full flex flex-col">
                           <div className="flex justify-between items-start mb-2 border-b border-gray-100 pb-1">
                              <img src={logoUcak} alt="Logo" className="w-8 h-8 object-contain" />
                              <div className="text-right">
                                 <h3 className="font-black text-[10px] text-ucak-blue uppercase">Club Métiers & Technologies</h3>
                                 <p className="text-[6px] text-gray-500 font-bold uppercase tracking-wider">Carte de Membre • {user.annee}</p>
                              </div>
                           </div>

                           <div className="flex gap-3 h-full items-center">
                              <div className="w-[20mm] h-[26mm] bg-gray-200 rounded border border-gray-300 overflow-hidden">
                                 <img src={user.photo} className="w-full h-full object-cover" loading="lazy" />
                              </div>
                              <div className="space-y-0.5">
                                 <span className="text-[12px] font-bold text-ucak-blue block leading-tight uppercase">{user.name}</span>
                                 <span className="text-[9px] font-bold text-ucak-green block">{user.filiere}</span>
                                 <span className="text-[8px] text-gray-500 block">{user.promo}</span>
                                 <div className="pt-1">
                                    <span className="text-[6px] text-gray-400 uppercase block">ID Membre</span>
                                    <span className="font-mono text-[9px] font-black tracking-wider text-gray-800">{user.matricule}</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {/* VERSO */}
                     <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-xl bg-ucak-blue text-white">
                        <div className="relative z-10 p-4 h-full flex flex-col items-center justify-center text-center">
                           <div className="bg-white p-1 rounded mb-2"><QrCode size={48} className="text-black"/></div>
                           <p className="text-[6px] text-gray-300 leading-tight px-4">
                              Cette carte certifie l'appartenance au Club MET de l'UCAK.
                              <br/><strong className="text-ucak-gold">ATTENTION :</strong> Elle ne remplace pas la carte d'étudiant officielle de l'université.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               
               <p className="text-center text-xs text-gray-400 mt-4 flex justify-center gap-1">
                  <RefreshCw size={12}/> Cliquer pour retourner
               </p>
            </div>

            {/* STATS */}
            <div className="print:hidden bg-white dark:bg-ucak-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
               <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4 text-sm uppercase tracking-wider">Engagement</h3>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-lg"><Trophy size={16}/></div>
                        <span className="text-sm font-bold dark:text-gray-300">Badges</span>
                     </div>
                     <span className="font-black text-lg text-ucak-blue dark:text-white">{user.badges.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg"><Activity size={16}/></div>
                        <span className="text-sm font-bold dark:text-gray-300">XP Club</span>
                     </div>
                     <span className="font-black text-lg text-ucak-blue dark:text-white">{user.xp}</span>
                  </div>
               </div>
            </div>

          </div>

          {/* --- COLONNE DROITE --- */}
          <div className="lg:col-span-2 space-y-6 print:hidden">
             
             {/* CAREER CENTER */}
             <div className="bg-gradient-to-r from-ucak-blue to-ucak-dark text-white rounded-3xl p-8 relative overflow-hidden shadow-xl group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                   <div>
                      <div className="bg-ucak-gold text-ucak-dark font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-3">
                         Outil Professionnel
                      </div>
                      <h2 className="text-3xl font-black mb-2">Career Center</h2>
                      <p className="text-white/80 max-w-md">
                         Préparez votre avenir. Créez votre CV au format UCAK, consultez les offres de stages et gérez votre portefeuille de compétences.
                      </p>
                   </div>
                   <Link to="/career">
                      <button className="bg-white text-ucak-blue px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg flex items-center gap-2">
                         <Briefcase size={20}/> Accéder au Career Center
                      </button>
                   </Link>
                </div>
             </div>

             {/* GRILLE D'ACCÈS RAPIDE */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link to="/knowledge" className="group">
                   <div className="bg-white dark:bg-ucak-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:border-ucak-green transition-all h-full">
                      <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                         <BookOpen size={24}/>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Mes Cours</h3>
                      <p className="text-sm text-gray-500">Reprendre l'apprentissage là où vous l'avez laissé.</p>
                   </div>
                </Link>
                <Link to="/elections" className="group">
                   <div className="bg-white dark:bg-ucak-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:border-ucak-gold transition-all h-full">
                      <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                         <ShieldCheck size={24}/>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">Espace Vote</h3>
                      <p className="text-sm text-gray-500">Participez aux décisions du club et élisez le bureau.</p>
                   </div>
                </Link>
             </div>

             {/* NOTIFICATION */}
             <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-blue-600 shrink-0 mt-0.5" size={20}/>
                <div>
                   <h4 className="font-bold text-blue-800 dark:text-blue-400 text-sm">Statut Membre : Actif</h4>
                   <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                      Votre adhésion est valide jusqu'au 31 Juillet 2026.
                   </p>
                </div>
             </div>

          </div>

        </div>
      </div>
      
      {/* CSS Spécifique Impression */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        @media print {
          @page { size: A4; margin: 10mm; }
          body { background: white; -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          nav, footer { display: none !important; }
          .perspective-1000 { height: auto !important; width: auto !important; display: block !important; }
          .transform-style-3d { transform: none !important; position: static !important; display: block !important; }
          .backface-hidden { backface-visibility: visible !important; transform: none !important; position: static !important; opacity: 1 !important; margin-bottom: 20px; border: 1px dashed #ccc; }
          .rotate-y-180 { transform: none !important; }
        }
      `}</style>
    </div>
  );
}