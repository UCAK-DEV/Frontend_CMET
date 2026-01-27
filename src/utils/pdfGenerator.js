import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// --- CHARTE GRAPHIQUE UCAK ---
const COLORS = {
  BLUE: [0, 51, 102],    // Bleu Nuit #003366
  GOLD: [212, 175, 55],  // Or #D4AF37
  GREEN: [0, 138, 69],   // Vert #008A45
  GRAY: [128, 128, 128],
  LIGHT_BG: [245, 247, 250]
};

export const generateSyllabusPDF = (programTitle, description, curriculumData) => {
  try {
    // 1. Initialisation
    const doc = new jsPDF();

    // 2. EN-TÊTE (HEADER)
    // Bandeau Bleu
    doc.setFillColor(...COLORS.BLUE);
    doc.rect(0, 0, 210, 40, 'F');

    // Titre Principal
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text("UNIVERSITÉ CHEIKH AHMADOUL KHADIM", 105, 15, { align: 'center' });

    // Sous-titre (Programme)
    doc.setFontSize(14);
    doc.setTextColor(...COLORS.GOLD);
    doc.text(programTitle.toUpperCase(), 105, 25, { align: 'center' });

    // Description
    doc.setFontSize(10);
    doc.setTextColor(220, 220, 220);
    doc.setFont('helvetica', 'normal');
    doc.text(description, 105, 33, { align: 'center' });

    let finalY = 50;

    // 3. BOUCLE SUR LES ANNÉES
    curriculumData.forEach((year) => {
      
      // Titre de l'année (ex: LICENCE 1)
      doc.setFillColor(...COLORS.GREEN);
      doc.rect(14, finalY, 182, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(year.year ? year.year.toUpperCase() : "ANNÉE", 105, finalY + 5.5, { align: 'center' });
      
      finalY += 15;

      // Boucle sur les Semestres
      if (year.semesters && Array.isArray(year.semesters)) {
        year.semesters.forEach((sem) => {
          // Titre Semestre
          doc.setTextColor(...COLORS.BLUE);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          doc.text(`${sem.id || ''} - ${sem.title || ''}`, 14, finalY);
          
          // Crédits
          doc.setTextColor(...COLORS.GRAY);
          doc.setFontSize(9);
          doc.text("30 Crédits", 196, finalY, { align: 'right' });

          finalY += 3;

          // Préparation des données pour le tableau
          const tableBody = sem.courses ? sem.courses.map(course => [course]) : [];

          // Génération du tableau
          autoTable(doc, {
            startY: finalY,
            head: [['Unités d\'Enseignement (UE) & Modules']],
            body: tableBody,
            theme: 'grid',
            headStyles: { 
              fillColor: COLORS.BLUE, 
              textColor: 255, 
              fontStyle: 'bold',
              halign: 'left'
            },
            styles: { 
              fontSize: 9, 
              cellPadding: 3,
              textColor: 50
            },
            alternateRowStyles: {
              fillColor: COLORS.LIGHT_BG
            },
            margin: { left: 14, right: 14 },
          });

          finalY = doc.lastAutoTable.finalY + 12;
          
          // Saut de page si nécessaire
          if (finalY > 250) {
            doc.addPage();
            finalY = 20;
          }
        });
      }

      finalY += 5; // Espace entre années
    });

    // 4. PIED DE PAGE (FOOTER)
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.setDrawColor(200);
      doc.line(14, 285, 196, 285);
      doc.text(`Club MET - UFR Sciences & Technologies - ${new Date().getFullYear()}`, 14, 290);
      doc.text(`Page ${i} / ${pageCount}`, 196, 290, { align: 'right' });
    }

        // 5. SAUVEGARDE

        doc.save(`Syllabus_${programTitle.replace(/\s+/g, '_')}.pdf`);

    

      } catch (error) {

        console.error("Erreur génération PDF:", error);

        alert("Impossible de générer le PDF. Veuillez vérifier la console.");

      }

    };

    

    /**

     * GÉNÉRATEUR SPÉCIFIQUE INFORMATIQUE

     */

    export const generateITBrochure = () => {

      const data = [

        { year: "Licence 1", semesters: [{ id: "S1", title: "Fondamentaux", courses: ["Algorithmique & C", "Archi Ordinateurs", "Maths Analyse"] }, { id: "S2", title: "Web & Physique", courses: ["HTML/CSS", "Systèmes Exploitation", "Électronique"] }] },

        { year: "Licence 2", semesters: [{ id: "S3", title: "Infrastructures", courses: ["Réseaux TCP/IP", "Bases de Données", "Java POO"] }, { id: "S4", title: "Systèmes Avancés", courses: ["Admin Linux", "Théorie Signal", "Web Dynamique"] }] },

        { year: "Licence 3", semesters: [{ id: "S5", title: "Spécialisation", courses: ["Génie Logiciel", "Cloud Computing", "Sécurité"] }, { id: "S6", title: "Stage & PFE", courses: ["Projet Intégrateur", "Mémoire", "Soutenance"] }] }

      ];

      generateSyllabusPDF("Licence Informatique & Télécoms", "Brochure Officielle - UFR MET", data);

    };

    

    /**

     * GÉNÉRATEUR SPÉCIFIQUE HEC

     */

    export const generateHECBrochure = () => {

      const data = [

        { year: "Licence 1", semesters: [{ id: "S1", title: "Fondamentaux", courses: ["Droit Entreprise", "Maths Stats", "Comptabilité I"] }, { id: "S2", title: "Management", courses: ["Stratégie & GRH", "Marketing", "Comptabilité II"] }] },

        { year: "Licence 2", semesters: [{ id: "S3", title: "Comptabilité", courses: ["Compta Analytique", "Fiscalité I", "Éco Sénégal"] }, { id: "S4", title: "Finance", courses: ["Analyse Financière", "Logiciel SAARI", "Droit Affaires"] }] },

        { year: "Licence 3", semesters: [{ id: "S5", title: "Spécialisation", courses: ["Audit", "Contrôle Gestion", "Compta Sociétés"] }, { id: "S6", title: "Stage & PFE", courses: ["Business Plan", "Mémoire", "Soutenance"] }] }

      ];

      generateSyllabusPDF("Licence HEC", "Brochure Officielle - UFR MET", data);

    };

    