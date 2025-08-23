"use client";
type Props = {
  value: string | null;
  onChange: (s: string) => void;
};

const stances = [
  "Consequentialism",
  "Deontology",
  "Virtue Ethics",
  "Existentialism",
  "Care Ethics",
];

export default function StanceSelector({ value, onChange }: Props) {
  return (
    <div className="mb-6">
      <h3 className="font-[Cinzel] text-lg mb-2">Select Ethical Stance</h3>
      <div className="flex flex-wrap gap-2">
        {stances.map((s) => (
          <button
            key={s}
            className={`chip ${value === s ? "chip--selected" : ""}`}
            onClick={() => onChange(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
