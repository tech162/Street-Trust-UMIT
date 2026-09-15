import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { Logo } from "../../components/Logo";
import { Status } from "../../components/Status";
import { getReport, getInspection } from "../../data/mockData";

function Info({ label, value }) {
  return (
    <div className="info">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function ReportPage() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();
  const report = getReport(inspectionId);
  const insp = getInspection(inspectionId);

  const code = report?.code || insp?.code || "ST-INS-2094";
  const vendorName = report?.vendor || insp?.vendor || "Shree Misal Corner";
  const score = report?.score || 84;

  return (
    <div className="page">
      <BackButton label="Analysis" to={`/inspections/${inspectionId}/analysis`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">INSPECTION REPORT · {code}</span>
          <h1>Inspection report</h1>
          <p>AI-assisted draft reviewed by the assigned inspector.</p>
        </div>
        <div className="heading-actions">
          <button className="secondary-btn">Print</button>
          <button className="primary-btn">Download PDF</button>
        </div>
      </div>

      <section className="report-sheet panel">
        <div className="report-header">
          <Logo />
          <div className="report-meta">
            <span>Inspection ID</span>
            <strong>{code}</strong>
            <span>15 September 2026</span>
          </div>
        </div>

        <div className="report-vendor">
          <div>
            <span className="eyebrow">VENDOR</span>
            <h2>{vendorName}</h2>
            <p>ST-1024 · Street Food · Nashik Road, Nashik</p>
          </div>
          <div className="report-score">
            <strong>{score}</strong>
            <span>/100</span>
            <Status>Needs Attention</Status>
          </div>
        </div>

        <div className="report-stats">
          <Info label="Passed checks" value="18" />
          <Info label="Partial checks" value="4" />
          <Info label="Failed checks" value="2" />
          <Info label="Risk level" value="Moderate" />
        </div>

        <h3 className="report-section-title">Checklist results</h3>
        <div className="report-checks">
          {[
            "Business registration valid",
            "Required licenses available",
            "Premises clean",
            "Waste disposal appropriate",
            "Fire safety equipment",
            "Operating standards followed"
          ].map((x, i) => (
            <div key={x}>
              <span>{x}</span>
              <Status>{i === 4 ? "Fail" : i === 3 ? "Partial" : "Pass"}</Status>
            </div>
          ))}
        </div>

        <h3 className="report-section-title">Priority findings</h3>
        <div className="finding">
          <span className="finding-dot"></span>
          <div>
            <strong>Waste disposal area requires improvement</strong>
            <p>Improve waste segregation and cleaning around the food preparation area.</p>
          </div>
          <Status>Medium</Status>
        </div>
        <div className="finding">
          <span className="finding-dot red"></span>
          <div>
            <strong>Safety evidence needs confirmation</strong>
            <p>Verify current safety equipment certification before final publication.</p>
          </div>
          <Status>High</Status>
        </div>

        <div className="report-footer">
          <span>AI-generated insights require inspector review.</span>
          <button className="primary-btn" onClick={() => navigate("/dashboard")}>
            Finalize report <CheckCircle2 size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
