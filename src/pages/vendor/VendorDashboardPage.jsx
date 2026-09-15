import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, ClipboardCheck, FileText, QrCode, ShieldCheck
} from "lucide-react";
import { KPI } from "../../components/KPI";
import { Status } from "../../components/Status";
import { InspectionTable } from "../../components/InspectionTable";

export function VendorDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">VENDOR PORTAL</span>
          <h1>Good morning, Priya.</h1>
          <p>Here’s the latest compliance status for Shree Misal Corner.</p>
        </div>
        <button className="secondary-btn" onClick={() => navigate("/vendor/qr")}>
          <QrCode size={17} /> View QR
        </button>
      </div>

      <div className="kpi-grid four">
        <KPI label="Trust Score" value="92" detail="+3 since last inspection" icon={ShieldCheck} kind="green" />
        <KPI label="Compliance" value="Good" detail="No critical issues" icon={CheckCircle2} kind="green" />
        <KPI label="Next Inspection" value="12 Dec" detail="88 days remaining" icon={ClipboardCheck} kind="amber" />
        <KPI label="Documents Expiring" value="1" detail="Within 30 days" icon={FileText} kind="red" />
      </div>

      <div className="vendor-dash-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Current compliance</h3>
              <p>Your public trust profile is healthy.</p>
            </div>
            <Status>Good Standing</Status>
          </div>
          <div className="vendor-score-row">
            <div className="score-ring" style={{ "--score": 92 }}>
              <div><strong>92</strong><small>/100</small></div>
            </div>
            <div>
              <h2>Good standing</h2>
              <p>Last verified 12 September 2026</p>
              <Link to="/vendor/compliance" className="text-btn">
                View compliance details <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="panel action-panel">
          <h3>Action required</h3>
          <div className="action-item">
            <div className="action-icon"><FileText /></div>
            <div>
              <strong>Safety certificate expires soon</strong>
              <p>Upload an updated certificate within 12 days.</p>
              <Link to="/vendor/documents" className="text-btn">
                Upload certificate <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Recent inspection</h3>
            <p>Your latest finalized inspection report.</p>
          </div>
          <Link to="/vendor/inspections" className="primary-btn">
            View report <ArrowRight size={16} />
          </Link>
        </div>
        <InspectionTable
          rows={[
            { vendor: "Shree Misal Corner", location: "Nashik Road", last: "12 Sep 2026", due: "12 Dec 2026", status: "Compliant", score: 92 }
          ]}
        />
      </section>
    </div>
  );
}
