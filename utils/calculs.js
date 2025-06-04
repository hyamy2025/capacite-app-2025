export function calculerSurfacePedagogique(surface, cno) {
  const s = parseFloat(surface || 0);
  const c = parseFloat(cno || 1);
  if (c === 0) return 0;
  const resultat = s / c;
  return resultat <= 26 ? resultat : 26;
}

export function calculerHeuresDisponibles(semaines) {
  return 56 * parseFloat(semaines || 0);
}

export function calculerMoyenneColonne(valeurs) {
  const valides = valeurs.map((v) => parseFloat(v || 0));
  const total = valides.reduce((a, b) => a + b, 0);
  return valides.length ? (total / valides.length).toFixed(2) : "0.00";
}

export function calculerSommeColonne(valeurs) {
  return valeurs
    .map((v) => parseFloat(v || 0))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
}

export function analyserResultat(heuresDisponibles, heuresBesoins, surfaceMoyenne, totalSalles) {
  const reste = heuresDisponibles - heuresBesoins;
  const apprenants =
    heuresBesoins > 0 && surfaceMoyenne > 0
      ? ((reste / heuresBesoins) * totalSalles * surfaceMoyenne).toFixed(0)
      : 0;
  const statut = reste >= 0 ? "Excédent" : "Dépassement";
  return { reste: reste.toFixed(2), apprenants, statut };
}