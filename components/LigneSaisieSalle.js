import SelectCNO from './SelectCNO';

export default function LigneSaisieSalle({ salle, onChange, index }) {
  const handleChange = (field, value) => {
    const updated = { ...salle, [field]: value };
    onChange(index, updated);
  };

  return (
    <tr>
      <td className="border px-2 py-1 text-center">{index + 1}</td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={salle.superficie}
          onChange={(e) => handleChange('superficie', e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </td>
      <td className="border px-2 py-1">
        <SelectCNO
          value={salle.cno}
          onChange={(e) => handleChange('cno', e.target.value)}
        />
      </td>
      <td className="border px-2 py-1 text-center">
        {(parseFloat(salle.superficie || 0) * parseFloat(salle.cno || 1)).toFixed(2)}
      </td>
      <td className="border px-2 py-1">
        <input
          type="number"
          value={salle.semaines}
          onChange={(e) => handleChange('semaines', e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </td>
      <td className="border px-2 py-1 text-center">
        {parseInt(salle.semaines || 0) * 56}
      </td>
    </tr>
  );
}