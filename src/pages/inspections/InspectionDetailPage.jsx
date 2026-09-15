import React from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, FileText, Sparkles } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { getInspection, getVendor } from "../../data/mockData";

export function InspectionDetailPage() {
  const { inspectionId } = useParams();
  const insp = getInspection(inspectionId);
  const vendor = insp ? getVendor(insp.vendorId) : null;

  if (!insp) {
    return (
      <div className="page">
        <BackButton label="Inspections" to="/inspections" />
        <div className="empty-hero panel">
          <h1>Inspection Not Found</h1>
          <p>The requested inspection (ID: {inspectionId}) does not exist.</p>
          <Link to="/inspections" className="primary-btn">Return to Inspections List</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <BackButton label="Inspections" to="/inspections" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">INSPECTION RECORD · {insp.code}</span>
          <h1>{insp.vendor} Inspection</h1>
          <p>Location: {insp.location} · Conducted on {insp.last}</p>
        </div>
        <div className="heading-actions">
          <Link to={`/inspections/${insp.id}/analysis`} className="secondary-btn">
            <Sparkles size={16} /> View AI Analysis
          </Link>
          <Link to={`/inspections/${insp.id}/report`} className="primary-btn">
            <FileText size={16} /> View Full Report
          </Link>
        </div>
      </div>

      <div className="profile-hero panel">
        <div className="profile-logo">{insp.vendor[0]}</div>
        <div className="profile-title">
          <div>
            <span className="eyebrow">VENDOR ID: {insp.vendorId}</span>
            <h2>{insp.vendor}</h2>
            <p>Score: {insp.score}/100 · Next Inspection: {insp.due}</p>
          </div>
          <Status>{insp.status}</Status>
        </div>
      </div>

      <div className="panel" style={{ marginTop: "20px" }}>
        <div className="panel-head">
          <div>
            <h3>Inspection Summary</h3>
            <p>Standardized check results and auditor observations</p>
          </div>
        </div>

        <div className="report-checks">
          <div><span>Business registration valid</span><Status>Pass</Status></div>
          <div><span>Required licenses available</span><Status>Pass</Status></div>
          <div><span>Premises clean & hygienic</span><Status>Pass</Status></div>
          <div><span>Waste disposal appropriate</span><Status>Partial</Status></div>
          <div><span>Fire safety equipment certified</span><Status>Fail</Status></div>
        </div>
      </div>
    </div>
  );
}
