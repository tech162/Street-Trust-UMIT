import React from "react";
import { FileText, Upload } from "lucide-react";
import { BackButton } from "../../components/BackButton";

export function VendorDocumentsPage() {
  const docs = [
    { title: "Food Safety Registration (FSSAI)", number: "FSSAI-8839201923", status: "Verified", exp: "14 Dec 2027" },
    { title: "Municipal Trade License", number: "TL-NMK-2025-992", status: "Verified", exp: "31 Mar 2027" },
    { title: "Fire Safety Certificate", number: "FSC-2026-4410", status: "Action Needed", exp: "18 Oct 2026" },
    { title: "Water Quality Testing Report", number: "WQR-884-2026", status: "Verified", exp: "05 Nov 2026" }
  ];

  return (
    <div className="page">
      <BackButton label="Vendor Profile" to="/vendor/profile" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">MY DOCUMENTS</span>
          <h1>Licenses & Certificates</h1>
          <p>Upload and manage compliance credentials for your business.</p>
        </div>
        <button className="primary-btn">
          <Upload size={17} /> Upload New Certificate
        </button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Document</th>
                <th>Registration #</th>
                <th>Expires</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <FileText size={18} style={{ color: "var(--amber-text)" }} />
                      <strong>{d.title}</strong>
                    </div>
                  </td>
                  <td>{d.number}</td>
                  <td>{d.exp}</td>
                  <td>
                    <span className={"status " + (d.status === "Verified" ? "compliant" : "warning")}>
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <button className="ghost-btn">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
