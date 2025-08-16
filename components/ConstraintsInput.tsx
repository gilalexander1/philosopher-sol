"use client";
import { useState } from "react";

const SUGGESTED = ["Legal/Policy", "Time", "Budget", "Confidentiality", "Reputation"];

export default function ConstraintsInput({
  value, onChange
}:{ value:string[]; onChange:(v:string[])=>void }){
  const [t, setT] = useState("");

  const toggle = (c:string)=> onChange(value.includes(c) ? value.filter(x=>x!==c) : [...value, c]);

  return (
    <div className="mb-6">
      <h3 className="font-[Cinzel] text-lg mb-2">Constraints</h3>
      <div className="flex flex-wrap mb-2">
        {SUGGESTED.map(c=>(
          <button key={c} className={`chip ${value.includes(c)?"chip--selected":""}`} onClick={()=>toggle(c)}>{c}</button>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="chip" placeholder="Add custom constraint"
               value={t} onChange={e=>setT(e.target.value)} />
        <button className="chip" onClick={()=>{ const s=t.trim(); if(!s) return; onChange([...value,s]); setT(""); }}>Add</button>
      </div>
    </div>
  );
}
