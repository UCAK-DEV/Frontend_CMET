/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ucak: {
          green: '#008A45', // Vert UCAK
          blue: '#003366',  // Bleu UCAK (utilisé pour le texte en mode clair)
          gold: '#D4AF37',  // Doré Excellence
          light: '#F8FAFC', // Fond clair
          // NOUVELLES COULEURS POUR LE MODE SOMBRE PROFOND
          dark: '#0A0F1C',       // Bleu nuit très profond (presque noir) pour le fond
          'dark-card': '#111827', // Bleu nuit légèrement plus clair pour les cartes
          'dark-hover': '#1F2937' // Pour les survols
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      // Ajout d'une animation de "lueur" pour le côté spirituel/tech
      animation: {
        'glow-pulse': 'glow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      }
    },
  },
  plugins: [],
}