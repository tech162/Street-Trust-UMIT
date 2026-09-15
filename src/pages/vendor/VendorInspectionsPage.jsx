import React from "react";
import { Link } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { inspectionRows } from "../../data/mockData";

export function VendorInspectionsPage() {
  const vendorRows = inspectionRows.filter((r) => r.vendorId === "ST-1024" || r.vendor.includes("Misal"));

  return (
    <div className="page">
      <BackButton label="Dashboard" to="/vendor/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">MY INSPECTIONS</span>
          <h1>Inspection History</h1>
          <p>Past audits and audit outcomes for Shree Misal Corner.</p>
        </div>
      </div>

      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Inspection Code</th>
                <th>Date</th>
                <th>Status</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendorRows.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.code}</strong></td>
                  <td>{r.last}</td>
                  <td><Status>{r.status}</Status></td>
                  <td><strong className="score-text">{r.score}</strong>/100</td>
                  <td>
                    <Link to={`/vendor/inspections/${r.id}`} className="ghost-btn">
                      View Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
