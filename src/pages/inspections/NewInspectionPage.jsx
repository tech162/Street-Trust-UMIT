import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { getVendor } from "../../data/mockData";

export function NewInspectionPage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const v = getVendor(vendorId) || { id: vendorId || "ST-1024", name: "Shree Misal Corner" };
  const inspectionId = "inspection-1"; // Or dynamic generated ID

  const [type, setType] = useState("Routine");

  const handleStart = (e) => {
    e.preventDefault();
    navigate(`/inspections/${inspectionId}/checklist`);
  };

  return (
    <div className="page">
      <BackButton label="Vendor Profile" to={`/vendors/${v.id}`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">NEW INSPECTION · {v.id}</span>
          <h1>Initiate Field Inspection</h1>
          <p>Start a new compliance evaluation for {v.name}.</p>
        </div>
      </div>

      <section className="panel" style={{ maxWidth: "600px" }}>
        <form onSubmit={handleStart}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "700", fontSize: "12px", display: "block", marginBottom: "5px" }}>
              Inspection Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{ width: "100%", padding: "11px", borderRadius: "8px", border: "1px solid var(--line)" }}
            >
              <option>Routine Compliance</option>
              <option>Follow-up Verification</option>
              <option>Complaint Investigation</option>
              <option>Renewal Assessment</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "700", fontSize: "12px", display: "block", marginBottom: "5px" }}>
              Assigned Inspector
            </label>
            <input
              type="text"
              readOnly
              value="Aarav Shah (Inspector #4092)"
              style={{ width: "100%", padding: "11px", borderRadius: "8px", border: "1px solid var(--line)" }}
            />
          </div>

          <button className="primary-btn full" type="submit">
            <ClipboardCheck size={17} /> Proceed to Checklist <ArrowRight size={17} />
          </button>
        </form>
      </section>
    </div>
  );
}
