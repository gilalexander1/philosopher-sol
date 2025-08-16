"use client";

import { motion, Variants } from "framer-motion";
import type { AnalysisOut } from "@/types/analysis";

/* -------- Typed transitions & variants -------- */
const SPRING = {
  type: "spring" as const,
  stiffness: 320,
  damping: 26,
  mass: 0.7,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: SPRING },
};

const containerStagger = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay,
      when: "beforeChildren" as const,
      staggerChildren: 0.06,
    },
  },
});

const item: Variants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: SPRING },
};

type Props = { out: AnalysisOut };

export default function DecisionMap({ out }: Props) {
  const topValues = out.valuesRanked?.slice(0, 5) ?? [];

  return (
    <motion.section
      className="space-y-4"
      variants={containerStagger()}
      initial="hidden"
      animate="show"
    >
      {/* Scenario */}
      <motion.article className="card p-4" variants={fadeUp}>
        <h3>Scenario</h3>
        <p className="intro">{out.scenario}</p>
      </motion.article>

      {/* Stated Values & Stakeholders */}
      <motion.div className="grid md:grid-cols-2 gap-3" variants={containerStagger(0.05)}>
        <motion.article className="card p-4" variants={item}>
          <h3>Stated Values (ranked)</h3>
          {topValues.length ? (
            <ol className="list-decimal pl-5">
              {topValues.map((v: { value: string; rank: number }) => (
                <motion.li key={v.value} variants={item}>
                  {v.rank}. {v.value}
                </motion.li>
              ))}
            </ol>
          ) : (
            <p className="text-[var(--sub)] text-sm">No values ranked yet.</p>
          )}
        </motion.article>

        <motion.article className="card p-4" variants={item}>
          <h3>Stakeholders &amp; Harms/Benefits</h3>
          {out.stakeholders?.length ? (
            <ul className="list-disc pl-5">
              {out.stakeholders.map(
                (s: { name: string; interests?: string }, idx: number) => (
                  <motion.li key={idx} variants={item}>
                    <b>{s.name}</b>
                    {s.interests ? <> — {s.interests}</> : null}
                  </motion.li>
                )
              )}
            </ul>
          ) : (
            <p className="text-[var(--sub)] text-sm">
              Add key stakeholders to see targeted trade-offs.
            </p>
          )}
        </motion.article>
      </motion.div>

      {/* Decision Map (stagger cards) */}
      {out.decisionMap?.length > 0 && (
        <motion.section variants={containerStagger(0.1)}>
          <h3 className="mb-2">Decision Map</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {out.decisionMap.map(
              (
                p: {
                  label: string;
                  summary: string;
                  rationale: string;
                  consequences: string[];
                  risks: string[];
                },
                i: number
              ) => (
                <motion.article
                  key={i}
                  className="card p-4 ribbon ribbon--gold"
                  variants={item}
                >
                  <h4 className="mb-1">{p.label}</h4>
                  <p className="text-sm mb-2">{p.summary}</p>

                  <div className="key-divider mb-2" />

                  <div className="mb-2">
                    <div className="text-xs uppercase tracking-wide text-[var(--sub)] mb-1">
                      Ethical rationale
                    </div>
                    <p className="text-sm">{p.rationale}</p>
                  </div>

                  <motion.div
                    variants={containerStagger()}
                    className="grid grid-cols-2 gap-3"
                  >
                    <motion.div className="card p-3" variants={item}>
                      <div className="text-xs uppercase tracking-wide text-[var(--sub)] mb-1">
                        Likely consequences
                      </div>
                      <ul className="list-disc pl-5">
                        {p.consequences.map((c: string, ci: number) => (
                          <motion.li key={ci} variants={item}>
                            {c}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div className="card p-3" variants={item}>
                      <div className="text-xs uppercase tracking-wide text-[var(--sub)] mb-1">
                        Risks
                      </div>
                      <ul className="list-disc pl-5">
                        {p.risks.map((r: string, ri: number) => (
                          <motion.li key={ri} variants={item}>
                            {r}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.div>
                </motion.article>
              )
            )}
          </div>
        </motion.section>
      )}

      {/* Framework Snapshots */}
      {!!out.frameworkSnapshots?.length && (
        <motion.section variants={containerStagger(0.05)}>
          <h3 className="mb-2">Framework Snapshots</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {out.frameworkSnapshots.map(
              (f: { framework: string; note: string }, idx: number) => (
                <motion.article key={idx} className="card p-3" variants={item}>
                  <div className="font-semibold">{f.framework}</div>
                  <p className="text-sm">{f.note}</p>
                </motion.article>
              )
            )}
          </div>
        </motion.section>
      )}

      {/* Logic Check (optional) */}
      {out.logicCheck && (
        <motion.article className="card p-4" variants={fadeUp}>
          <h3>Logic Check</h3>
          {out.logicCheck.type === "syllogism" && (
            <ul className="list-disc pl-5">
              {out.logicCheck.lines.map((l: string, i: number) => (
                <motion.li key={i} variants={item}>
                  {l}
                </motion.li>
              ))}
            </ul>
          )}
        </motion.article>
      )}

      {/* Assumptions & Unknowns */}
      <motion.div className="grid md:grid-cols-2 gap-3" variants={containerStagger()}>
        <motion.article className="card p-4" variants={item}>
          <h3>Assumptions</h3>
          <ul className="list-disc pl-5">
            {out.assumptions.map((a: string, i: number) => (
              <motion.li key={i} variants={item}>
                {a}
              </motion.li>
            ))}
          </ul>
        </motion.article>
        <motion.article className="card p-4" variants={item}>
          <h3>Unknowns</h3>
          <ul className="list-disc pl-5">
            {out.unknowns.map((u: string, i: number) => (
              <motion.li key={i} variants={item}>
                {u}
              </motion.li>
            ))}
          </ul>
        </motion.article>
      </motion.div>

      {/* Next Actions + Reflection */}
      <motion.div className="grid md:grid-cols-2 gap-3" variants={containerStagger()}>
        <motion.article className="card p-4" variants={item}>
          <h3>Next Actions</h3>
          <ul className="list-disc pl-5">
            {out.nextActions.map((n: string, i: number) => (
              <motion.li key={i} variants={item}>
                {n}
              </motion.li>
            ))}
          </ul>
        </motion.article>

        <motion.article className="card p-4" variants={item}>
          <h3>Reflection</h3>
          <p className="italic">{out.reflection}</p>
        </motion.article>
      </motion.div>
    </motion.section>
  );
}
