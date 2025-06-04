import React from "react";

export default function TableauEffectif({ titre, effectif, setEffectif, ajouterLigne, enregistrerEtat }) {
  const modifier = (i, champ, val) => {
    enregistrerEtat();
    const copie = [...effectif];
    copie[i][champ] = val;
    setEffectif(copie);
  };

  const calculerSomme = (champ) =>
    effectif.reduce((acc, e) => acc + parseInt(e[champ] || 0), 0);

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-800">{titre}</h2>

      <table className="mt-4">
        <thead>
          <tr>
            <th>Spécialité</th>
            <th>Session de formation</th>
            <th>Nb. groupes</th>
            <th>Nb. apprenants</th>
          </tr>
        </thead>
        <tbody>
          {effectif.map((e, i) => (
            <tr key={i}>
              <td>
                <input
                  value={e.nom}
                  onChange={(ev) => modifier(i, "nom", ev.target.value)}
                />
              </td>
              <td>
                <select
                  value={e.session}
                  onChange={(ev) => modifier(i, "session", ev.target.value)}
                >
                  {[
                    "Mars 2023", "Octobre 2023", "Mars 2024", "Octobre 2024",
                    "Mars 2025", "Octobre 2025", "Mars 2026", "Octobre 2026",
                    "Mars 2027", "Octobre 2027", "Mars 2028", "Octobre 2028",
                    "Mars 2029", "Octobre 2029", "Mars 2030", "Octobre 2030"
                  ].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="number"
                  value={e.groupes}
                  onChange={(ev) => modifier(i, "groupes", ev.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={e.apprenants}
                  onChange={(ev) => modifier(i, "apprenants", ev.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-sm text-right mt-2 space-y-1">
        <p>Total groupes : <strong>{calculerSomme("groupes")}</strong></p>
        <p>Total apprenants : <strong>{calculerSomme("apprenants")}</strong></p>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button className="add" onClick={ajouterLigne}>Ajouter spécialité</button>
      </div>
    </section>
  );
}
