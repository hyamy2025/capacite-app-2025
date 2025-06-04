import React from "react";
import { analyserResultat } from "../utils/calculs";

export default function TableauResultat({
  heuresDisponiblesTh,
  heuresDisponiblesPr,
  besoinsTh,
  besoinsPr,
  surfaceMoyenneTh,
  surfaceMoyennePr,
  nbSallesTh,
  nbSallesPr,
}) {
  const resultatTh = analyserResultat(
    heuresDisponiblesTh,
    besoinsTh,
    surfaceMoyenneTh,
    nbSallesTh
  );
  const resultatPr = analyserResultat(
    heuresDisponiblesPr,
    besoinsPr,
    surfaceMoyennePr,
    nbSallesPr
  );

  const globalStatut =
    resultatTh.statut === "Excédent" && resultatPr.statut === "Excédent"
      ? "Excédent"
      : "Dépassement";

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800">Résultat Global</h2>

      <table className="mt-4">
        <thead>
          <tr>
            <th>Test Salles Théoriques</th>
            <th>Test Salles Pratiques</th>
            <th>Test Global</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Heures : <strong>{resultatTh.reste}</strong> h<br />
              Apprenants supp. : <strong>{resultatTh.apprenants}</strong><br />
              <span className={`font-bold ${resultatTh.statut === "Excédent" ? "text-green-600" : "text-red-600"}`}>
                {resultatTh.statut}
              </span>
            </td>
            <td>
              Heures : <strong>{resultatPr.reste}</strong> h<br />
              Apprenants supp. : <strong>{resultatPr.apprenants}</strong><br />
              <span className={`font-bold ${resultatPr.statut === "Excédent" ? "text-green-600" : "text-red-600"}`}>
                {resultatPr.statut}
              </span>
            </td>
            <td className="text-xl font-bold">
              <span className={globalStatut === "Excédent" ? "text-green-700" : "text-red-700"}>
                {globalStatut}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
