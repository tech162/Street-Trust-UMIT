import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertTriangle, ArrowRight, Check, CheckCircle2,
  Loader2, ShieldAlert, Sparkles
} from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { InspectionStepper } from "../../components/InspectionStepper";

export function AnalysisPage() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();

  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  const stages = [
    "Analyzing checklist responses...",
    "Reviewing photographic and voice evidence...",
    "Calculating compliance risk score...",
    "Preparing corrective recommendations..."
  ];

  // Stage advancement simulation
  useEffect(() => {
    const stageTimers = [
      setTimeout(() => setCurrentStage(1), 600),
      setTimeout(() => setCurrentStage(2), 1200),
      setTimeout(() => setCurrentStage(3), 1800),
      setTimeout(() => {
        setIsComplete(true);
      }, 2400)
    ];

    return () => stageTimers.forEach(clearTimeout);
  }, []);

  // Animate score from 0 to 84 when complete
  useEffect(() => {
    if (!isComplete) return;

    let start = null;
    const duration = 800;
    const target = 84;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [isComplete]);

  return (
    <div className="page analysis-page">
      <BackButton label="Evidence" to={`/inspections/${inspectionId}/evidence`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">STEP 4 OF 5 · INTELLIGENT COMPLIANCE ENGINE</span>
          <h1>AI Compliance Analysis</h1>
          <p>Automated risk synthesis cross-referencing checklist items with field evidence.</p>
        </div>
      </div>

      <InspectionStepper currentStep={4} />

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div className="analysis-card panel" style={{ textAlign: "center", padding: "36px 30px" }}>
          {!isComplete ? (
            <>
              <div className="ai-orb" style={{ margin: "0 auto 20px" }}>
                <Sparkles size={30} className="pulse-icon" />
              </div>
              <span className="eyebrow">STREETTRUST INTELLIGENCE</span>
              <h2 style={{ fontFamily: "Manrope", fontSize: "22px", margin: "8px 0" }}>
                Analyzing Inspection
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "13px", maxWidth: "440px", margin: "0 auto 28px" }}>
                Evaluating checklist responses, image attachments, and regulatory rules to synthesize risk posture.
              </p>

              {/* Sequential Processing Stages */}
              <div className="analysis-stages" style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
                {stages.map((text, idx) => {
                  const isDone = idx < currentStage;
                  const isActive = idx === currentStage;
                  return (
                    <div
                      key={text}
                      className={`stage ${isDone ? "active" : ""} ${isActive ? "in-progress" : ""}`}
                      style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", fontSize: "13px" }}
                    >
                      <span
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          background: isDone ? "var(--green)" : isActive ? "var(--amber-bg)" : "var(--subtle-bg)",
                          color: isDone ? "white" : isActive ? "var(--amber-text)" : "var(--muted)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: "11px",
                          flexShrink: 0
                        }}
                      >
                        {isDone ? (
                          <Check size={14} strokeWidth={3} />
                        ) : isActive ? (
                          <Loader2 size={13} className="spin" />
                        ) : (
                          <i style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--line)" }} />
                        )}
                      </span>
                      <span style={{ color: isDone ? "var(--ink)" : isActive ? "var(--ink)" : "var(--muted)", fontWeight: isActive ? "700" : "500" }}>
                        {text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="page-enter" style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--green-bg)", color: "var(--green-text)", display: "grid", placeItems: "center" }}>
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <span className="eyebrow">ASSESSMENT READY</span>
                  <h3 style={{ margin: 0, fontFamily: "Manrope", fontSize: "17px" }}>Compliance Synthesis Complete</h3>
                </div>
              </div>

              {/* Compliance Score Presentation */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "var(--subtle-bg)",
                  border: "1px solid var(--line)",
                  borderRadius: "12px",
                  padding: "18px 22px",
                  margin: "18px 0"
                }}
              >
                <div>
                  <span style={{ fontSize: "10px", fontWeight: "800", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--muted)" }}>
                    Calculated Compliance Score
                  </span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "4px" }}>
                    <strong style={{ fontSize: "36px", fontFamily: "Manrope", color: "var(--ink)" }}>
                      {animatedScore}
                    </strong>
                    <span style={{ fontSize: "16px", color: "var(--muted)", fontWeight: "600" }}>/ 100</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className="status warning" style={{ fontSize: "12px", padding: "6px 14px" }}>
                    Needs Attention
                  </span>
                  <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "6px" }}>
                    Moderate risk · 2 infractions noted
                  </div>
                </div>
              </div>

              {/* Findings */}
              <h4 style={{ fontFamily: "Manrope", fontSize: "13px", margin: "20px 0 10px", color: "var(--ink)" }}>
                Key Infractions & Corrective Actions
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                <div className="finding">
                  <span className="finding-dot amber"></span>
                  <div>
                    <strong>Waste disposal area requires improvement</strong>
                    <p>Hygiene · Medium severity · Segregated food waste bins must be emptied and sanitized prior to service hours.</p>
                  </div>
                </div>
                <div className="finding">
                  <span className="finding-dot red"></span>
                  <div>
                    <strong>Commercial gas safety certification verification required</strong>
                    <p>Safety · High severity · Gas pipeline inspection certificate not visibly posted on premises.</p>
                  </div>
                </div>
              </div>

              <div style={{ background: "var(--card-bg)", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: "8px", fontSize: "11px", color: "var(--muted)", marginBottom: "22px" }}>
                💡 <strong>Inspector Note:</strong> AI compliance results are advisory. The inspecting officer retains full authority to confirm, modify, or override any finding prior to publication.
              </div>

              <button
                className="primary-btn full"
                onClick={() => navigate(`/inspections/${inspectionId}/report`)}
                style={{ padding: "14px", fontSize: "13px" }}
              >
                Proceed to Formal Report <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
