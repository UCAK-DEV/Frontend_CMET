import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ucak-light dark:bg-ucak-dark p-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-black text-ucak-green/20 dark:text-ucak-green/10">404</h1>
        <h2 className="text-3xl font-bold text-ucak-blue dark:text-white -mt-12 mb-6 relative z-10">
          Page Introuvable
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Oups ! Il semble que vous vous soyez égaré dans le code. 
          Cette page n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex justify-center gap-4">
          <Link to="/">
            <button className="flex items-center gap-2 bg-ucak-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-ucak-green transition-all shadow-lg">
              <Home size={20} /> Accueil
            </button>
          </Link>
          <Link to="/showroom">
            <button className="flex items-center gap-2 bg-white dark:bg-gray-800 text-ucak-blue dark:text-white border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
              <Search size={20} /> Explorer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}