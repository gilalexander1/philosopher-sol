type Opt = { label: string; rationale: string; first_step: string; risk: string; tone?: "gold" | "burgundy" };
export default function AnswerCard({ opt }: { opt: Opt }) {
  const rib = opt.tone === "gold" ? "ribbon--gold" : "ribbon--burgundy";
  return (
    <section className="card overflow-hidden">
      <div className={`${rib} px-4 py-2 text-sm font-semibold`}>{opt.label}</div>
      <div className="p-4">
        <div className="mb-2"><strong>Rationale:</strong> {opt.rationale}</div>
        <div className="mb-2"><strong>First step:</strong> {opt.first_step}</div>
        <div><strong>Risk:</strong> {opt.risk}</div>
      </div>
    </section>
  );
}
