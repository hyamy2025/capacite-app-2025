export function calculSurfacePedagogique(surface, cno) {
  if (!surface || !cno || isNaN(surface) || isNaN(cno)) return 0;
  const result = surface / cno;
  return result <= 26 ? result : 26;
}

export function calculerNombreHeures(semaine) {
  if (!semaine || isNaN(semaine)) return 0;
  return 56 * semaine;
}

export function moyenneSurfacePedagogique(salles) {
  const surfaces = salles.map((salle) =>
    calculSurfacePedagogique(salle.surface, salle.cno)
  );
  const total = surfaces.reduce((sum, val) => sum + val, 0);
  return salles.length ? total / salles.length : 0;
}

export function totalHeuresDisponibles(salles) {
  return salles.reduce((sum, salle) => sum + (salle.heures || 0), 0);
}

export function moyenneHoraireBesoin(array, key) {
  const valeurs = array.map((e) => e[key] || 0);
  const total = valeurs.reduce((sum, val) => sum + val, 0);
  return array.length ? total / array.length : 0;
}

export function totalHoraireBesoin(array, key) {
  return array.reduce((sum, e) => sum + (e[key] || 0), 0);
}

export function calculerStats(sallesTh, sallesPr, effectif, repartition) {
  const heuresTh = totalHeuresDisponibles(sallesTh);
  const heuresPr = totalHeuresDisponibles(sallesPr);
  const besoinTh = totalHoraireBesoin(repartition, "besoinThTotal");
  const besoinPr = totalHoraireBesoin(repartition, "besoinPrTotal");

  const ecartTh = heuresTh - besoinTh;
  const ecartPr = heuresPr - besoinPr;

  const apprenantsTh =
    besoinTh > 0
      ? Math.floor((ecartTh / moyenneHoraireBesoin(repartition, "besoinTh")) *
          moyenneSurfacePedagogique(sallesTh))
      : 0;

  const apprenantsPr =
    besoinPr > 0
      ? Math.floor((ecartPr / moyenneHoraireBesoin(repartition, "besoinPr")) *
          moyenneSurfacePedagogique(sallesPr))
      : 0;

  const testTh = ecartTh >= 0 ? "Excédent" : "Dépassement";
  const testPr = ecartPr >= 0 ? "Excédent" : "Dépassement";
  const testGlobal = testTh === "Excédent" && testPr === "Excédent"
    ? "Excédent"
    : "Dépassement";

  return {
    heuresTheoriques: ecartTh,
    heuresPratiques: ecartPr,
    apprenantsTheoriques: apprenantsTh,
    apprenantsPratiques: apprenantsPr,
    testTheorique: testTh,
    testPratique: testPr,
    testGlobal
  };
}
