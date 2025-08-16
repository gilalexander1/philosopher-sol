"use client";
import { useState } from "react";
import type { Framework } from "@/types/analysis";

const ALL: Framework[] = [
  "Utilitarianism","Deontology","Virtue Ethics","Contract/Justice (Rawls)",
  "Care Ethics","Existentialism","Pragmatism","Rights-based",
  "Rule vs Act","Double Effect"
];

export default function FrameworkSelector({
  value, onChange
}:{ value: Framework[]; onChange:(f:Framework[])=>void }){
  const toggle = (f: Framework) =>
    onChange(value.includes(f) ? value.filter(x=>x!==f) : [...value, f]);

  return (
    <div className="mb-6">
      <h3 className="font-[Cinzel] text-lg mb-2">Choose Frameworks</h3>
      <div className="flex flex-wrap">
        {ALL.map(f=>(
          <button key={f}
            className={`chip ${value.includes(f) ? "chip--selected" : ""}`}
            onClick={()=>toggle(f)}>{f}</button>
        ))}
      </div>
    </div>
  );
}
