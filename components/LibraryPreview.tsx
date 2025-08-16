import type { Philosopher } from "@/types/library";
import library from "../data/philosophyLibrary.json";

export default function LibraryPreview({ ids }: { ids: string[] }) {
  const thinkers = library as Philosopher[];
  const chosen = thinkers.filter(p => ids.includes(p.id));
  if (!chosen.length) return null;

  return (
    <section className="card p-4 mb-4">
      <h3 className="font-[Cinzel] text-lg">At the Table</h3>
      <div className="grid md:grid-cols-2 gap-3 mt-2">
        {chosen.map(p => (
          <article key={p.id} className="card p-3">
            <div className="font-semibold">{p.name} <span className="text-[var(--sub)]">({p.era})</span></div>
            <div className="text-sm text-[var(--sub)] mb-1">{p.frameworks.join(" · ")}</div>
            <ul className="list-disc pl-5">
              {p.core_principles.slice(0,2).map((c,i)=><li key={i}>{c}</li>)}
            </ul>
            {p.quote && <p className="mt-1 italic text-sm">“{p.quote}”</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
