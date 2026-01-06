import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, Globe, Zap, Calendar, ExternalLink, 
  TrendingUp, RefreshCw, Layers, DollarSign, Cpu 
} from 'lucide-react';

// --- CONFIGURATION DES SOURCES RSS (Ajoutez-en autant que vous voulez) ---
const RSS_SOURCES = [
  {
    name: "Agence Ecofin (Telecom)",
    url: "https://www.agenceecofin.com/fil-telecom?format=feed",
    category: "Tech Afrique",
    color: "bg-blue-600"
  },
  {
    name: "Le Monde Informatique",
    url: "https://www.lemondeinformatique.fr",
    category: "IT & Dév",
    color: "bg-red-600"
  },
  {
    name: "Compta Online",
    url: "https://www.compta-online.com",
    category: "Compta/Gestion",
    color: "bg-green-600"
  },
  {
    name: "Agence Ecofin (Finance)",
    url: "https://www.agenceecofin.com/",
    category: "Finance",
    color: "bg-yellow-600"
  },
  {
    name: "Journal du Geek",
    url: "https://www.journaldugeek.com/",
    category: "Tech Général",
    color: "bg-purple-600"
  }
];

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tous');

  // --- MOTEUR D'ASPIRATION DES NEWS ---
  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      let aggregatedNews = [];

      // On boucle sur chaque source
      const promises = RSS_SOURCES.map(async (source) => {
        try {
          // On utilise un proxy 'allorigins' pour éviter les blocages CORS
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`;
          const response = await fetch(proxyUrl);
          const data = await response.json();
          
          if (data.contents) {
            // Parsing du XML (Le format brut des RSS)
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.contents, "text/xml");
            const items = xmlDoc.querySelectorAll("item");

            items.forEach((item) => {
              // Extraction sécurisée des données
              const title = item.querySelector("title")?.textContent || "Sans titre";
              const link = item.querySelector("link")?.textContent || "#";
              const pubDate = item.querySelector("pubDate")?.textContent;
              const description = item.querySelector("description")?.textContent || "";
              
              // Tentative d'extraction d'image (Souvent cachée dans la description ou enclosure)
              let image = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80"; // Image par défaut
              
              const enclosure = item.querySelector("enclosure");
              if (enclosure) image = enclosure.getAttribute("url");
              else {
                // Cherche une balise img dans la description HTML
                const imgMatch = description.match(/src="([^"]+)"/);
                if (imgMatch) image = imgMatch[1];
              }

              // Nettoyage de la description (retirer le HTML)
              const cleanDesc = description.replace(/<[^>]*>?/gm, '').slice(0, 140) + "...";

              aggregatedNews.push({
                id: link, // L'URL sert d'ID unique
                title,
                link,
                date: new Date(pubDate),
                description: cleanDesc,
                image,
                source: source.name,
                category: source.category,
                color: source.color
              });
            });
          }
        } catch (err) {
          console.warn(`Erreur sur le flux ${source.name}:`, err);
          // On continue même si un flux plante
        }
      });

      // Attendre que tous les flux aient répondu
      await Promise.all(promises);

      // Trier par date (du plus récent au plus vieux)
      aggregatedNews.sort((a, b) => b.date - a.date);
      
      setNews(aggregatedNews);
      setLoading(false);
    };

    fetchAllNews();
  }, []);

  // Filtrage
  const filteredNews = filter === 'Tous' 
    ? news 
    : news.filter(item => item.category.includes(filter) || item.category === filter);

  // Catégories uniques pour les boutons
  const categories = ['Tous', 'Tech Afrique', 'IT & Dév', 'Finance', 'Compta/Gestion'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-ucak-dark pt-28 pb-24 px-4 sm:px-6">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest mb-3 animate-pulse">
              <Zap size={12} /> News Feed Aggregator
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
              L'Actualité <span className="text-ucak-blue">360°</span>
            </h1>
            <p className="text-gray-500 max-w-xl text-sm md:text-base">
              Tech, Finance, Gestion : Nous agrégeons en temps réel les meilleurs articles du web pour vous.
            </p>
          </div>

          {/* Filtres (Scrollable sur mobile) */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 no-scrollbar">
             <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                      filter === cat 
                        ? 'bg-ucak-blue text-white shadow-lg' 
                        : 'bg-white dark:bg-white/5 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* GRILLE */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
               <div key={i} className="h-80 bg-white dark:bg-white/5 rounded-3xl animate-pulse"></div>
             ))}
          </div>
        ) : filteredNews.length === 0 ? (
           <div className="text-center py-20">
             <RefreshCw className="mx-auto text-gray-300 animate-spin mb-4" size={40} />
             <p className="text-gray-500">Chargement des flux en cours ou erreur de connexion...</p>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <NewsCard key={item.id} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- CARTE D'ACTUALITÉ ---
const NewsCard = ({ data }) => {
  return (
    <motion.a 
      href={data.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group flex flex-col bg-white dark:bg-[#161b22] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full"
    >
      {/* Image */}
      <div className="h-48 overflow-hidden relative">
        <img 
          src={data.image} 
          alt="News Cover" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop"; }} // Fallback image si erreur
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-md ${data.color}`}>
            {data.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/80 to-transparent"></div>
      </div>

      {/* Contenu */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-wide">
            <span className="flex items-center gap-1"><Layers size={12}/> {data.source}</span>
            <span className="flex items-center gap-1"><Calendar size={12}/> {data.date.toLocaleDateString()}</span>
        </div>

        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2 group-hover:text-ucak-blue transition-colors">
          {data.title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6 flex-grow">
          {data.description}
        </p>

        <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 group-hover:text-ucak-blue transition-colors">Lire l'article complet</span>
            <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/10 flex items-center justify-center text-gray-400 group-hover:bg-ucak-blue group-hover:text-white transition-all">
                <ExternalLink size={14} />
            </div>
        </div>
      </div>
    </motion.a>
  );
};