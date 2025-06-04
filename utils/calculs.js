export const calculerSurfacePedagogique = (surface, cno) => {
  if (!surface || !cno) return 0;
  const result = surface / cno;
  return result <= 26 ? result : 26;
};

export const calculerHeuresDisponibles = (semaines) => {
  const heuresParSemaine = 56;
  return semaines ? semaines * heuresParSemaine : 0;
};

export const calculerMoyenneColonne = (donnees, champ) => {
  const valeurs = donnees.map((item) => parseFloat(item[champ]) || 0);
  const total = valeurs.reduce((acc, val) => acc + val, 0);
  return valeurs.length ? (total / valeurs.length).toFixed(2) : 0;
};

export const calculerSommeColonne = (donnees, champ) => {
  return donnees
    .map((item) => parseFloat(item[champ]) || 0)
    .reduce((acc, val) => acc + val, 0);
};

export const calculerSommeColonneImbriquee = (donnees, champParent, champFils) => {
  return donnees
    .map((item) => parseFloat(item[champParent]?.[champFils]) || 0)
    .reduce((acc, val) => acc + val, 0);
};

export const calculerMoyenneColonneImbriquee = (donnees, champParent, champFils) => {
  const valeurs = donnees.map((item) => parseFloat(item[champParent]?.[champFils]) || 0);
  const total = valeurs.reduce((acc, val) => acc + val, 0);
  return valeurs.length ? (total / valeurs.length).toFixed(2) : 0;
};

export const analyserResultat = (heuresDisponibles, heuresNecessaires, heuresParApprenant, totalSalles) => {
  const ecart = heuresDisponibles - heuresNecessaires;
  const apprenants = heuresParApprenant > 0 && totalSalles > 0
    ? Math.floor((ecart / heuresParApprenant) * totalSalles)
    : 0;
  const type = ecart >= 0 ? "Excédent" : "Dépassement";
  return { ecart, apprenants, type };
};

export const calculerBesoinParFiliere = (besoinUnitaire, nombreGroupes) => {
  return besoinUnitaire * nombreGroupes;
};


