"use client";
import { useState } from "react";
import type { ValueKey } from "@/types/analysis";

const ALL: {k:ValueKey; label:string}[] = [
  {k:"safety",label:"Safety"}, {k:"autonomy",label:"Autonomy"},
  {k:"equity",label:"Equity"}, {k:"loyalty",label:"Loyalty"},
  {k:"honesty",label:"Honesty"}, {k:"well-being",label:"Well-Being"},
  {k:"justice",label:"Justice"}, {k:"sustainability",label:"Sustainability"},
];

export default function ValuesRanker({
  value, onChange, max=5
}:{ value: ValueKey[]; onChange:(v:ValueKey[])=>void; max?:number }){
  const [picked, setPicked] = useState<ValueKey[]>(value);

  const toggle = (k:ValueKey)=>{
    let next = picked.includes(k) ? picked.filter(x=>x!==k) : [...picked, k];
    if (next.length > max) next = next.slice(0,max);
    setPicked(next); onChange(next);
  };

  return (
    <div className="mb-6">
      <h3 className="font-[Cinzel] text-lg mb-1">Rank Your Values (Top {max})</h3>
      <p className="text-sm text-[var(--sub)] mb-2">Click to select up to {max}; order matters (first = most important).</p>
      <div className="flex flex-wrap">
        {ALL.map(({k,label})=>(
          <button key={k} className={`chip ${picked.includes(k)?"chip--selected":""}`} onClick={()=>toggle(k)}>
            {label}{picked.includes(k) ? `  #${picked.indexOf(k)+1}` : ""}
          </button>
        ))}
      </div>
    </div>
  );
}
