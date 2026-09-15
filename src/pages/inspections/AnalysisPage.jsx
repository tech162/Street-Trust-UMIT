import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { BackButton } from "../../components/BackButton";

function Stage({ active, text }) {
  return (
    <div className={active ? "stage active" : "stage"}>
      <span>{active ? <Check size={13} /> : <i />}</span>
      {text}
    </div>
  );
}

export function AnalysisPage() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page analysis-page">
      <BackButton label="Evidence" to={`/inspections/${inspectionId}/evidence`} />

      <div className="analysis-card panel">
        {!done ? (
          <>
            <div className="ai-orb"><Sparkles size={28} /></div>
            <span className="eyebrow">STREETTRUST COMPLIANCE ENGINE</span>
            <h1>Analyzing inspection...</h1>
            <p>Reviewing checklist responses and field evidence to prepare a structured compliance assessment.</p>
            <div className="analysis-stages">
              <Stage active text="Reviewing checklist" />
              <Stage active text="Processing observations" />
              <Stage active text="Analyzing evidence" />
              <Stage text="Calculating compliance score" />
              <Stage text="Generating recommendations" />
            </div>
          </>
        ) : (
          <>
            <div className="result-icon"><Check /></div>
            <span className="eyebrow">ANALYSIS COMPLETE</span>
            <h1>Compliance assessment ready</h1>
            <p>The AI-assisted assessment has been prepared for inspector review. AI findings are advisory and not legally binding.</p>
            <div className="result-score">
              <div className="score-ring" style={{ "--score": 84 }}>
                <div><strong>84</strong><small>/100</small></div>
              </div>
              <div>
                <span className="status warning">Needs Attention</span>
                <h2>Moderate risk</h2>
                <p>Review the highlighted findings before finalizing.</p>
              </div>
            </div>
            <div className="finding">
              <span className="finding-dot"></span>
              <div>
                <strong>Waste disposal area requires improvement</strong>
                <p>Hygiene · Medium severity · Corrective cleaning and segregation recommended.</p>
              </div>
            </div>
            <div className="finding">
              <span className="finding-dot red"></span>
              <div>
                <strong>Safety evidence needs confirmation</strong>
                <p>Safety · High severity · Inspector review required before report finalization.</p>
              </div>
            </div>
            <button
              className="primary-btn full"
              onClick={() => navigate(`/inspections/${inspectionId}/report`)}
            >
              Review & finalize report <ArrowRight size={17} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
