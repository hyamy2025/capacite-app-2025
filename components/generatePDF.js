import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function genererPDF() {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Diagnostic de la Capacité d’Accueil", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.text("Ce rapport résume les données actuelles/prévues concernant :", 20, 30);
  doc.text("- Les salles disponibles (théoriques/pratiques)", 25, 38);
  doc.text("- L'effectif des spécialités", 25, 45);
  doc.text("- La répartition horaire et la capacité d’accueil", 25, 52);

  autoTable(doc, {
    startY: 60,
    head: [["Catégorie", "Valeur estimée"]],
    body: [
      ["Heures disponibles théoriques", "..."],
      ["Heures nécessaires théoriques", "..."],
      ["Excédent / Dépassement théorique", "..."],
      ["Heures disponibles pratiques", "..."],
      ["Heures nécessaires pratiques", "..."],
      ["Excédent / Dépassement pratique", "..."],
      ["Test Global", "..."],
    ],
  });

  doc.setFontSize(10);
  doc.text("Document généré automatiquement - Ne nécessite pas de signature", 20, doc.internal.pageSize.height - 10);

  doc.save("rapport-capacite.pdf");
}
