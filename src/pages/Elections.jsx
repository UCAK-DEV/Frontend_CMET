import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle, AlertTriangle, User, FileText, Lock } from 'lucide-react';

export default function Elections() {
  // État du vote de l'utilisateur (Simulation)
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showManifesto, setShowManifesto] = useState(null); // ID du candidat

  // Données Élections
  const electionInfo = {
    year: 2026,
    status: "OPEN", // 'OPEN', 'CLOSED', 'UPCOMING'
    totalVoters: 1450,
    deadline: "25 Octobre 2026 à 18h00"
  };

  // Candidats au Bureau
  const candidates = [
    {
      id: 1,
      name: "Ibrahima Fall",
      promo: "Master 1 Info",
      slogan: "L'Innovation au cœur de l'action",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      manifesto: "Je m'engage à multiplier les hackathons, créer un partenariat avec les entreprises de la Silicon Valley et digitaliser tous les services de l'UFR."
    },
    {
      id: 2,
      name: "Aminata Sow",
      promo: "Licence 3 HEC",
      slogan: "L'Excellence et la Rigueur",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      manifesto: "Mon programme se focalise sur l'insertion professionnelle : stages garantis pour les majors, mentorat avec les Alumni et fonds de soutien aux projets étudiants."
    },
    {
      id: 3,
      name: "Cheikh Diop",
      promo: "Master 2 Gestion",
      slogan: "Unir pour mieux servir",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      manifesto: "Je prône l'unité entre les départements Tech et HEC. Création d'un incubateur mixte et transparence totale sur le budget du club."
    }
  ];

  const handleVote = () => {
    // Ici, appel API Backend pour enregistrer le vote avec l'ID crypté de la carte
    // API.post('/vote', { candidateId: selectedCandidate, userToken: ... })
    
    setTimeout(() => {
      setHasVoted(true);
      window.scrollTo(0, 0);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-ucak-dark">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-ucak-gold/20 text-ucak-gold border border-ucak-gold/50 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-4">
             <ShieldCheck size={14} /> Zone Sécurisée • Réservé Membres UFR
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-ucak-blue dark:text-white mb-4">
            Élections du Bureau <span className="text-ucak-green">{electionInfo.year}</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Utilisez votre E-Carte pour élire le prochain président du Club MET. 
            Votre voix compte pour l'avenir de la communauté.
          </p>
        </div>

        {/* FEEDBACK POST-VOTE */}
        {hasVoted ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-12 rounded-3xl text-center">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-300">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-2">A voté !</h2>
            <p className="text-green-700 dark:text-green-300">Votre vote a été enregistré anonymement dans la Blockchain UCAK.</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-4">Résultats disponibles le {electionInfo.deadline}</p>
          </motion.div>
        ) : (
          <>
            {/* INSTRUCTIONS */}
            <div className="bg-white dark:bg-ucak-dark-card p-6 rounded-2xl border-l-4 border-ucak-gold shadow-sm mb-12 flex items-start gap-4">
               <AlertTriangle className="text-ucak-gold shrink-0 mt-1" />
               <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong className="block text-gray-900 dark:text-white mb-1">Règles du vote :</strong>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Seuls les étudiants inscrits à l'UFR MET avec une <strong>E-Carte active</strong> peuvent voter.</li>
                    <li>Un seul vote par identifiant unique. Toute tentative de fraude entraînera une suspension.</li>
                    <li>Le vote est définitif et non modifiable.</li>
                  </ul>
               </div>
            </div>

            {/* LISTE CANDIDATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {candidates.map((candidate) => (
                <motion.div 
                  key={candidate.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedCandidate(candidate.id)}
                  className={`relative bg-white dark:bg-ucak-dark-card rounded-2xl overflow-hidden cursor-pointer transition-all border-2 ${
                    selectedCandidate === candidate.id 
                    ? 'border-ucak-green ring-4 ring-ucak-green/20 shadow-xl scale-105' 
                    : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-lg'
                  }`}
                >
                  <div className="h-48 overflow-hidden relative">
                    <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-xl">{candidate.name}</h3>
                      <p className="text-xs opacity-90">{candidate.promo}</p>
                    </div>
                    {/* Checkbox visuel */}
                    <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                       selectedCandidate === candidate.id ? 'bg-ucak-green text-white' : 'bg-white/30 text-transparent'
                    }`}>
                       <CheckCircle size={20} />
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-ucak-blue dark:text-ucak-gold font-bold text-sm mb-4 italic text-center">"{candidate.slogan}"</p>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowManifesto(showManifesto === candidate.id ? null : candidate.id); }}
                      className="w-full py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
                    >
                      <FileText size={14} /> {showManifesto === candidate.id ? 'Masquer' : 'Lire le programme'}
                    </button>

                    {showManifesto === candidate.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-gray-700 dark:text-gray-300 leading-relaxed border border-blue-100 dark:border-blue-800">
                        {candidate.manifesto}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ACTION FOOTER */}
            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-ucak-dark-card border-t border-gray-200 dark:border-gray-800 p-4 z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
              <div className="container mx-auto flex justify-between items-center max-w-4xl">
                 <div className="hidden md:block">
                    <p className="text-sm font-bold text-gray-500">Candidat sélectionné :</p>
                    <p className="text-lg font-black text-ucak-blue dark:text-white">
                      {selectedCandidate ? candidates.find(c => c.id === selectedCandidate).name : "Aucun"}
                    </p>
                 </div>
                 <button 
                   onClick={handleVote}
                   disabled={!selectedCandidate}
                   className="w-full md:w-auto px-10 py-4 bg-ucak-green disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                 >
                    <Lock size={20} /> Confirmer mon vote
                 </button>
              </div>
            </div>
            
            {/* Spacer pour le footer fixe */}
            <div className="h-24"></div> 
          </>
        )}

      </div>
    </div>
  );
}