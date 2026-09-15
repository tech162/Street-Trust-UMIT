import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { getInspection } from "../../data/mockData";

export function ChecklistPage() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();
  const insp = getInspection(inspectionId) || { vendorId: "ST-1024" };
  const [checks, setChecks] = useState({});

  const sections = [
    ["Business & Documentation", ["Business registration valid", "Required licenses available", "Identity verification completed", "Required certificates present"]],
    ["Hygiene", ["Premises clean", "Food/material storage appropriate", "Waste disposal appropriate", "Equipment clean", "Handwashing facilities available"]],
    ["Safety", ["Fire safety equipment", "Electrical safety", "Emergency exits", "Safety signage"]],
    ["Operations", ["Operating standards followed", "Staff compliance", "Required records maintained"]]
  ];

  const total = sections.reduce((a, s) => a + s[1].length, 0);
  const done = Object.keys(checks).length;
  const choose = (item, val) => setChecks((c) => ({ ...c, [item]: val }));

  return (
    <div className="page">
      <BackButton label="New Inspection" to={`/vendors/${insp.vendorId}/inspections/new`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">STEP 1 OF 3 · {inspectionId}</span>
          <h1>Field Inspection Checklist</h1>
          <p>Complete the standardized inspection responses.</p>
        </div>
        <div className="autosave"><span></span> Draft saved</div>
      </div>

      <div className="stepper">
        <div className="step active"><b>1</b><span>Checklist</span></div>
        <i></i>
        <div className="step"><b>2</b><span>Evidence</span></div>
        <i></i>
        <div className="step"><b>3</b><span>Review</span></div>
      </div>

      <section className="panel inspection-panel">
        <div className="inspection-progress">
          <div>
            <strong>{done} / {total} checks completed</strong>
            <span>Progress updates automatically</span>
          </div>
          <div className="progress">
            <i style={{ width: (done / total * 100) + "%" }}></i>
          </div>
        </div>

        {sections.map(([name, items]) => (
          <div className="check-section" key={name}>
            <h3>{name}</h3>
            {items.map((item) => (
              <div className="check-row" key={item}>
                <div>
                  <strong>{item}</strong>
                  <small>Mark the current observed condition.</small>
                </div>
                <div className="check-options">
                  {["Pass", "Partial", "Fail", "N/A"].map((val) => (
                    <button
                      className={checks[item] === val ? "selected " + val.toLowerCase() : ""}
                      onClick={() => choose(item, val)}
                      key={val}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="inspection-footer">
          <button className="secondary-btn">Save draft</button>
          <button
            className="primary-btn"
            onClick={() => navigate(`/inspections/${inspectionId}/evidence`)}
          >
            Continue to Evidence <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
