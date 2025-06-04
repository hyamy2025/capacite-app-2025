import React from "react";
import TableauSalles from "../components/TableauSalles";
import TableauEffectif from "../components/TableauEffectif";
import TableauRepartition from "../components/TableauRepartition";
import TableauResultat from "../components/TableauResultats";
import { genererPDF } from "../components/generatePDF";
import useTableauxState from "../hooks/useTableauxState";

export default function TDA() {
  const {
    sallesTh,
    setSallesTh,
    sallesPr,
    setSallesPr,
    effectif,
    setEffectif,
    repartition,
    setRepartition,
    enregistrerEtat,
    annuler,
    calculs,
  } = useTableauxState();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-900">
        Test de Dépassement Actuel
      </h1>

      <TableauSalles
        type="théorique"
        salles={sallesTh}
        setSalles={setSallesTh}
        enregistrerEtat={enregistrerEtat}
        annuler={annuler}
      />
      <TableauSalles
        type="pratique"
        salles={sallesPr}
        setSalles={setSallesPr}
        enregistrerEtat={enregistrerEtat}
        annuler={annuler}
      />
      <TableauEffectif
        effectif={effectif}
        setEffectif={setEffectif}
        enregistrerEtat={enregistrerEtat}
        annuler={annuler}
      />
      <TableauRepartition
        effectif={effectif}
        repartition={repartition}
        setRepartition={setRepartition}
        enregistrerEtat={enregistrerEtat}
        annuler={annuler}
      />
      <TableauResultat {...calculs} />

      <div className="flex justify-between mt-6">
        <button
          onClick={genererPDF}
          className="bg-green-600 text-white py-2 px-4 rounded shadow"
        >
          Télécharger en PDF
        </button>
        <a
          href="/"
          className="bg-gray-600 text-white py-2 px-4 rounded shadow"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
