import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import TableauSalles from "../components/TableauSalles";
import TableauEffectif from "../components/TableauEffectif";
import TableauRepartition from "../components/TableauRepartition";
import TableauResultat from "../components/TableauResultat";
import { genererPDF } from "../utils/generatePDF";
import useTableauxState from "../hooks/useTableauxState";

export default function TDA() {
  const router = useRouter();

  const {
    sallesTh, setSallesTh,
    sallesPr, setSallesPr,
    effectif, setEffectif,
    repartition, setRepartition,
    historique, enregistrerEtat, annuler,
    calculs,
  } = useTableauxState();

  return (
    <>
      <Head>
        <title>Test de dépassement actuel</title>
      </Head>
      <main className="p-4 space-y-8">
        <TableauSalles
          titre="Salles Théoriques"
          salles={sallesTh}
          setSalles={setSallesTh}
          enregistrerEtat={enregistrerEtat}
        />
        <TableauSalles
          titre="Salles Pratiques"
          salles={sallesPr}
          setSalles={setSallesPr}
          enregistrerEtat={enregistrerEtat}
        />
        <TableauEffectif
          titre="Effectif Actuel"
          effectif={effectif}
          setEffectif={setEffectif}
          ajouterLigne={() =>
            setEffectif([
              ...effectif,
              { nom: "", session: "Mars 2023", groupes: "", apprenants: "" },
            ])
          }
          enregistrerEtat={enregistrerEtat}
        />
        <TableauRepartition
          titre="Répartition actuelle des heures"
          repartition={repartition}
          setRepartition={setRepartition}
          effectif={effectif}
          enregistrerEtat={enregistrerEtat}
        />
        <TableauResultat
          heuresDisponiblesTh={calculs.heuresTh}
          heuresDisponiblesPr={calculs.heuresPr}
          besoinsTh={calculs.besoinsTh}
          besoinsPr={calculs.besoinsPr}
          surfaceMoyenneTh={calculs.surfaceTh}
          surfaceMoyennePr={calculs.surfacePr}
          nbSallesTh={sallesTh.length}
          nbSallesPr={sallesPr.length}
        />

        <div className="flex justify-between mt-8">
          <button className="nav" onClick={() => router.push("/")}>← Accueil</button>
          <div className="space-x-2">
            <button className="cancel" onClick={annuler}>Annuler</button>
            <button className="add" onClick={genererPDF}>Télécharger PDF</button>
          </div>
        </div>
      </main>
    </>
  );
}
