import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, Globe, Calendar, User } from 'lucide-react';

export default function ProjectDetails() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <Link to="/showroom" className="inline-flex items-center gap-2 text-gray-500 hover:text-ucak-green mb-6 transition-colors">
          <ArrowLeft size={20} /> Retour au Showroom
        </Link>

        <div className="card-base rounded-2xl overflow-hidden shadow-xl">
          {/* Image de couverture factice */}
          <div className="h-64 bg-gradient-to-r from-ucak-blue to-ucak-green flex items-center justify-center">
            <h1 className="text-4xl font-black text-white opacity-20 uppercase">Projet #{id}</h1>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Smart Touba App</h1>
                <div className="flex gap-2">
                  <span className="bg-ucak-green/10 text-ucak-green px-3 py-1 rounded-full text-sm font-bold">Mobile</span>
                  <span className="bg-ucak-gold/10 text-ucak-gold px-3 py-1 rounded-full text-sm font-bold">Innovation</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-black transition-all">
                  <Github size={18} /> Code
                </button>
                <button className="flex items-center gap-2 bg-ucak-blue text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-800 transition-all">
                  <Globe size={18} /> Demo
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="col-span-2 space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <h3 className="text-xl font-bold text-ucak-blue dark:text-white">À propos du projet</h3>
                <p>
                  Cette application a pour but de faciliter l'orientation des pèlerins lors du Grand Magal de Touba. 
                  Elle utilise la géolocalisation et une base de données temps réel pour indiquer les points d'intérêts, 
                  les postes de santé et les lieux de distribution de repas (Berndé).
                </p>
                <p>
                  Développée avec React Native et Firebase, elle intègre également un mode hors-ligne pour pallier 
                  aux problèmes de connexion réseau lors des pics d'affluence.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl space-y-4 h-fit">
                <h4 className="font-bold text-gray-900 dark:text-white">Informations</h4>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <User size={18} /> <span>Team X (Moussa, Fatou)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={18} /> <span>Publié le 12 Jan 2025</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700"/>
                <div>
                  <h5 className="font-bold text-xs uppercase text-gray-400 mb-2">Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {['React Native', 'Firebase', 'Maps API'].map(tech => (
                      <span key={tech} className="text-xs border border-gray-300 dark:border-gray-600 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}