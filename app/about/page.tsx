// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

export default function AboutPage() {
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
          <h2>About The Philosopher’s Sol</h2>
          <p className="intro dropcap">
            A probing, witty, slightly “kooky professor” that helps you reason through ethical
            decisions. Sol never decides for you—he clarifies options, trade-offs, consequences,
            and logic checks, then hands the choice back to you.
          </p>
          <div className="key-divider" />
          <h3 className="mt-3">How to use</h3>
          <ol className="list-decimal pl-5">
            <li>Describe your scenario (who, what, constraints).</li>
            <li>Rank the values that matter (top 3–5).</li>
            <li>Select frameworks (Kant, Utilitarianism, Virtue, Care, Rawls, etc.).</li>
            <li>Answer the clarifying questions.</li>
            <li>Review the Decision Map (2–5 paths), trade-offs, and logic checks.</li>
            <li>Save or Download PDF; run variants with different frameworks.</li>
          </ol>
          <h3 className="mt-3">Guardrails</h3>
          <ul className="list-disc pl-5">
            <li>Not legal, medical, or financial advice.</li>
            <li>Flags high-risk domains; suggests professional help when needed.</li>
            <li>No personal data fabrication; unknowns are listed explicitly.</li>
          </ul>
        </motion.section>
      </div>
      <Footer />
    </main>
  );
}
