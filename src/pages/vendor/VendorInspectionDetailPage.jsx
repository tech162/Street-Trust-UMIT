import React from "react";
import { useParams, Link } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { getInspection } from "../../data/mockData";

export function VendorInspectionDetailPage() {
  const { inspectionId } = useParams();
  const insp = getInspection(inspectionId) || { code: "ST-INS-2094", last: "12 Sep 2026", score: 92, status: "Compliant" };

  return (
    <div className="page">
      <BackButton label="Inspections" to="/vendor/inspections" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">INSPECTION RECORD · {insp.code}</span>
          <h1>Audit Report: {insp.code}</h1>
          <p>Conducted on {insp.last}</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Official Findings</h3>
            <p>Inspector verified compliance score: {insp.score}/100</p>
          </div>
          <Status>{insp.status}</Status>
        </div>

        <div className="report-checks" style={{ marginTop: "15px" }}>
          <div><span>Hygiene & Cleanliness</span><Status>Pass</Status></div>
          <div><span>Food Storage Standards</span><Status>Pass</Status></div>
          <div><span>Waste Management</span><Status>Pass</Status></div>
          <div><span>Safety Equipment</span><Status>Pass</Status></div>
        </div>
      </div>
    </div>
  );
}
