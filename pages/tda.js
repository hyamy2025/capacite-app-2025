import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import TableTitre from '../components/TableTitre';
import LigneSaisieSalle from '../components/LigneSaisieSalle';
import BoutonNavigation from '../components/BoutonNavigation';
import {
  surfaceMaximale,
  heuresDisponibles,
  moyenne,
  somme,
  verdict,
  couleur
} from '../utils/calculs';

export default function TDA() {
  const [undoStack, setUndoStack] = useState([]);
  const [sallesTh, setSallesTh] = useState([{ superficie: '', cno: 1.1, semaines: '' }]);
  const [sallesPr, setSallesPr] = useState([{ superficie: '', cno: 1.1, semaines: '' }]);
  const [specialites, setSpecialites] = useState([{ nom: '', groupes: '', apprenants: '', th: '', pr: '' }]);

  const sauvegarder = () => setUndoStack([...undoStack, { sallesTh, sallesPr, specialites }]);
  const annulerDernier = () => {
    const dernier = undoStack.pop();
    if (dernier) {
      setSallesTh(dernier.sallesTh);
      setSallesPr(dernier.sallesPr);
      setSpecialites(dernier.specialites);
      setUndoStack([...undoStack]);
    }
  };
  useEffect(() => sauvegarder(), [sallesTh, sallesPr, specialites]);

  const updateSalle = (type, index, updated) => {
    const target = type === 'th' ? sallesTh : sallesPr;
    const setter = type === 'th' ? setSallesTh : setSallesPr;
    const updatedList = [...target];
    updatedList[index] = updated;
    setter(updatedList);
  };

  const addSalle = (type) => {
    const setter = type === 'th' ? setSallesTh : setSallesPr;
    setter(prev => [...prev, { superficie: '', cno: 1.1, semaines: '' }]);
  };

  const totalHeuresTh = somme(sallesTh.map(s => heuresDisponibles(s.semaines)));
  const totalHeuresPr = somme(sallesPr.map(s => heuresDisponibles(s.semaines)));
  const totalBesoinTh = somme(specialites.map(s => parseFloat(s.th || 0) * parseInt(s.groupes || 0)));
  const totalBesoinPr = somme(specialites.map(s => parseFloat(s.pr || 0) * parseInt(s.groupes || 0)));
  const deltaTh = totalHeuresTh - totalBesoinTh;
  const deltaPr = totalHeuresPr - totalBesoinPr;
  const testGlobal = () => (deltaTh >= 0 && deltaPr >= 0 ? 'Excédent' : 'Dépassement');

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Rapport TDA", 10, 10);
    doc.text(`Résultat Global: ${testGlobal()}`, 10, 20);
    autoTable(doc, {
      head: [['Test', 'Heures', 'Verdict']],
      body: [
        ['Théorique', deltaTh.toFixed(2), verdict(deltaTh)],
        ['Pratique', deltaPr.toFixed(2), verdict(deltaPr)]
      ]
    });
    doc.save("resultat-tda.pdf");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Test de Dépassement Actuel (TDA)</h1>

      <TableTitre titre="Salles Théoriques" />
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Superficie</th>
            <th className="border px-2 py-1">CNO</th>
            <th className="border px-2 py-1">Surface max</th>
            <th className="border px-2 py-1">Semaines</th>
            <th className="border px-2 py-1">Heures max</th>
          </tr>
        </thead>
        <tbody>
          {sallesTh.map((salle, i) => (
            <LigneSaisieSalle
              key={i}
              salle={salle}
              index={i}
              onChange={(idx, updated) => updateSalle('th', idx, updated)}
            />
          ))}
        </tbody>
      </table>
      <button onClick={() => addSalle('th')} className="bg-blue-600 text-white px-4 py-1 rounded mb-6">Ajouter Salle</button>

      <TableTitre titre="Salles Pratiques" />
      <table className="w-full border mb-4">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Superficie</th>
            <th className="border px-2 py-1">CNO</th>
            <th className="border px-2 py-1">Surface max</th>
            <th className="border px-2 py-1">Semaines</th>
            <th className="border px-2 py-1">Heures max</th>
          </tr>
        </thead>
        <tbody>
          {sallesPr.map((salle, i) => (
            <LigneSaisieSalle
              key={i}
              salle={salle}
              index={i}
              onChange={(idx, updated) => updateSalle('pr', idx, updated)}
            />
          ))}
        </tbody>
      </table>
      <button onClick={() => addSalle('pr')} className="bg-green-600 text-white px-4 py-1 rounded mb-6">Ajouter Salle</button>

      <TableTitre titre="Résultat" />
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Heures</th>
            <th className="border px-2 py-1">Verdict</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Salles Théoriques</td>
            <td className="border px-2 py-1">{deltaTh.toFixed(2)}</td>
            <td className={`border px-2 py-1 font-semibold ${couleur(deltaTh)}`}>{verdict(deltaTh)}</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Salles Pratiques</td>
            <td className="border px-2 py-1">{deltaPr.toFixed(2)}</td>
            <td className={`border px-2 py-1 font-semibold ${couleur(deltaPr)}`}>{verdict(deltaPr)}</td>
          </tr>
          <tr>
            <td colSpan="2" className="border px-2 py-1 font-bold text-right">Test Global</td>
            <td className={`border px-2 py-1 font-bold ${testGlobal() === 'Excédent' ? 'text-green-700' : 'text-red-700'}`}>{testGlobal()}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-4 mt-6">
        <button onClick={exportPDF} className="bg-blue-600 text-white px-4 py-2 rounded">Télécharger PDF</button>
        <button onClick={annulerDernier} className="bg-yellow-500 text-white px-4 py-2 rounded">Annuler</button>
        <BoutonNavigation href="/" label="← Retour Accueil" couleur="gray" />
      </div>
    </div>
  );
}