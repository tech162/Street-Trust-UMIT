import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardCheck, Search } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { inspectionRows } from "../../data/mockData";

export function InspectionsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  return (
    <div className="page">
      <BackButton label="Dashboard" to="/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">INSPECTION MANAGEMENT</span>
          <h1>Field Inspections</h1>
          <p>Track, schedule and review field compliance inspections.</p>
        </div>
        <button className="primary-btn" onClick={() => navigate("/vendors/ST-1024/inspections/new")}>
          <ClipboardCheck size={17} /> Start New Inspection
        </button>
      </div>

      <section className="panel">
        <div className="toolbar">
          <div className="search-box">
            <Search size={17} />
            <input placeholder="Search inspection ID, vendor name, location..." />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Compliant</option>
            <option>Warning</option>
            <option>Overdue</option>
          </select>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Inspection Code</th>
                <th>Vendor</th>
                <th>Location</th>
                <th>Last Inspection</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inspectionRows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <strong>{r.code}</strong>
                  </td>
                  <td>
                    <Link to={`/vendors/${r.vendorId}`} style={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}>
                      {r.vendor}
                    </Link>
                  </td>
                  <td>{r.location}</td>
                  <td>{r.last}</td>
                  <td>{r.due}</td>
                  <td><Status>{r.status}</Status></td>
                  <td><strong className="score-text">{r.score}</strong>/100</td>
                  <td>
                    <Link to={`/inspections/${r.id}`} className="ghost-btn">
                      View Inspection
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
