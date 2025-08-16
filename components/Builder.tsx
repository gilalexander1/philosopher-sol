"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import DilemmaInput from "./DilemmaInput";
import FrameworkSelector from "./FrameworkSelector";
import ValuesRanker from "./ValuesRanker";
import StakeholdersEditor from "./StakeholdersEditor";
import ConstraintsInput from "./ConstraintsInput";
import QuestionBox from "./QuestionBox";
import DecisionMap from "./DecisionMap";
import PhilosopherSelector from "./PhilosopherSelector";

import type {
  Framework,
  ValueKey,
  Stakeholder,
  AnalysisOut,
} from "@/types/analysis";

import questionBank from "../data/questionBank.json";
// ⬇️ IMPORTANT: this is YOUR object-shaped JSON (keys = names)
import philosophyLibrary from "../data/philosophyLibrary.json";

// ---------------- helpers ----------------

function pickQuestions(text: string): string[] {
  let pool = [...questionBank.general];
  if (/work|boss|office|job/i.test(text)) pool.push(...questionBank.workplace);
  if (/family|parent|child|spouse/i.test(text)) pool.push(...questionBank.family);
  const n = Math.floor(Math.random() * 3) + 3; // 3–5
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

// Very light mock that maps inputs into a structured output (LLM replaces later)
function buildMockOutput(
  scenario: string,
  values: ValueKey[],
  stakeholders: Stakeholder[],
  frameworks: Framework[],
  clarifierAnswers: string[],
  constraints: string[],
  invitedNames: string[]
): AnalysisOut {
  const ranked = values.map((v, i) => ({ value: v, rank: i + 1 }));
  const valuesLine = values.length
    ? `Values emphasized: ${values.join(", ")}.`
    : "Values not ranked yet.";
  const consLine = constraints.length ? `Constraints: ${constraints.join(", ")}.` : "";
  const thinkersLine = invitedNames.length ? ` In dialogue with ${invitedNames.join(", ")}.` : "";

  const fwNotes = frameworks.slice(0, 6).map((fw) => ({
    framework: fw,
    note:
      fw === "Utilitarianism"
        ? "Weigh net well-being; tally harms vs. benefits."
        : fw === "Deontology"
        ? "Check duties/rights; universalize your maxim."
        : fw === "Virtue Ethics"
        ? "Cultivate honesty, courage; act as the excellent person would."
        : fw === "Contract/Justice (Rawls)"
        ? "Would this be fair from the least-advantaged position?"
        : fw === "Care Ethics"
        ? "Honor relationships and particular responsibilities."
        : fw === "Existentialism"
        ? "Own the choice; avoid bad faith."
        : fw === "Pragmatism"
        ? "What works under real constraints? Iterate."
        : fw === "Rights-based"
        ? "Respect basic rights; do not use people as mere means."
        : "Use rules for consistency; switch to act-view if rules conflict.",
  }));

  return {
    scenario: scenario.slice(0, 220),
    valuesRanked: ranked,
    stakeholders,
    decisionMap: [
      {
        label: "Path A — Principle-Forward",
        summary: "Act in line with clear duties/rights and a universalizable rule.",
        rationale: `${valuesLine} ${consLine}${thinkersLine}`,
        consequences: ["Predictable norm-setting", "Signals integrity"],
        risks: ["May ignore context-specific needs", "Perceived rigidity"],
      },
      {
        label: "Path B — Outcome-First",
        summary: "Choose the option that minimizes total harm while preserving key values.",
        rationale: `${valuesLine} ${
          clarifierAnswers.length ? `You highlighted: ${clarifierAnswers.join("; ")}.` : ""
        }${thinkersLine}`,
        consequences: ["Higher immediate well-being for most stakeholders", "Clear focus on impact"],
        risks: ["Long-term precedent unclear", "Can feel expedient"],
      },
    ],
    frameworkSnapshots: fwNotes,
    logicCheck: clarifierAnswers.length
      ? {
          type: "syllogism",
          lines: [
            "P1: Actions that protect top-ranked values are preferable, ceteris paribus.",
            `P2: Path A/B (compare) better protects ${values[0] ?? "your priority"}.`,
            "C: Therefore that path is preferable (validity only; premises debatable).",
          ],
        }
      : undefined,
    assumptions: ["Stakeholder reports are accurate", "Constraints are correctly identified"],
    unknowns: ["Missing probabilities for key outcomes", "Tolerance for risk not specified"],
    nextActions: ["Clarify acceptable risk threshold", "Get a neutral perspective", "Test a reversible small step"],
    reflection: "Which trade-off honors your top value without betraying the others?",
  };
}

// ---------------- component ----------------

export default function Builder() {
  // Inputs
  const [dilemma, setDilemma] = useState("");
  const [frameworks, setFrameworks] = useState<Framework[]>([
    "Utilitarianism",
    "Deontology",
    "Virtue Ethics",
  ]);
  const [values, setValues] = useState<ValueKey[]>([]);

  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [constraints, setConstraints] = useState<string[]>([]);
  const [philosophers, setPhilosophers] = useState<string[]>([]); // selected NAMES

  // Flow
  const [stage, setStage] = useState<"idle" | "questions" | "analysis">("idle");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [out, setOut] = useState<AnalysisOut | null>(null);

  // Printable area (header + results)
  const printRef = useRef<HTMLDivElement | null>(null);

  const canGenerate = dilemma.trim().length > 10;

  // Build name list from your object-shaped JSON
  const allThinkerNames = Object.keys(philosophyLibrary as Record<string, unknown>);

  const handleGenerate = () => {
    setQuestions(pickQuestions(dilemma));
    setStage("questions");
  };

  const proceedToAnalysis = (ans: string[]) => {
    setAnswers(ans);

    // Validate selected names against your JSON keys (in case of typos)
    const invitedNames = philosophers.filter((n) => allThinkerNames.includes(n));

    const o = buildMockOutput(
      dilemma,
      values,
      stakeholders,
      frameworks,
      ans,
      constraints,
      invitedNames
    );
    setOut(o);
    setStage("analysis");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  const handleReset = () => {
    setDilemma("");
    setFrameworks(["Utilitarianism", "Deontology", "Virtue Ethics"]);
    setValues([]);
    setStakeholders([]);
    setConstraints([]);
    setPhilosophers([]);
    setStage("idle");
    setQuestions([]);
    setAnswers([]);
    setOut(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      backgroundColor: "#FFFBF3",
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({ unit: "pt", format: "a4", compress: true });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 32;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = margin;
    let heightLeft = imgHeight;

    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight, "", "FAST");
    heightLeft -= pageHeight - margin * 2;

    while (heightLeft > 0) {
      pdf.addPage();
      position = margin - (imgHeight - heightLeft);
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight, "", "FAST");
      heightLeft -= pageHeight - margin * 2;
    }

    pdf.save("Philosopher-Sol-Decision-Map.pdf");
  };

  return (
  <section>
    {/* Intro card */}
    

    {/* Inputs */}
    <FrameworkSelector value={frameworks} onChange={setFrameworks} />
    <PhilosopherSelector value={philosophers} onChange={setPhilosophers} />
    <ValuesRanker value={values} onChange={setValues} />
    <StakeholdersEditor value={stakeholders} onChange={setStakeholders} />
    <ConstraintsInput value={constraints} onChange={setConstraints} />
    <DilemmaInput value={dilemma} onChange={setDilemma} />

    {/* Always-visible floating reset */}
          <button
            type="button"
            className="floating-reset"
            onClick={handleReset}
            title="Reset & start over"
            aria-label="Reset & start over"
          >
            ⟲ Reset
          </button>

    {/* Flow controls */}
    {stage === "idle" && (
      <div className="flex items-center gap-3 mb-6">
        <button
          className="button--seal chip"
          onClick={handleGenerate}
          disabled={!canGenerate}
          title={!canGenerate ? "Add a bit more detail first" : "Generate"}
        >
          <img src="/svg/wax-seal-sol.svg" alt="" />
          Generate
        </button>
        {!canGenerate && (
          <span className="text-sm text-[var(--sub)]">
            Add at least a sentence describing your scenario.
          </span>
        )}
      </div>
    )}

    {stage === "questions" && (
      <QuestionBox questions={questions} onDone={(ans) => proceedToAnalysis(ans)} />
    )}

    {/* Printable area: Header (seal+title) + Results */}
    {stage === "analysis" && out && (
      <>
        <motion.div
          ref={printRef}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.8 }}
        >
          <div className="card p-4 mb-3">
            <div className="flex items-center gap-3">
              <img src="/svg/wax-seal-sol.svg" alt="" className="header-seal" />
              <h1 style={{ margin: 0 }}>The Philosopher’s Sol</h1>
            </div>
            <div className="key-divider" />
            <p className="text-sm text-[var(--sub)]">
              A symposium in your browser — many lenses, never one decree.
            </p>
          </div>

          <DecisionMap out={out} />
        </motion.div>

        <div className="flex flex-wrap gap-3 mt-4">
          <button className="button--seal" onClick={handleDownloadPdf}>
            <img src="/svg/wax-seal-sol.svg" alt="" />
            Download PDF
          </button>
          

          <button className="button--ghost" onClick={handleReset}>
            Reset & start over
          </button>
        </div>
      </>
    )}
  </section>
);
}

    