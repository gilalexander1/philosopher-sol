export type Framework =
  | "Utilitarianism" | "Deontology" | "Virtue Ethics" | "Contract/Justice (Rawls)"
  | "Care Ethics" | "Existentialism" | "Pragmatism" | "Rights-based"
  | "Rule vs Act" | "Double Effect";

export type ValueKey =
  | "safety" | "autonomy" | "equity" | "loyalty" | "honesty"
  | "well-being" | "justice" | "sustainability";

export type Stakeholder = {
  name: string;
  harms: string[];
  benefits: string[];
};

export type DecisionPath = {
  label: string;
  summary: string;
  rationale: string;
  consequences: string[];
  risks: string[];
};

export type AnalysisOut = {
  scenario: string;
  valuesRanked: { value: ValueKey; rank: number }[];
  stakeholders: Stakeholder[];
  decisionMap: DecisionPath[];
  frameworkSnapshots: { framework: Framework; note: string }[];
  logicCheck?: { type: "syllogism" | "decision-tree"; lines: string[] };
  assumptions: string[];
  unknowns: string[];
  nextActions: string[];
  reflection: string;
};
