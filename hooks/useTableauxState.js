import { useState, useEffect } from "react";
import { calculSurfacePedagogique, calculerNombreHeures, calculerStats } from "../utils/calculs";

const defaultSemaines = 40;
const defaultCNO = 1.4;

export function useTableauxState(initialState) {
  const [tableaux, setTableaux] = useState(() => {
    const saved = localStorage.getItem("capacite-data");
    return saved ? JSON.parse(saved) : initialState;
  });

  const [history, setHistory] = useState([]);

  useEffect(() => {
    localStorage.setItem("capacite-data", JSON.stringify(tableaux));
  }, [tableaux]);

  const undo = () => {
    if (history.length > 0) {
      const last = history[history.length - 1];
      setTableaux(last);
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const update = (newData) => {
    setHistory((prev) => [...prev, tableaux]);
    setTableaux(newData);
  };

  const updateSalles = (type, data) => {
    const updated = data.map((salle) => {
      const surface = parseFloat(salle.surface) || 0;
      const cno = parseFloat(salle.cno) || defaultCNO;
      const semaines = parseInt(salle.semaines || defaultSemaines);
      const surfacePedagogique = calculSurfacePedagogique(surface, cno);
      const heures = calculerNombreHeures(semaines);
      return {
        ...salle,
        surface,
        cno,
        surfacePedagogique,
        semaines,
        heures,
      };
    });
    update({ ...tableaux, [type]: updated });
  };

  const updateAutres = (key, data) => {
    update({ ...tableaux, [key]: data });
  };

  const resultats = calculerStats(
    tableaux.sallesTheoriques,
    tableaux.sallesPratiques,
    tableaux.effectif,
    tableaux.repartition
  );

  return {
    tableaux,
    updateSalles,
    updateAutres,
    undo,
    resultats,
  };
}
