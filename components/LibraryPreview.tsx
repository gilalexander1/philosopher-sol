// components/LibraryPreview.tsx
"use client";

import type { Philosopher } from "@/types/library";
import library from "@/data/philosophyLibrary.json";

/**
 * The JSON is a map like { "Plato": {...}, "Aristotle": {...} }.
 * Convert it to a typed array and inject the key as `id`.
 */
const thinkers: Philosopher[] = Object.entries(library).map(([id, v]) => ({
  id,
  era: v.era,
  tradition: v.tradition ?? [],
  core_ideas: v.core_ideas ?? [],
  key_works: v.key_works ?? [],
  use_when: v.use_when ?? [],
  caveats: v.caveats ?? [],
  tags: v.tags ?? [],
}));

export default function LibraryPreview({ ids }: { ids: string[] }) {
  const chosen = thinkers.filter((p) => ids.includes(p.id));

  if (!chosen.length) return null;

  return (
    <div className="card p-4">
      <h3>Invited Philosophers</h3>
      <div className="grid md:grid-cols-2 gap-3 mt-2">
        {chosen.map((p) => (
          <article key={p.id} className="card p-3">
            <div className="font-semibold">{p.id}</div>
            <div className="text-sm text-[var(--sub)]">{p.era}</div>

            {!!p.tradition?.length && (
              <div className="mt-2">
                <div className="text-xs uppercase tracking-wide text-[var(--sub)] mb-1">
                  Tradition
                </div>
                <ul className="list-disc pl-5">
                  {p.tradition.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {!!p.core_ideas?.length && (
              <div className="mt-2">
                <div className="text-xs uppercase tracking-wide text-[var(--sub)] mb-1">
                  Core ideas
                </div>
                <ul className="list-disc pl-5">
                  {p.core_ideas.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
