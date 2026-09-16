import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardCheck, Store, MapPin, User, Calendar } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { InspectionStepper } from "../../components/InspectionStepper";
import { getVendor } from "../../data/mockData";

export function NewInspectionPage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const v = getVendor(vendorId) || { id: vendorId || "ST-1024", name: "Shree Misal Corner", area: "Nashik Road", category: "Street Food", owner: "Priya Sharma" };
  const inspectionId = "inspection-1";

  const [type, setType] = useState("Routine Compliance");
  const [scheduledDate, setScheduledDate] = useState("2026-09-16");

  const handleStart = (e) => {
    e.preventDefault();
    navigate(`/inspections/${inspectionId}/checklist`);
  };

  return (
    <div className="page">
      <BackButton label="Vendor Profile" to={`/vendors/${v.id}`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">STEP 1 OF 5 · FIELD INSPECTION INITIATION</span>
          <h1>Initiate Field Inspection</h1>
          <p>Verify vendor profile parameters and begin standardized evaluation.</p>
        </div>
      </div>

      <InspectionStepper currentStep={1} />

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Vendor Summary Card */}
        <div className="panel" style={{ marginBottom: "18px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div className="mini-avatar" style={{ width: "48px", height: "48px", fontSize: "18px", borderRadius: "12px" }}>
              {v.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h3 style={{ margin: 0, fontFamily: "Manrope", fontSize: "16px" }}>{v.name}</h3>
                <span className="status compliant">Active License</span>
              </div>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "var(--muted)" }}>
                ID: {v.id} · {v.category} · {v.area || "Nashik Road"}
              </p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--line)" }}>
            <div className="info">
              <span>Proprietor</span>
              <strong>{v.owner || "Priya Sharma"}</strong>
            </div>
            <div className="info">
              <span>Operating Hours</span>
              <strong>{v.hours || "8:00 AM – 10:00 PM"}</strong>
            </div>
            <div className="info">
              <span>Last Inspected</span>
              <strong>{v.last || "12 Sep 2026"}</strong>
            </div>
          </div>
        </div>

        {/* Configuration Form */}
        <section className="panel">
          <form onSubmit={handleStart}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontWeight: "700", fontSize: "12px", display: "block", marginBottom: "6px" }}>
                Inspection Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "9px", border: "1px solid var(--line)" }}
              >
                <option>Routine Compliance</option>
                <option>Follow-up Verification</option>
                <option>Complaint Investigation</option>
                <option>Renewal Assessment</option>
              </select>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontWeight: "700", fontSize: "12px", display: "block", marginBottom: "6px" }}>
                Inspection Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                style={{ width: "100%", padding: "12px", borderRadius: "9px", border: "1px solid var(--line)" }}
              >
              </input>
            </div>

            <div style={{ marginBottom: "22px" }}>
              <label style={{ fontWeight: "700", fontSize: "12px", display: "block", marginBottom: "6px" }}>
                Assigned Inspector
              </label>
              <input
                type="text"
                readOnly
                value="Aarav Shah (Inspector #4092 · Nashik Municipal Authority)"
                style={{ width: "100%", padding: "12px", borderRadius: "9px", border: "1px solid var(--line)", background: "var(--subtle-bg)" }}
              />
            </div>

            <button className="primary-btn full" type="submit" style={{ padding: "14px" }}>
              <ClipboardCheck size={18} /> Confirm Vendor & Proceed to Checklist <ArrowRight size={18} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
