import jsPDF from 'jspdf';
import 'jspdf-autotable';

// --- CONFIGURATION DESIGN (CHARTE UCAK) ---
const COLORS = {
  BLUE: [15, 23, 42],     // #0f172a (Bleu Nuit Profond)
  GOLD: [202, 138, 4],    // #ca8a04 (Or)
  GREEN: [22, 163, 74],   // #16a34a (Vert)
  PURPLE: [88, 28, 135],  // #581c87 (Violet HEC)
  GRAY: [100, 116, 139],
  LIGHT_BG: [248, 250, 252]
};

// --- FONCTIONS UTILITAIRES ---

// En-tête officiel avec Logo (simulé par texte) et Titres
const addHeader = (doc, department, title) => {
  const pageWidth = doc.internal.pageSize.width;
  
  // Fond En-tête
  doc.setFillColor(...COLORS.BLUE);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Titre Université
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text("UNIVERSITÉ CHEIKH AHMADOUL KHADIM", pageWidth / 2, 15, { align: 'center' });
  
  // Département
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(department.toUpperCase(), pageWidth / 2, 22, { align: 'center' });

  // Titre Formation (Or)
  doc.setTextColor(...COLORS.GOLD);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(title.toUpperCase(), pageWidth / 2, 32, { align: 'center' });

  // Ligne décorative
  doc.setDrawColor(...COLORS.GREEN);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 40, 38, pageWidth / 2 + 40, 38);

  return 55; // Retourne la position Y pour commencer le contenu
};

// Pied de page (Numérotation + Copyright)
const addFooter = (doc) => {
  const pageCount = doc.internal.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    // Fond pied de page
    doc.setFillColor(...COLORS.LIGHT_BG);
    doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
    
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.GRAY);
    doc.text(`Brochure Officielle 2025-2026 • Club MET • Page ${i} / ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    doc.text("Document généré via la Plateforme Numérique UCAK", pageWidth / 2, pageHeight - 6, { align: 'center' });
  }
};

// --- GÉNÉRATEUR INFORMATIQUE (Source: Maquettes & Débouchés.pdf) ---
export const generateITBrochure = () => {
  const doc = new jsPDF();
  let y = addHeader(doc, "UFR Métiers & Technologies (UFR MET)", "Licence Informatique & Télécommunications");

  // 1. PRÉSENTATION & OBJECTIFS
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.BLUE);
  doc.setFontSize(12);
  doc.text("Vision & Objectifs", 14, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  const visionText = "Cette formation vise à former des experts capables de concevoir, déployer et sécuriser les infrastructures numériques de demain. Elle allie une base solide en développement logiciel (Web, Mobile) à une expertise pointue en Réseaux, Télécoms et Cybersécurité. Le programme répond aux besoins de transformation numérique du Sénégal.";
  doc.text(doc.splitTextToSize(visionText, 180), 14, y + 6);
  y += 25;

  // 2. PROGRAMME ACADÉMIQUE (Tableau)
  doc.autoTable({
    startY: y,
    head: [['Niveau', 'Semestre', 'Unités d\'Enseignement (UE) Clés', 'Crédits']],
    body: [
      // L1
      ['L1', 'S1', 'Algorithmique & C, Archi Ordinateurs, Maths Analyse, Électricité', '30'],
      ['L1', 'S2', 'Dév Web (HTML/CSS), Systèmes OS, Électronique, Physique Ondes', '30'],
      // L2
      ['L2', 'S3', 'Réseaux TCP/IP, Bases de Données (SQL), Java POO, Marketing', '30'],
      ['L2', 'S4', 'Admin Linux, Théorie Signal, Web Dynamique (PHP), Droit Info', '30'],
      // L3 (Tronc commun + Spécialités)
      ['L3', 'S5 (DAR)', 'Génie Logiciel, Java EE, Mobile (Android/iOS), Cloud Computing', '30'],
      ['L3', 'S5 (ASR)', 'Admin Windows Server, Sécurité Réseaux, Crypto, Audit SI', '30'],
      ['L3', 'S5 (RT)', 'Réseaux Mobiles (4G/5G), Fibre Optique, VoIP, IoT', '30'],
      ['L3', 'S6', 'Projet de Fin d\'Études (PFE) + Stage Obligatoire (3 mois)', '30'],
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.BLUE, textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: COLORS.LIGHT_BG },
    styles: { fontSize: 8, cellPadding: 3 }
  });

  y = doc.lastAutoTable.finalY + 10;

  // 3. INFRASTRUCTURES & ÉVALUATIONS (Blocs côte à côte)
  const pageWidth = doc.internal.pageSize.width;
  
  // Bloc Laboratoires
  doc.setFillColor(240, 253, 244); // Vert très clair
  doc.roundedRect(14, y, pageWidth/2 - 20, 45, 3, 3, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.GREEN);
  doc.text("Laboratoires & Équipements", 20, y + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(0,0,0);
  doc.text("• Réseaux: Switchs/Routeurs Cisco, Fortinet", 20, y + 16);
  doc.text("• Télécoms: Fibre Optique (OTDR), Antennes", 20, y + 22);
  doc.text("• Info: Virtualisation (VMware), Serveurs", 20, y + 28);
  doc.text("• Partenaires: Orange, Free, ESN", 20, y + 34);

  // Bloc Évaluation
  doc.setFillColor(254, 252, 232); // Jaune très clair
  doc.roundedRect(pageWidth/2 + 6, y, pageWidth/2 - 20, 45, 3, 3, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.GOLD);
  doc.text("Modalités d'Évaluation", pageWidth/2 + 12, y + 8);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(0,0,0);
  doc.text("• Contrôle Continu (CC): 40-50%", pageWidth/2 + 12, y + 16);
  doc.text("• Examens Terminaux (ET): 50-60%", pageWidth/2 + 12, y + 22);
  doc.text("• Validation: Moyenne >= 10/20", pageWidth/2 + 12, y + 28);
  doc.text("• PFE: Mémoire + Démo technique", pageWidth/2 + 12, y + 34);

  addFooter(doc);
  doc.save('Maquette_Informatique_UCAK.pdf');
};

// --- GÉNÉRATEUR HEC (Source: Presentation HEC CCAK Touba.docx) ---
export const generateHECBrochure = () => {
  const doc = new jsPDF();
  let y = addHeader(doc, "HEC TOUBA - CCAK", "Hautes Études Commerciales");

  // 1. CONTEXTE & OBJECTIFS
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.PURPLE);
  doc.setFontSize(12);
  doc.text("Excellence Managériale", 14, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  const introText = "Dans un souci de démocratisation de l'élite, HEC Touba forme des managers responsables. Notre modèle s'appuie sur l'excellence académique, la responsabilité et l'ouverture internationale. La formation offre deux options stratégiques en L3 : Comptabilité & Contrôle de Gestion (CCG) et Entrepreneuriat & Création d'Entreprise (ECE).";
  doc.text(doc.splitTextToSize(introText, 180), 14, y + 6);
  y += 20;

  // 2. CURRICULUM DÉTAILLÉ
  doc.autoTable({
    startY: y,
    head: [['Année', 'Semestre', 'Modules Principaux', 'Crédits']],
    body: [
      ['L1', 'S1', 'Droit & Éco, Maths Stats, Compta Générale I, Anglais, Info', '30'],
      ['L1', 'S2', 'Stratégie & GRH, Maths Fi, Compta II, Marketing, Culture G.', '30'],
      ['L2', 'S3', 'Compta Analytique, Info Gestion, Fiscalité I, Éco Sénégal', '30'],
      ['L2', 'S4', 'Analyse Financière, Fiscalité II, Logiciel SAARI, Droit II', '30'],
      // Options L3
      ['L3', 'S5 (CCG)', 'Compta Approfondie, Audit, Contrôle Gestion, Compta Sociétés', '30'],
      ['L3', 'S5 (ECE)', 'Création Entreprise, Incubateur, Marketing, Gestion Projet', '30'],
      ['L3', 'S6', 'Stage de fin de cycle (Mémoire) + Soutenance', '30'],
    ],
    theme: 'grid',
    headStyles: { fillColor: COLORS.PURPLE, textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: COLORS.LIGHT_BG },
    styles: { fontSize: 8, cellPadding: 3 }
  });

  y = doc.lastAutoTable.finalY + 10;

  // 3. ADMISSION & MENTIONS (Détails Complets du Document)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0,0,0);
  doc.text("Conditions d'Admission & Système de Mentions", 14, y);
  y += 5;

  const mentionData = [
    ['Admission', 'Baccalauréat Séries L2, S1, S2, G ou équivalent (Validation commission)'],
    ['Mention Passable', 'Note moyenne entre 10 et 11.99 / 20'],
    ['Mention Assez Bien', 'Note moyenne entre 12 et 13.99 / 20'],
    ['Mention Bien', 'Note moyenne entre 14 et 15.99 / 20'],
    ['Mention Très Bien', 'Note moyenne supérieure ou égale à 16 / 20'],
  ];

  doc.autoTable({
    startY: y,
    body: mentionData,
    theme: 'striped',
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50, textColor: COLORS.PURPLE } }
  });

  addFooter(doc);
  doc.save('Maquette_HEC_Touba.pdf');
};