import React from "react";
import {
  calculerMoyenneColonne,
  calculerSommeColonne,
} from "../utils/calculs";

export default function TableauRepartition({
  titre,
  repartition,
  setRepartition,
  effectif,
  enregistrerEtat,
}) {
  const modifier = (i, champ, val) => {
    enregistrerEtat();
    const copie = [...repartition];
    copie[i][champ] = val;
    setRepartition(copie);
  };

  const groupes = effectif.map((e) => parseInt(e.groupes || 0));
  const besoinsTheorique = repartition.map((r, i) => groupes[i] * parseFloat(r.besoinTheorique || 0));
  const besoinsPratique = repartition.map((r, i) => groupes[i] * parseFloat(r.besoinPratique || 0));

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800">{titre}</h2>

      <table className="mt-4">
        <thead>
          <tr>
            <th>Spécialité</th>
            <th>Besoin horaire (Théorique)<br /><span className="text-xs">(par groupe / par spécialité)</span></th>
            <th>Besoin horaire (Pratique)<br /><span className="text-xs">(par groupe / par spécialité)</span></th>
          </tr>
        </thead>
        <tbody>
          {repartition.map((r, i) => (
            <tr key={i}>
              <td>{effectif[i]?.nom || ""}</td>
              <td>
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={r.besoinTheorique}
                    onChange={(e) => modifier(i, "besoinTheorique", e.target.value)}
                    className="w-1/2"
                  />
                  <input
                    type="number"
                    value={besoinsTheorique[i]?.toFixed(2) || 0}
                    disabled
                    className="w-1/2 bg-gray-100"
                  />
                </div>
              </td>
              <td>
                <div className="flex gap-1">
                  <input
                    type="number"
                    value={r.besoinPratique}
                    onChange={(e) => modifier(i, "besoinPratique", e.target.value)}
                    className="w-1/2"
                  />
                  <input
                    type="number"
                    value={besoinsPratique[i]?.toFixed(2) || 0}
                    disabled
                    className="w-1/2 bg-gray-100"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-sm text-right mt-2 space-y-1">
        <p>Moyenne (Théorique / groupe) : <strong>{calculerMoyenneColonne(repartition.map(r => r.besoinTheorique))}</strong> h</p>
        <p>Somme (Théorique / spécialité) : <strong>{calculerSommeColonne(besoinsTheorique)}</strong> h</p>
        <p>Moyenne (Pratique / groupe) : <strong>{calculerMoyenneColonne(repartition.map(r => r.besoinPratique))}</strong> h</p>
        <p>Somme (Pratique / spécialité) : <strong>{calculerSommeColonne(besoinsPratique)}</strong> h</p>
      </div>
    </section>
  );
}
