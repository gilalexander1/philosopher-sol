"use client";
import { useState } from "react";
import type { Stakeholder } from "@/types/analysis";

export default function StakeholdersEditor({
  value, onChange
}:{ value: Stakeholder[]; onChange:(s:Stakeholder[])=>void }){
  const [name, setName] = useState("");

  const addPerson = ()=>{
    const n = name.trim();
    if(!n) return;
    onChange([...value, { name:n, harms:[], benefits:[] }]);
    setName("");
  };

  const addLine = (i:number, kind:"harms"|"benefits", text:string)=>{
    const t = text.trim(); if(!t) return;
    const copy = structuredClone(value);
    copy[i][kind].push(t);
    onChange(copy);
  };

  return (
    <div className="mb-6">
      <h3 className="font-[Cinzel] text-lg mb-2">Stakeholders & Harms/Benefits</h3>
      <div className="flex gap-2 mb-3">
        <input className="chip" placeholder="Add stakeholder (e.g., Me, Team, Client)"
               onChange={(e)=>setName(e.target.value)} value={name} />
        <button className="chip" onClick={addPerson}>Add</button>
      </div>

      {value.length===0 && <p className="text-sm text-[var(--sub)]">No stakeholders yet.</p>}

      <div className="space-y-3">
        {value.map((s, i)=>(
          <div className="card p-3" key={i}>
            <div className="flex items-center justify-between mb-2">
              <strong>{s.name}</strong>
              <button className="chip" onClick={()=>{
                const copy = value.slice(); copy.splice(i,1); onChange(copy);
              }}>Remove</button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <div className="font-semibold mb-1">Harms</div>
                <ul className="list-disc pl-5">{s.harms.map((h,hi)=><li key={hi}>{h}</li>)}</ul>
                <StakeAdd onAdd={(t)=>addLine(i,"harms",t)} />
              </div>
              <div>
                <div className="font-semibold mb-1">Benefits</div>
                <ul className="list-disc pl-5">{s.benefits.map((b,bi)=><li key={bi}>{b}</li>)}</ul>
                <StakeAdd onAdd={(t)=>addLine(i,"benefits",t)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StakeAdd({onAdd}:{onAdd:(t:string)=>void}){
  const [t,setT]=useState("");
  return (
    <div className="flex gap-2 mt-2">
      <input className="chip" placeholder="Add item..." value={t} onChange={e=>setT(e.target.value)} />
      <button className="chip" onClick={()=>{ onAdd(t); setT(""); }}>Add</button>
    </div>
  );
}
