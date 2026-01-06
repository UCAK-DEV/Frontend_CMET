// src/data/resourcesData.js

export const resourcesData = [
  // --- INFORMATIQUE : LICENCE 1 ---
  {
    id: 'it-l1-algo',
    title: "Algorithmique & Langage C",
    department: "Informatique",
    level: "Licence 1",
    semester: "S1",
    description: "Les bases de la logique de programmation, structures de données et pointeurs.",
    // ⚠️ COLLET VOTRE LIEN DRIVE ICI (Dossier Algorithmique)
    driveLink: "https://drive.google.com/drive/folders/VOTRE_ID_DRIVE_ALGO", 
    // ID d'une playlist YouTube (ex: Pierre Giraud)
    youtubePlaylistId: "PLrSOXFDHBtfEh6PUExbzoYxvJOG3vYkPq", 
    stats: { docs: 12, videos: 24 },
    instructor: "Pr. Ndiaye"
  },
  {
    id: 'it-l1-archi',
    title: "Architecture des Ordinateurs",
    department: "Informatique",
    level: "Licence 1",
    semester: "S1",
    description: "Fonctionnement du processeur, assembleur, binaire et circuits logiques.",
    driveLink: "https://drive.google.com/drive/folders/VOTRE_ID_DRIVE_ARCHI",
    youtubePlaylistId: "PL20573059D89C6359", 
    stats: { docs: 8, videos: 12 },
    instructor: "Dr. Sow"
  },

  // --- INFORMATIQUE : LICENCE 2 ---
  {
    id: 'it-l2-web',
    title: "Développement Web (HTML/CSS)",
    department: "Informatique",
    level: "Licence 2",
    semester: "S3",
    description: "Création d'interfaces web modernes, flexbox, grid et responsive design.",
    driveLink: "#",
    youtubePlaylistId: "PLjwdMgw5TTLWOmK78JbX7Q15815a5Zk_0", 
    stats: { docs: 20, videos: 35 },
    instructor: "M. Diop"
  },
  {
    id: 'it-l2-sql',
    title: "Bases de Données (SQL)",
    department: "Informatique",
    level: "Licence 2",
    semester: "S3",
    description: "Modélisation Merise, algèbre relationnelle et requêtes SQL complexes.",
    driveLink: "#",
    youtubePlaylistId: "PLwLsbq8F8ZVA5n5e9yVf8xYJ9xJ9xJ9xJ", 
    stats: { docs: 15, videos: 18 },
    instructor: "Mme. Fall"
  },

  // --- HEC : LICENCE 1 ---
  {
    id: 'hec-l1-compta',
    title: "Comptabilité Générale",
    department: "HEC",
    level: "Licence 1",
    semester: "S1",
    description: "Principes comptables, bilan, compte de résultat et opérations courantes.",
    driveLink: "#",
    youtubePlaylistId: "PLwLsbq8F8ZVA5n5e9yVf8xYJ9xJ9xJ9xJ", // Exemple playlist
    stats: { docs: 18, videos: 20 },
    instructor: "Dr. Ba"
  }
];