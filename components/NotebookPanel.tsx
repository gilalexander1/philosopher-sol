type Notebook = { facts: string[]; stakeholders: string[]; values: string[]; unknowns: string[]; constraints: string[] };

export default function NotebookPanel({ n }: { n: Notebook }){
  return (
    <aside
      className="card p-4"
      aria-label="Case Notebook"
      style={{ backgroundImage: 'linear-gradient(transparent 24px, rgba(228,220,207,.7) 25px)', backgroundSize: '1px 25px' }}
    >
      {(['facts','stakeholders','values','unknowns','constraints'] as const).map((k)=>(
        <div key={k} className="mb-3">
          <h3 className="font-[Cinzel] text-lg mb-1 capitalize">{k}</h3>
          <ul className="list-disc pl-5 text-[.98rem] text-[color:var(--sub)]">
            {(n[k] || []).map((v,i)=><li key={i}>{v}</li>)}
          </ul>
        </div>
      ))}
    </aside>
  );
}
