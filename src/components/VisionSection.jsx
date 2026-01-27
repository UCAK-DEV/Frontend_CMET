import { ExternalLink, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import bannerImg from '../assets/images/banner.svg';

export default function VisionSection() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-white/5">
      <div className="container mx-auto max-w-4xl text-center">
        <span className="text-ucak-gold font-black text-xs uppercase tracking-[0.5em] block mb-8">Vision & Mission</span>
        <h2 className="text-3xl md:text-5xl font-black text-ucak-blue dark:text-white mb-10 leading-tight">La Dignité du Travail et la Maîtrise Technique</h2>
        <div className="prose dark:prose-invert prose-lg mx-auto text-gray-600 dark:text-gray-300 text-justify">
          <p>
            L'UFR des Métiers et Technologies (UFR MET) témoigne de la tradition islamique qui honore le travail qualifié et l'expertise technique comme des composantes essentielles d'une société florissante. Cette faculté, dédiée à l'enseignement des métiers émergents dont le Sénégal et l'Afrique ont besoin pour soutenir leur développement économique et social, incarne l'enseignement prophétique selon lequel « Allah aime que lorsque l'un d'entre vous fait quelque chose, il le perfectionne ».
          </p>
          <p>
            Cheikh Ahmadou Bamba Mbacke a souligné la sainteté du travail honnête, enseignant à ses disciples que « travailler de ses mains dans une profession licite est un acte d'adoration », élevant ainsi les compétences techniques d'une simple formation professionnelle à une pratique spirituelle. Le Prophète Muhammad (paix et salut sur lui) lui-même a travaillé comme berger et commerçant, démontrant qu'il n'y a aucune honte dans le travail manuel ou le commerce, ce sont plutôt des poursuites nobles lorsqu'elles sont menées avec intégrité et excellence.
          </p>
          <p>
            À travers ses cinq départements spécialisés, l'UFR MET prépare les étudiants non pas simplement à l'emploi mais à la responsabilité sacrée de construire leurs communautés et leurs nations.
          </p>
        </div>
      </div>
    </section>
  );
}
