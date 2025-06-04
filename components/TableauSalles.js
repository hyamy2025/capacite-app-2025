import React, { useEffect, useState } from "react";
import { calculerSurfacePedagogique, calculerHeuresDisponibles, calculerMoyenneColonne, calculerSommeColonne } from "../utils/calculs";

export default function TableauSalles({ titre, salles, setSalles, enregistrerEtat }) {
  const [cnoGlobal, setCnoGlobal] = useState("1.5");
  const [semainesGlobal, setSemainesGlobal] = useState("40");

  const ajouterSalle = () => {
    enregistrerEtat();
    const nouvelleSalle = {
      surface: "",
      cno: cnoGlobal,
      semaines: semainesGlobal,
    };
    setSalles([...salles, nouvelleSalle]);
  };

  const retirerDerniere = () => {
    enregistrerEtat();
    const copie = [...salles];
    copie.pop();
    setSalles(copie);
  };

  const modifierValeur = (index, champ, valeur) => {
    enregistrerEtat();
    const copie = [...salles];
    copie[index][champ] = valeur;
    setSalles(copie);
  };

  const surfaces = salles.map((s) => calculerSurfacePedagogique(s.surface, s.cno));
  const heures = salles.map((s) => calculerHeuresDisponibles(s.semaines));

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800">{titre}</h2>

      <div className="flex gap-4">
        <div>
          <label className="block text-sm">CNO (toutes les salles)</label>
          <select
            className="border rounded px-2 py-1"
            value={cnoGlobal}
            onChange={(e) => setCnoGlobal(e.target.value)}
          >
            {[...Array(10)].map((_, i) => {
              const val = (1.1 + i * 0.1).toFixed(1);
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm">Semaines (toutes les salles)</label>
          <input
            type="number"
            className="border rounded px-2 py-1 w-24"
            value={semainesGlobal}
            onChange={(e) => setSemainesGlobal(e.target.value)}
          />
        </div>
      </div>

      <table className="mt-4">
        <thead>
          <tr>
            <th>Code Salle</th>
            <th>Surface (m²)</th>
            <th>CNO</th>
            <th>Surface pédagogique</th>
            <th>Semaines</th>
            <th>Heures disponibles</th>
          </tr>
        </thead>
        <tbody>
          {salles.map((salle, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="number"
                  value={salle.surface}
                  onChange={(e) => modifierValeur(index, "surface", e.target.value)}
                />
              </td>
              <td>{salle.cno}</td>
              <td>{calculerSurfacePedagogique(salle.surface, salle.cno).toFixed(2)}</td>
              <td>{salle.semaines}</td>
              <td>{calculerHeuresDisponibles(salle.semaines).toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-sm text-right mt-2 space-y-1">
        <p>Moyenne Surface pédagogique : <strong>{calculerMoyenneColonne(surfaces)}</strong> m²</p>
        <p>Total Heures disponibles : <strong>{calculerSommeColonne(heures)}</strong> h</p>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button onClick={ajouterSalle} className="add">Ajouter salle</button>
        <button onClick={retirerDerniere} className="cancel">Annuler</button>
      </div>

      <footer className="note">
        <p>
          CNO : Coefficient Normatif d'Occupation – Surface pédagogique = Surface / CNO (max 26)
        </p>
      </footer>
    </section>
  );
}
