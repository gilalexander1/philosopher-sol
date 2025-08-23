// app/glossary/page.tsx
"use client";

import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

const terms: { term: string; def: string }[] = [
  { term: "Utilitarianism", def: "Judge actions by net effects on well-being; pick the option with the best overall consequences." },
  { term: "Deontology (Kant)", def: "Focus on duties and rights. Ask: could my rule be universal? Never treat people as mere means." },
  { term: "Virtue Ethics", def: "Cultivate character (honesty, courage, justice). Choose the action a good person would take to grow those traits." },
  { term: "Care Ethics", def: "Prioritize relationships, context, and responsibilities to dependents or marginalized people." },
  { term: "Contract/Justice (Rawls)", def: "Fairness from the least-advantaged position; would this rule be chosen behind a veil of ignorance?" },
  { term: "Rights-based", def: "Respect basic rights (autonomy, privacy, non-harm) even when outcomes tempt otherwise." },
  { term: "Rule vs Act", def: "Rule: follow rules that generally maximize good. Act: evaluate each case by its outcomes." },
  { term: "Double Effect", def: "Harm can be permissible if it’s a side-effect of pursuing a good end, not the intended means, and proportionality holds." },
  { term: "Publicity Test", def: "If the choice were public tomorrow, would you stand by it?" },
  { term: "Reversibility Test", def: "Would the decision still seem fair if you swapped roles with the least-advantaged person?" },
];

export default function GlossaryPage() {
  return (
    <main>
      <TopBar />
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <motion.section
          className="card p-6 md:p-8 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 24, mass: 0.8 }}
        >
          <h2>Glossary</h2>
          <p className="intro">Short, practical definitions you can click through while deciding.</p>

          <div className="grid md:grid-cols-2 gap-4 mt-2">
            {terms.map((t, i) => (
              <motion.article
                key={t.term}
                className="card p-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.7, delay: 0.02 * i }}
              >
                <h3>{t.term}</h3>
                <p>{t.def}</p>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
