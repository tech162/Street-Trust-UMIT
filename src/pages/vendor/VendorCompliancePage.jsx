import React from "react";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";

function Bar({ label, value }) {
  return (
    <div className="bar-row">
      <span>{label}</span>
      <div><i style={{ width: value + "%" }}></i></div>
      <strong>{value}%</strong>
    </div>
  );
}

export function VendorCompliancePage() {
  return (
    <div className="page">
      <BackButton label="Dashboard" to="/vendor/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">COMPLIANCE METRICS</span>
          <h1>Trust & Compliance Breakdown</h1>
          <p>Detailed rating and audit criteria performance for Shree Misal Corner.</p>
        </div>
      </div>

      <div className="profile-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Overall Rating</h3>
              <p>Current trust index score</p>
            </div>
            <Status>Good Standing</Status>
          </div>
          <div className="score-large">
            <div className="score-ring" style={{ "--score": 92 }}>
              <div><strong>92</strong><small>/100</small></div>
            </div>
            <div>
              <h2>Good standing</h2>
              <p>Last verified 12 September 2026</p>
            </div>
          </div>
          <div className="category-bars">
            <Bar label="Hygiene" value={91} />
            <Bar label="Documentation" value={95} />
            <Bar label="Safety" value={90} />
            <Bar label="Operations" value={92} />
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Recommendations</h3>
              <p>Tips to achieve a perfect 100 score</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "11px", color: "var(--muted)" }}>
            <p>✔ Maintain regular temperature logs for food storage.</p>
            <p>✔ Renew Fire Safety Certificate before October 18, 2026.</p>
            <p>✔ Display public verification QR prominently at vendor counter.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
