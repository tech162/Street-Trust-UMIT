import React from "react";
import { Link } from "react-router-dom";
import { FileText, Search } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { reports } from "../../data/mockData";

export function ReportsPage() {
  return (
    <div className="page">
      <BackButton label="Dashboard" to="/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">COMPLIANCE REPORTS</span>
          <h1>Inspection Reports</h1>
          <p>Archived and active field compliance assessment reports.</p>
        </div>
      </div>

      <section className="panel">
        <div className="toolbar">
          <div className="search-box">
            <Search size={17} />
            <input placeholder="Search report ID, vendor or date..." />
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Report Code</th>
                <th>Vendor</th>
                <th>Assessment Date</th>
                <th>Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.code}</strong></td>
                  <td>{r.vendor}</td>
                  <td>{r.date}</td>
                  <td><strong className="score-text">{r.score}</strong>/100</td>
                  <td><Status>{r.status}</Status></td>
                  <td>
                    <Link to={`/reports/${r.id}`} className="ghost-btn">
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
