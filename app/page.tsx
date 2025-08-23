// app/page.tsx
"use client";

import { motion } from "framer-motion";
import TopBar from "@/components/TopBar";
import HeroRibbon from "@/components/HeroRibbon";
import SymposiumIntro from "@/components/SymposiumIntro";
import Builder from "@/components/Builder";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <TopBar />
      <div className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.7 }}
        >
          <HeroRibbon />
        </motion.div>

        <motion.div
          className="card border-l-4 border-[var(--accent2)] px-8 py-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.8, delay: 0.05 }}
        >
          <SymposiumIntro />
        </motion.div>

        <Builder />
      </div>
      <Footer />
    </main>
  );
}
