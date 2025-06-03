export const surfaceMaximale = (superficie, cno) => {
  const s = parseFloat(superficie || 0);
  const c = parseFloat(cno || 1);
  return s * c;
};

export const heuresDisponibles = (semaines) => {
  const s = parseInt(semaines || 0);
  return 56 * s;
};

export const moyenne = (valeurs) => {
  if (!valeurs.length) return 0;
  const total = valeurs.reduce((acc, val) => acc + parseFloat(val || 0), 0);
  return total / valeurs.length;
};

export const somme = (valeurs) => {
  return valeurs.reduce((acc, val) => acc + parseFloat(val || 0), 0);
};

export const verdict = (valeur) => {
  const v = parseFloat(valeur || 0);
  return v >= 0 ? 'Excédent' : 'Dépassement';
};

export const couleur = (valeur) => {
  const v = parseFloat(valeur || 0);
  return v >= 0 ? 'text-green-700' : 'text-red-700';
};

export const calculTotalApprenantsAjoutes = (groupesAjoutes, capaciteMoyenne) => {
  const g = parseInt(groupesAjoutes || 0);
  const c = parseFloat(capaciteMoyenne || 0);
  return g * c;
};