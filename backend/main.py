from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from pathlib import Path
import json
from datetime import datetime


app = FastAPI(
    title="Philosopher Sol API",
    description="Ethical frameworks and dilemma analysis service",
    version="1.0.0",
)

# CORS: allow local dev and docker compose frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3002",
        "http://127.0.0.1:3002",
        "http://philosopher-sol:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Resolve data directory (supports build context copying ../data to ./data)
HERE = Path(__file__).resolve().parent
DATA_DIR_CANDIDATES = [
    HERE / "data",
    HERE.parent / "data",
    HERE.parent.parent / "data",
]


def _find_data_file(name: str) -> Path:
    for base in DATA_DIR_CANDIDATES:
        p = base / name
        if p.exists():
            return p
    raise FileNotFoundError(name)


@app.get("/")
def root():
    return {
        "service": "Philosopher Sol API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat(),
    }


@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.get("/api/v1/frameworks")
def get_frameworks() -> Dict[str, Any]:
    """Return philosophy library entries keyed by thinker."""
    try:
        data_path = _find_data_file("philosophyLibrary.json")
        with data_path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load library: {e}")


@app.get("/api/v1/questions")
def get_questions() -> Dict[str, List[str]]:
    try:
        data_path = _find_data_file("questionBank.json")
        with data_path.open("r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load questions: {e}")


class Stakeholder(BaseModel):
    name: str
    interests: Optional[List[str]] = None


class AnalysisRequest(BaseModel):
    dilemma: str
    values: Optional[List[str]] = None
    stakeholders: Optional[List[Stakeholder]] = None
    constraints: Optional[List[str]] = None
    frameworks: Optional[List[str]] = None  # e.g., ["Kant", "Mill", "Aristotle"]


@app.post("/api/v1/analyze")
def analyze(req: AnalysisRequest) -> Dict[str, Any]:
    """Lightweight, deterministic analysis to keep parity with frontend.

    This can be replaced with your full backend logic; the contract keeps
    the UI working: returns per-framework perspectives and a synthesis.
    """
    library = get_frameworks()

    selected = req.frameworks or ["Aristotle", "Kant", "Mill"]
    used = [f for f in selected if f in library]

    perspectives: List[Dict[str, Any]] = []
    for f in used:
        entry = library[f]
        summary = {
            "framework": f,
            "tradition": ", ".join(entry.get("tradition", [])),
            "key_works": entry.get("key_works", []),
            "angle": _angle_from_framework(f, req),
            "caveats": entry.get("caveats", []),
        }
        perspectives.append(summary)

    synthesis = _synthesize(perspectives, req)

    return {
        "dilemma": req.dilemma,
        "perspectives": perspectives,
        "synthesis": synthesis,
        "timestamp": datetime.utcnow().isoformat(),
    }


def _angle_from_framework(name: str, req: AnalysisRequest) -> str:
    v = ", ".join(req.values or [])
    c = ", ".join(req.constraints or [])
    if name.lower().startswith("kant"):
        return f"Duty-first analysis; universalize maxims; respect persons. Values: {v} Constraints: {c}"
    if name.lower().startswith("mill") or name.lower().startswith("bentham"):
        return f"Consequences and net utility; reduce harm, maximize well-being. Values: {v}"
    if name.lower().startswith("aristotle"):
        return f"Character and practical wisdom; seek the mean in context. Values: {v}"
    if name.lower().startswith("rawls"):
        return f"Fairness behind veil of ignorance; protect least-advantaged. Constraints: {c}"
    if name.lower().startswith("stoic") or name.lower().startswith("epictetus"):
        return f"Control what you can; align with virtue under constraints. Constraints: {c}"
    return f"Apply core principles of {name} to align with declared values and constraints."


def _synthesize(perspectives: List[Dict[str, Any]], req: AnalysisRequest) -> Dict[str, Any]:
    notes = [p["angle"] for p in perspectives]
    recommendation = "Balance duty and outcomes; respect persons while minimizing preventable harms."
    if req.constraints:
        recommendation += " Honor hard constraints explicitly in action plan."
    return {
        "recommendation": recommendation,
        "notes": notes[:5],
        "next_steps": [
            "List two concrete actions respecting your top values",
            "Identify one unacceptable risk and mitigate it",
            "Write a brief rationale you could defend publicly",
        ],
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

