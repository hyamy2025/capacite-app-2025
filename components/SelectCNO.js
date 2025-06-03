const CNO_OPTIONS = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];

export default function SelectCNO({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border px-2 py-1 rounded w-full bg-white"
    >
      {CNO_OPTIONS.map((cno) => (
        <option key={cno} value={cno}>
          {cno}
        </option>
      ))}
    </select>
  );
}