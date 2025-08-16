"use client";
import { useState } from "react";

type Props = { questions: string[]; onDone: (answers: string[]) => void };

export default function QuestionBox({ questions, onDone }: Props) {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

  const handleChange = (i: number, val: string) => {
    const copy = [...answers];
    copy[i] = val;
    setAnswers(copy);
  };

  const ready = answers.every((a) => a.trim().length > 0);

  return (
    <div className="card p-4 mb-6">
      <h3 className="font-[Cinzel] text-lg mb-2">Clarifying Questions</h3>
      <ul className="space-y-4">
        {questions.map((q, i) => (
          <li key={i}>
            <p className="mb-1">{q}</p>
            <textarea
              className="w-full p-2 rounded bg-[var(--panel)] border border-white/10"
              rows={2}
              value={answers[i]}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button
        className="button chip mt-4"
        onClick={() => onDone(answers)}
        disabled={!ready}
      >
        Proceed to Analysis →
      </button>
    </div>
  );
}
