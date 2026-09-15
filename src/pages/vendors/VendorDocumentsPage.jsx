import React from "react";
import { useParams } from "react-router-dom";
import { FileText, ShieldCheck, Upload } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { getVendor } from "../../data/mockData";

export function VendorDocumentsPage() {
  const { vendorId } = useParams();
  const v = getVendor(vendorId);

  const docs = [
    { title: "Food Safety Registration (FSSAI)", number: "FSSAI-8839201923", status: "Verified", exp: "14 Dec 2027" },
    { title: "Municipal Trade License", number: "TL-NMK-2025-992", status: "Verified", exp: "31 Mar 2027" },
    { title: "Fire Safety Certificate", number: "FSC-2026-4410", status: "Pending Review", exp: "18 Oct 2026" },
    { title: "Water Quality Testing Report", number: "WQR-884-2026", status: "Verified", exp: "05 Nov 2026" }
  ];

  return (
    <div className="page">
      <BackButton label="Vendor Profile" to={`/vendors/${vendorId}`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">VENDOR DOCUMENTS · {v?.id || vendorId}</span>
          <h1>{v ? `${v.name} Documents` : "Vendor Documents"}</h1>
          <p>Review legal licenses, safety certificates and compliance records.</p>
        </div>
        <button className="primary-btn">
          <Upload size={17} /> Upload Document
        </button>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div>
            <h3>Submitted Business Records</h3>
            <p>Documents verified by compliance inspectors</p>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Document Title</th>
                <th>License / Ref No</th>
                <th>Expiration Date</th>
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
                    <button className="ghost-btn">View PDF</button>
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
