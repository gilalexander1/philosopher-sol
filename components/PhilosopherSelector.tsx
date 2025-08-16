"use client";

import { useMemo, useState } from "react";
import libraryJson from "../data/philosophyLibrary.json";

type PhilosopherEntry = {
  era: string;
  tradition: string[];
  core_ideas: string[];
  key_works: string[];
  use_when: string[];
  caveats: string[];
  tags: string[];
};

type Props = {
  value: string[];                     // selected NAMES (match JSON keys)
  onChange: (names: string[]) => void; // toggles selection
  showPreview?: boolean;               // show detail cards under grid
};

export default function PhilosopherSelector({
  value,
  onChange,
  showPreview = true,
}: Props) {
  const [q, setQ] = useState("");

  const lib = libraryJson as Record<string, PhilosopherEntry>;
  const names = useMemo(
    () => Object.keys(lib).filter((n) => n !== "Raw Data Template"),
    [lib]
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return names;
    return names.filter((name) => {
      const p = lib[name];
      const hay = [
        name,
        p.era,
        ...(p.tradition || []),
        ...(p.tags || []),
        ...(p.core_ideas || []),
        ...(p.key_works || []),
        ...(p.use_when || []),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(term);
    });
  }, [q, names, lib]);

  const toggle = (name: string) => {
    onChange(value.includes(name) ? value.filter((x) => x !== name) : [...value, name]);
  };

  const initials = (name: string) =>
    name
      .split(/\s+/)
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-[Cinzel] text-lg">Invite Philosophers (optional)</h3>
        <input
          className="chip"
          placeholder="Search name, tradition, tag, idea…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search philosophers"
        />
      </div>

{/* Scrollable grid of pill-cards */}
<div className="thinker-grid-container">
  <div className="thinker-grid">
    {filtered.map((name) => {
      const selected = value.includes(name);
      const p = lib[name];
      return (
        <button
          key={name}
          type="button"
          className={`thinker-pill ${selected ? "thinker-pill--on" : ""}`}
          onClick={() => toggle(name)}
          aria-pressed={selected}
          title={`${name}${p?.tradition?.length ? " — " + p.tradition.join(", ") : ""}`}
        >
          <span className="thinker-coin">{initials(name)}</span>
          <span className="thinker-meta">
            <span className="thinker-name">{name}</span>
            {p?.tradition?.length ? (
              <span className="thinker-sub">{p.tradition.join(" · ")}</span>
            ) : null}
          </span>
        </button>
      );
    })}
  </div>
</div>


      {/* Selected list (compact) */}
      <p className="text-sm text-[var(--sub)] mt-2">
        Selected: {value.length ? value.join(", ") : "None"}
      </p>

      {/* Preview for selected (optional) */}
      {showPreview && value.length > 0 && (
        <div className="card p-4 mt-3">
          <h4 className="font-[Cinzel] text-base mb-2">At the Table</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {value
              .filter((name) => lib[name])
              .map((name) => {
                const p = lib[name];
                return (
                  <article key={name} className="card p-3">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <div className="font-semibold">{name}</div>
                        <div className="text-xs text-[var(--sub)]">{p.era}</div>
                      </div>
                      <button
                        className="chip"
                        onClick={() => toggle(name)}
                        aria-label={`Remove ${name}`}
                      >
                        Remove
                      </button>
                    </div>

                    {p.tradition?.length > 0 && (
                      <div className="text-sm text-[var(--sub)] mb-1">
                        {p.tradition.join(" · ")}
                      </div>
                    )}

                    <ul className="list-disc pl-5">
                      {(p.core_ideas || []).slice(0, 2).map((idea, i) => (
                        <li key={i}>Core: {idea}</li>
                      ))}
                      {(p.use_when || []).slice(0, 1).map((u, i) => (
                        <li key={`u-${i}`}>Use when: {u}</li>
                      ))}
                      {(p.caveats || []).slice(0, 1).map((c, i) => (
                        <li key={`c-${i}`}>Caveat: {c}</li>
                      ))}
                    </ul>

                    {p.key_works?.length ? (
                      <p className="text-sm mt-1">
                        <strong>Works:</strong> {p.key_works.slice(0, 2).join(", ")}
                        {p.key_works.length > 2 ? "…" : ""}
                      </p>
                    ) : null}
                  </article>
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
}
