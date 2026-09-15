import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ClipboardCheck } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { InspectionTable } from "../../components/InspectionTable";
import { getVendor } from "../../data/mockData";

function Bar({ label, value }) {
  return (
    <div className="bar-row">
      <span>{label}</span>
      <div><i style={{ width: value + "%" }}></i></div>
      <strong>{value}%</strong>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="info">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function VendorDetailPage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const v = getVendor(vendorId);

  if (!v) {
    return (
      <div className="page">
        <BackButton label="Vendors" to="/vendors" />
        <div className="empty-hero panel">
          <h1>Vendor Not Found</h1>
          <p>The requested vendor (ID: {vendorId}) does not exist in our system.</p>
          <Link to="/vendors" className="primary-btn">
            Return to Vendors Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <BackButton label="Vendors" to="/vendors" />

      <div className="profile-hero panel">
        <div className="profile-logo">{v.name[0]}</div>
        <div className="profile-title">
          <div>
            <span className="eyebrow">VENDOR {v.id}</span>
            <h1>{v.name}</h1>
            <p>{v.category} · {v.area}</p>
          </div>
          <Status>{v.status}</Status>
        </div>
        <div className="profile-actions">
          <Link to={`/vendors/${v.id}/documents`} className="secondary-btn">
            Documents
          </Link>
          <button className="primary-btn" onClick={() => navigate(`/vendors/${v.id}/inspections/new`)}>
            <ClipboardCheck size={17} /> Start new inspection
          </button>
        </div>
      </div>

      <div className="profile-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Trust & compliance</h3>
              <p>Current verification overview</p>
            </div>
            <Status>{v.risk} risk</Status>
          </div>
          <div className="score-large">
            <div className="score-ring" style={{ "--score": v.score }}>
              <div><strong>{v.score}</strong><small>/100</small></div>
            </div>
            <div>
              <h2>{v.score >= 90 ? "Excellent" : v.score >= 75 ? "Good standing" : v.score >= 60 ? "Needs attention" : "Non-compliant"}</h2>
              <p>Overall compliance score</p>
            </div>
          </div>
          <div className="category-bars">
            <Bar label="Hygiene" value={v.score - 3} />
            <Bar label="Documentation" value={Math.min(100, v.score + 3)} />
            <Bar label="Safety" value={v.score - 1} />
            <Bar label="Operations" value={v.score} />
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Business information</h3>
              <p>Registered vendor details</p>
            </div>
          </div>
          <div className="info-grid">
            <Info label="Vendor ID" value={v.id} />
            <Info label="Owner" value={v.owner} />
            <Info label="Phone" value={v.phone} />
            <Info label="Email" value={v.email} />
            <Info label="Address" value={`Near ${v.area}, Nashik`} />
            <Info label="Operating hours" value={v.hours} />
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Inspection history</h3>
            <p>Recent inspection records and outcomes</p>
          </div>
        </div>
        <InspectionTable
          rows={[
            { vendor: v.name, location: v.area, last: v.last, due: v.due, status: v.status, score: v.score },
            { vendor: v.name, location: v.area, last: "16 Jun 2026", due: "16 Sep 2026", status: "Compliant", score: 91 }
          ]}
        />
      </section>
    </div>
  );
}
