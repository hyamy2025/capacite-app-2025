import { useState } from "react";
import { calculerStats } from "../utils/calculs";

export default function useTableauxState() {
  const [sallesTh, setSallesTh] = useState([]);
  const [sallesPr, setSallesPr] = useState([]);
  const [effectif, setEffectif] = useState([]);
  const [repartition, setRepartition] = useState([]);
  const [historique, setHistorique] = useState([]);

  const enregistrerEtat = () => {
    setHistorique((h) => [
      ...h,
      { sallesTh, sallesPr, effectif, repartition },
    ]);
  };

  const annuler = () => {
    const dernier = historique[historique.length - 1];
    if (dernier) {
      setSallesTh(dernier.sallesTh);
      setSallesPr(dernier.sallesPr);
      setEffectif(dernier.effectif);
      setRepartition(dernier.repartition);
      setHistorique(historique.slice(0, -1));
    }
  };

  const calculs = calculerStats(sallesTh, sallesPr, effectif, repartition);

  return {
    sallesTh,
    setSallesTh,
    sallesPr,
    setSallesPr,
    effectif,
    setEffectif,
    repartition,
    setRepartition,
    historique,
    enregistrerEtat,
    annuler,
    calculs,
  };
}
