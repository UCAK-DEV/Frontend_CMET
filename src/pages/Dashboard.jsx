import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Activity, Settings, LogOut, Award, QrCode, RefreshCw, Printer, ShieldCheck, Download, CheckCircle } from 'lucide-react';
// IMPORT CORRIGÉ (Assurez-vous que le fichier s'appelle bien logo-ucak.jpg)
import logoUcak from '../assets/logo-ucak.png'; 

export default function Dashboard() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Données de l'étudiant
  const user = {
    name: "Moussa Diop",
    dob: "12/04/2002",
    pob: "Touba",
    promo: "Licence 3",
    filiere: "Génie Logiciel",
    matricule: "20230045MET",
    annee: "2025-2026",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    xp: 1250,
    badges: ["Génie du Code", "Major"]
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="pt-32 min-h-screen bg-ucak-light dark:bg-ucak-dark pb-20 print:pt-0 print:pb-0 print:bg-white">
      <div className="container mx-auto px-6 print:w-full print:max-w-none print:px-0">
        
        {/* HEADER */}
        <div className="print:hidden flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-black text-ucak-blue dark:text-white">Mon Espace Étudiant</h1>
            <p className="text-gray-500">Gérez votre profil et votre carte de membre.</p>
          </div>
          <div className="flex gap-3">
             <button 
                onClick={handlePrintCard}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all flex items-center gap-2"
             >
                <Printer size={18} /> Imprimer ma carte
             </button>
             <Link to="/elections">
                <button className="bg-gradient-to-r from-ucak-green to-ucak-blue text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                   <ShieldCheck size={18} /> Espace Vote
                </button>
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
          
          {/* CARTE ETUDIANT */}
          <div className="lg:col-span-1 space-y-8 print:w-full print:space-y-0">
            
            <div className="print:hidden bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-4 flex gap-3">
                <RefreshCw size={20} className="shrink-0"/>
                <p>Cliquez sur la carte pour voir le verso (QR Code). Utilisez le bouton "Imprimer" pour obtenir une version papier officielle.</p>
            </div>

            {/* --- COMPOSANT CARTE --- */}
            <div className="perspective-1000 group h-[54mm] w-[86mm] cursor-pointer mx-auto lg:mx-0 print:h-auto print:w-auto print:cursor-default" onClick={() => setIsFlipped(!isFlipped)}>
              <div className={`relative h-[54mm] w-[86mm] transition-all duration-700 transform-style-3d print:transform-none ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* RECTO */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-xl print:relative print:shadow-none print:border print:border-gray-300 print:mb-8 print:inset-auto print:block bg-white text-black">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-ucak-blue via-transparent to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-ucak-green"></div>
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-ucak-blue"></div>
                    
                    <div className="relative z-10 p-3 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-2 border-b border-gray-200 pb-1">
                            {/* Logo avec Lazy Loading */}
                            <img src={logoUcak} alt="Logo UCAK" loading="lazy" className="w-8 h-8 object-contain" />
                            <div className="leading-none">
                                <h3 className="font-bold text-[10px] text-ucak-blue uppercase tracking-wide">Université Cheikh Ahmadoul Khadim</h3>
                                <p className="text-[7px] text-gray-500 font-bold">UFR Métiers et Technologies</p>
                            </div>
                            <div className="ml-auto text-right">
                                <span className="block text-[6px] text-gray-400 uppercase">Année Académique</span>
                                <span className="block text-[10px] font-black text-ucak-gold">{user.annee}</span>
                            </div>
                        </div>

                        <div className="flex gap-3 h-full items-center">
                            <div className="w-[22mm] h-[28mm] bg-gray-200 border border-gray-300 rounded flex-shrink-0 overflow-hidden relative">
                                <img src={user.photo} alt="Identity" loading="lazy" className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 w-full bg-ucak-blue text-white text-[6px] text-center font-bold py-0.5">ETUDIANT</div>
                            </div>
                            <div className="space-y-0.5 flex-grow">
                                <div><span className="text-[7px] text-gray-400 uppercase block">Prénom & Nom</span><span className="text-sm font-bold text-ucak-blue block leading-tight">{user.name}</span></div>
                                <div className="grid grid-cols-2 gap-1">
                                    <div><span className="text-[6px] text-gray-400 uppercase block">Né(e) le</span><span className="text-[9px] font-medium">{user.dob}</span></div>
                                    <div><span className="text-[6px] text-gray-400 uppercase block">A</span><span className="text-[9px] font-medium">{user.pob}</span></div>
                                </div>
                                <div><span className="text-[6px] text-gray-400 uppercase block">Filière</span><span className="text-[9px] font-bold text-ucak-green">{user.filiere} ({user.promo})</span></div>
                                <div><span className="text-[6px] text-gray-400 uppercase block">Matricule</span><span className="font-mono text-[10px] font-black tracking-wider text-gray-800">{user.matricule}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* VERSO */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-xl print:relative print:shadow-none print:border print:border-gray-300 print:inset-auto print:rotate-0 print:block bg-white text-black">
                    <div className="absolute top-0 left-0 w-full h-2 bg-ucak-gold"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between text-center">
                        <div>
                            <p className="text-[7px] text-gray-500 uppercase font-bold mb-2">Scanner pour vérifier la validité</p>
                            <div className="bg-white p-1 inline-block border border-gray-100 rounded"><QrCode size={64} className="text-black"/></div>
                        </div>
                        <div className="text-[6px] text-gray-400 leading-tight space-y-1">
                            <p>Cette carte est la propriété de l'Université Cheikh Ahmadoul Khadim.</p>
                            <p>En cas de perte, merci de la rapporter au service de scolarité de l'UFR MET.</p>
                            <p className="font-bold text-ucak-blue">www.ucak.edu.sn</p>
                        </div>
                    </div>
                </div>

              </div>
            </div>

            <div className="print:hidden card-base rounded-2xl p-6 mt-8">
               <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Statistiques</h2>
               <ul className="space-y-2">
                 <li className="p-3 rounded-lg bg-gray-50 dark:bg-ucak-dark-card flex gap-3 items-center text-sm font-bold text-gray-600 dark:text-gray-300"><Trophy size={16} className="text-ucak-gold"/> Mes Badges: {user.badges.length}</li>
                 <li className="p-3 rounded-lg bg-gray-50 dark:bg-ucak-dark-card flex gap-3 items-center text-sm font-bold text-gray-600 dark:text-gray-300"><Activity size={16} className="text-ucak-green"/> XP Total: {user.xp}</li>
               </ul>
            </div>
          </div>

          {/* COLONNE DROITE */}
          <div className="lg:col-span-2 print:hidden">
             <div className="bg-white dark:bg-ucak-dark-card border border-gray-100 dark:border-gray-700 rounded-2xl p-8 mb-8 shadow-sm">
                <h2 className="text-2xl font-bold text-ucak-blue dark:text-white mb-2">Statut : Membre Actif</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Votre carte est valide pour l'année universitaire <strong>{user.annee}</strong>.</p>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 flex items-center gap-3"><CheckCircle className="text-green-600"/><span className="text-sm font-bold text-green-800 dark:text-green-400">Cotisation à jour</span></div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 flex items-center gap-3"><ShieldCheck className="text-blue-600"/><span className="text-sm font-bold text-blue-800 dark:text-blue-400">Éligible au vote</span></div>
                </div>
             </div>

             <h3 className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-4">Mes Outils</h3>
             <div className="grid grid-cols-2 gap-4">
                <Link to="/career" className="block"><button className="w-full text-left p-6 rounded-2xl bg-gradient-to-br from-ucak-blue to-ucak-dark text-white shadow-lg hover:shadow-xl transition-all group"><Award size={32} className="mb-4 text-ucak-gold group-hover:scale-110 transition-transform"/><span className="block font-bold text-lg">Career Center</span><span className="text-xs opacity-70">Générer mon CV & Portfolio</span></button></Link>
                <Link to="/knowledge" className="block"><button className="w-full text-left p-6 rounded-2xl bg-white dark:bg-ucak-dark-card border border-gray-200 dark:border-gray-700 hover:border-ucak-green transition-all group"><BookOpen size={32} className="mb-4 text-ucak-green group-hover:scale-110 transition-transform"/><span className="block font-bold text-lg text-gray-800 dark:text-white">Mes Cours</span><span className="text-xs text-gray-500">Accéder à la bibliothèque</span></button></Link>
             </div>
          </div>

        </div>
      </div>
      
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