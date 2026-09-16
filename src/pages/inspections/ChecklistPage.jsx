import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { InspectionStepper } from "../../components/InspectionStepper";
import { getInspection } from "../../data/mockData";

export function ChecklistPage() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();
  const insp = getInspection(inspectionId) || { vendorId: "ST-1024", vendor: "Shree Misal Corner" };

  const sections = [
    [
      "Documentation & Licensing",
      [
        "FSSAI / Municipal license displayed prominently",
        "Proprietor identity proof verified",
        "Medical fitness certificate for food handlers",
        "Potable water test report available",
        "Pest control log maintained",
        "Daily oil reuse records available"
      ]
    ],
    [
      "Food Hygiene & Preparation",
      [
        "Food preparation area clean and dry",
        "Clean drinking & cooking water used",
        "Raw and cooked food stored separately",
        "Adequate refrigeration maintained (below 5°C)",
        "Cooking equipment sanitized properly",
        "Dustbins with foot-operated lids used",
        "Fly & rodent screens intact"
      ]
    ],
    [
      "Personal Hygiene & Sanitation",
      [
        "Handlers wearing clean aprons & headgear",
        "Nails trimmed and no jewelry worn during cooking",
        "Handwashing facility with soap available",
        "No coughing / sneezing over open food items",
        "First aid box accessible with antiseptic"
      ]
    ],
    [
      "Environmental & Structural Safety",
      [
        "Commercial LPG cylinder stored safely",
        "Fire extinguisher inspected and within expiry",
        "Electrical wiring insulated and grounded",
        "Safe effluent / wastewater drainage",
        "Ventilation adequate with smoke exhaust",
        "Public walkway unobstructed"
      ]
    ]
  ];

  // 24 checks total (sections have 6 + 7 + 5 + 6 = 24 checks)
  const total = sections.reduce((acc, s) => acc + s[1].length, 0);

  // Initialize with 18 pre-filled checks to demonstrate 75% default
  const [checks, setChecks] = useState(() => {
    const initial = {};
    let count = 0;
    for (const [, items] of sections) {
      for (const item of items) {
        if (count < 18) {
          initial[item] = count % 5 === 4 ? "Fail" : count % 4 === 3 ? "Partial" : "Pass";
        }
        count++;
      }
    }
    return initial;
  });

  const done = Object.keys(checks).length;
  const percentage = Math.round((done / total) * 100);

  const choose = (item, val) => {
    setChecks((prev) => {
      const next = { ...prev };
      if (next[item] === val) {
        delete next[item];
      } else {
        next[item] = val;
      }
      return next;
    });
  };

  return (
    <div className="page">
      <BackButton label="Vendor Verification" to={`/vendors/${insp.vendorId || "ST-1024"}/inspections/new`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">STEP 2 OF 5 · STANDARDIZED SAFETY CHECKLIST</span>
          <h1>Field Inspection Checklist</h1>
          <p>Evaluate mandatory hygiene, licensing, and structural conditions for {insp.vendor || "the vendor"}.</p>
        </div>
        <div className="autosave" aria-live="polite">
          <span></span> Draft auto-saved
        </div>
      </div>

      <InspectionStepper currentStep={2} />

      <section className="panel inspection-panel" style={{ maxWidth: "840px", margin: "0 auto" }}>
        {/* Inspection Progress Bar */}
        <div className="inspection-progress">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
            <div>
              <strong style={{ fontSize: "14px", fontFamily: "Manrope" }}>Inspection Progress</strong>
              <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "2px" }}>
                {done} of {total} checks completed
              </div>
            </div>
            <span style={{ fontSize: "16px", fontWeight: "800", color: "var(--ink)", fontFamily: "Manrope" }}>
              {percentage}%
            </span>
          </div>
          <div className="progress" style={{ height: "7px" }}>
            <i style={{ width: `${percentage}%` }}></i>
          </div>
        </div>

        {/* Checklist Sections */}
        {sections.map(([name, items]) => (
          <div className="check-section" key={name}>
            <h3>{name}</h3>
            {items.map((item) => {
              const selectedVal = checks[item];
              return (
                <div className="check-row" key={item}>
                  <div style={{ flex: 1, paddingRight: "16px" }}>
                    <strong style={{ fontSize: "13px" }}>{item}</strong>
                    <small style={{ fontSize: "11px" }}>Record compliance observation based on visual inspection.</small>
                  </div>
                  <div className="check-options" role="group" aria-label={`Rating for ${item}`}>
                    {["Pass", "Partial", "Fail", "N/A"].map((val) => {
                      const isSelected = selectedVal === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          className={`${isSelected ? "selected " + val.toLowerCase() : ""}`}
                          onClick={() => choose(item, val)}
                          aria-pressed={isSelected}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        <div className="inspection-footer">
          <button className="secondary-btn" type="button">
            Save draft
          </button>
          <button
            className="primary-btn"
            type="button"
            onClick={() => navigate(`/inspections/${inspectionId}/evidence`)}
          >
            Continue to Evidence <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
