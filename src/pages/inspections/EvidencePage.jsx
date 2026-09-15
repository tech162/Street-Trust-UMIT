import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, Sparkles } from "lucide-react";
import { BackButton } from "../../components/BackButton";

export function EvidencePage() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="page">
      <BackButton label="Checklist" to={`/inspections/${inspectionId}/checklist`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">STEP 2 OF 3 · {inspectionId}</span>
          <h1>Inspection Evidence</h1>
          <p>Attach photos, voice notes or typed remarks as evidence.</p>
        </div>
      </div>

      <div className="stepper">
        <div className="step active"><b>1</b><span>Checklist</span></div>
        <i></i>
        <div className="step active"><b>2</b><span>Evidence</span></div>
        <i></i>
        <div className="step"><b>3</b><span>Review</span></div>
      </div>

      <section className="panel evidence-panel">
        <div className="panel-head">
          <div>
            <h3>Add inspection observations</h3>
            <p>Attach photos, voice notes or typed remarks as evidence.</p>
          </div>
        </div>
        <div className="evidence-grid">
          <button className="upload-tile">
            <span><Building2 /></span>
            <strong>Upload photos</strong>
            <small>JPG, PNG · Up to 10 MB</small>
          </button>
          <button className="upload-tile">
            <span><Sparkles /></span>
            <strong>Record voice note</strong>
            <small>Tap to record an observation</small>
          </button>
          <div className="observation-box">
            <label>
              Observation
              <textarea placeholder="Describe anything important you observed during the inspection..."></textarea>
            </label>
            <div className="observation-meta">
              <select><option>Hygiene</option><option>Safety</option><option>Documentation</option></select>
              <select><option>Medium severity</option><option>Low severity</option><option>High severity</option><option>Critical</option></select>
            </div>
          </div>
        </div>

        <div className="inspection-footer">
          <button
            className="secondary-btn"
            onClick={() => navigate(`/inspections/${inspectionId}/checklist`)}
          >
            Back to Checklist
          </button>
          <button
            className="primary-btn"
            onClick={() => navigate(`/inspections/${inspectionId}/analysis`)}
          >
            Continue to Analysis <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
