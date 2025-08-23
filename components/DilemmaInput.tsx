"use client";
type Props = {
  value: string;
  onChange: (t: string) => void;
};

export default function DilemmaInput({ value, onChange }: Props) {
  return (
    <div className="mb-6">
      <h3 className="font-[Cinzel] text-lg mb-2">Your Dilemma</h3>
      <textarea
        className="w-full min-h-[120px] p-3 border border-[var(--edge)] rounded-[var(--r-md)] focus-ring"
        placeholder="Describe your ethical problem here..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={500}
      />
      <p className="text-sm text-[var(--sub)] mt-2">{value.length}/500 characters</p>
    </div>
  );
}
