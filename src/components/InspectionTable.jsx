import React from "react";
import { Link } from "react-router-dom";
import { Status } from "./Status";

export function InspectionTable({ rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Location</th>
            <th>Last inspection</th>
            <th>Status</th>
            <th>Score</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const vendorId = r.vendorId || (r.vendor.includes("Misal") ? "ST-1024" : r.vendor.includes("Ganga") ? "ST-1152" : r.vendor.includes("Annapurna") ? "ST-1041" : "ST-1115");
            const inspectionId = r.id || `inspection-${i + 1}`;
            return (
              <tr key={r.vendor + i}>
                <td>
                  <div className="table-vendor">
                    <div className="mini-avatar">{r.vendor[0]}</div>
                    <strong>{r.vendor}</strong>
                  </div>
                </td>
                <td>{r.location}</td>
                <td>{r.last}</td>
                <td><Status>{r.status}</Status></td>
                <td>
                  <div className="score-bar-wrap">
                    <div className="score-num">
                      <strong className="score-text">{r.score}</strong>
                      <span className="outof">/100</span>
                    </div>
                    <div className="score-bar-track">
                      <div
                        className={`score-bar-fill ${r.score >= 85 ? "green" : r.score >= 70 ? "amber" : "red"}`}
                        style={{ width: `${r.score}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <Link to={`/vendors/${vendorId}`} className="ghost-btn">
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
