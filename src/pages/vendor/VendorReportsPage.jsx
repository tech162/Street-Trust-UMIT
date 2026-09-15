import React from "react";
import { Link } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { reports } from "../../data/mockData";

export function VendorReportsPage() {
  const vendorReports = reports.filter((r) => r.vendorId === "ST-1024" || r.vendor.includes("Misal"));

  return (
    <div className="page">
      <BackButton label="Dashboard" to="/vendor/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">MY COMPLIANCE REPORTS</span>
          <h1>Finalized Audit Reports</h1>
          <p>Download or view published inspection certificates.</p>
        </div>
      </div>

      <section className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Report Code</th>
                <th>Assessment Date</th>
                <th>Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendorReports.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.code}</strong></td>
                  <td>{r.date}</td>
                  <td><strong className="score-text">{r.score}</strong>/100</td>
                  <td><Status>{r.status}</Status></td>
                  <td>
                    <Link to={`/vendor/inspections/${r.inspectionId}`} className="ghost-btn">
                      View Details
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
