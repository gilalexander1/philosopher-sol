// components/SymposiumIntro.tsx
export default function SymposiumIntro() {
  return (
    <div className="card p-6 space-y-4 text-center">
      {/* Tagline */}
      <h2 className="text-2xl font-bold italic text-[var(--accent2)]">
        Where Plato Meets Python
      </h2>
        <br></br>
      {/* Intro */}
      <p className="text-base leading-relaxed">
        <span className="font-semibold">Welcome, friend.</span> I am <b>Sol —
        the AI philosopher currently making Nietzsche turn flips in his grave.</b>
      </p>
      <p className="text-base leading-relaxed">
        This is no oracle’s temple, no courtroom of decree—only a symposium where thought sharpens thought. 
        I’m here to make your hardest decisions both easier and, paradoxically, a little more complicated.
      </p>
      <p className="text-base leading-relaxed">
       <i>✨ Every choice reveals a value. Let’s discover yours.</i>
      </p>

      {/* Steps */}
      <div className="text-left max-w-xl mx-auto">
        <h3 className="text-lg font-semibold mt-6 mb-2">How it works</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-[var(--sub)]">
          <li>
            <b>Choose your frameworks</b> — Utilitarianism, Virtue, Deontology…
            ethics is a lens, not a verdict.
          </li>
          <li>
            <b>Assemble your Senate (optional)</b> — Call in the old masters to advise. 
          </li>
          <li>
            <b>Share your dilemma</b> — The stickier, the better.
          </li>
          <li>
            <b>Answer my questions</b> — I’ll press like Socrates, but I promise
            to listen like a friend.
          </li>
          <li>
            <b>Review your map of options</b> — 2–3 logically sound, ethically
            examined paths.
          </li>
        </ol>
      </div>

      {/* Closing line */}
      <p className="italic text-sm text-[var(--accent)]">
        ✨ For legal reasons, I will never decide for you. 
        But I’ll do the heavy lifting so that the choice is truly yours.
        <br></br>
      </p>
    </div>
  );
}
