import React from "react";
import { useParams, Link } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { Logo } from "../../components/Logo";
import { Status } from "../../components/Status";
import { getReport } from "../../data/mockData";

function Info({ label, value }) {
  return (
    <div className="info">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function ReportDetailPage() {
  const { reportId } = useParams();
  const r = getReport(reportId);

  if (!r) {
    return (
      <div className="page">
        <BackButton label="Reports" to="/reports" />
        <div className="empty-hero panel">
          <h1>Report Not Found</h1>
          <p>The requested report (ID: {reportId}) does not exist.</p>
          <Link to="/reports" className="primary-btn">Return to Reports</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <BackButton label="Reports" to="/reports" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">REPORT DETAILS · {r.code}</span>
          <h1>{r.vendor} Inspection Report</h1>
          <p>Finalized compliance evaluation record.</p>
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
            <span>Report ID</span>
            <strong>{r.code}</strong>
            <span>{r.date}</span>
          </div>
        </div>

        <div className="report-vendor">
          <div>
            <span className="eyebrow">VENDOR</span>
            <h2>{r.vendor}</h2>
            <p>{r.vendorId} · Street Food</p>
          </div>
          <div className="report-score">
            <strong>{r.score}</strong>
            <span>/100</span>
            <Status>{r.status}</Status>
          </div>
        </div>

        <div className="report-stats">
          <Info label="Passed checks" value={r.stats.passed} />
          <Info label="Partial checks" value={r.stats.partial} />
          <Info label="Failed checks" value={r.stats.failed} />
          <Info label="Risk level" value={r.stats.risk} />
        </div>

        <h3 className="report-section-title">Priority findings</h3>
        {r.findings.map((f, i) => (
          <div className="finding" key={i}>
            <span className={"finding-dot " + (f.severity === "High" ? "red" : "")}></span>
            <div>
              <strong>{f.title}</strong>
              <p>{f.desc}</p>
            </div>
            <Status>{f.severity}</Status>
          </div>
        ))}
      </section>
    </div>
  );
}
