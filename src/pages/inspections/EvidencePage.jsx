import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight, Camera, Check, Image as ImageIcon,
  Mic, MicOff, Play, Trash2, UploadCloud, Volume2
} from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { InspectionStepper } from "../../components/InspectionStepper";

export function EvidencePage() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([
    { id: 1, name: "prep_area_cleanliness.jpg", size: "2.4 MB", tag: "Prep Area", time: "10:14 AM" },
    { id: 2, name: "waste_disposal_bins.jpg", size: "1.8 MB", tag: "Waste Disposal", time: "10:18 AM" }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [voiceNotes, setVoiceNotes] = useState([
    { id: "v1", duration: "0:42", time: "10:21 AM", label: "Inspector Remarks on ventilation" }
  ]);

  const [observation, setObservation] = useState(
    "Waste bins are segregated but kitchen drainage grate requires cleaning before evening service. All cooking staff observed wearing clean aprons and head caps."
  );
  const [category, setCategory] = useState("Hygiene");
  const [severity, setSeverity] = useState("Medium");

  const handleSimulateUpload = () => {
    const newId = photos.length + 1;
    setPhotos((prev) => [
      ...prev,
      {
        id: newId,
        name: `evidence_capture_${newId}.jpg`,
        size: "2.1 MB",
        tag: "Safety Equipment",
        time: "Just now"
      }
    ]);
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setVoiceNotes((prev) => [
        ...prev,
        {
          id: `v${prev.length + 1}`,
          duration: `0:${recordSeconds < 10 ? "0" + recordSeconds : recordSeconds}`,
          time: "Just now",
          label: "Field audio observation"
        }
      ]);
      setRecordSeconds(0);
    } else {
      setIsRecording(true);
      setRecordSeconds(1);
    }
  };

  return (
    <div className="page">
      <BackButton label="Checklist" to={`/inspections/${inspectionId}/checklist`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">STEP 3 OF 5 · FIELD EVIDENCE GATHERING</span>
          <h1>Inspection Evidence</h1>
          <p>Attach photographic proofs, spoken voice notes, and detailed observations.</p>
        </div>
      </div>

      <InspectionStepper currentStep={3} />

      <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Photo Evidence Section */}
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Photo Evidence</h3>
              <p>Capture real-time stall photos or upload inspection images (JPG, PNG).</p>
            </div>
            <button className="secondary-btn" onClick={handleSimulateUpload} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <UploadCloud size={16} /> Choose Files
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px", marginTop: "12px" }}>
            {/* Camera / Upload Tile */}
            <button
              className="upload-tile"
              onClick={handleSimulateUpload}
              style={{ minHeight: "150px", border: "2px dashed var(--line)", background: "var(--subtle-bg)", cursor: "pointer" }}
            >
              <span style={{ width: "44px", height: "44px", borderRadius: "12px", background: "var(--card-bg)" }}>
                <Camera size={22} />
              </span>
              <strong style={{ fontSize: "12px" }}>Take Photo / Upload</strong>
              <small style={{ fontSize: "10px", color: "var(--muted)" }}>Click to add evidence photo</small>
            </button>

            {/* Photo Preview Cards */}
            {photos.map((p) => (
              <div
                key={p.id}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--line)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
                }}
              >
                <div
                  style={{
                    height: "95px",
                    background: "var(--subtle-bg)",
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                    borderBottom: "1px solid var(--line)"
                  }}
                >
                  <ImageIcon size={32} style={{ color: "var(--muted)" }} />
                  <span
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      left: "8px",
                      background: "rgba(0,0,0,0.65)",
                      color: "white",
                      fontSize: "9px",
                      fontWeight: "700",
                      padding: "2px 6px",
                      borderRadius: "4px"
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div style={{ padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ overflow: "hidden" }}>
                    <strong style={{ display: "block", fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {p.name}
                    </strong>
                    <small style={{ fontSize: "9px", color: "var(--muted)" }}>
                      {p.size} · {p.time}
                    </small>
                  </div>
                  <button
                    onClick={() => removePhoto(p.id)}
                    style={{ background: "none", border: "none", color: "var(--muted)", cursor: "pointer", padding: "4px" }}
                    title="Remove photo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Voice Note Section */}
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Voice Notes & Audio Remarks</h3>
              <p>Record hands-free spoken observations for faster in-field documentation.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap", marginTop: "10px" }}>
            <button
              onClick={toggleRecording}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                borderRadius: "99px",
                border: "none",
                background: isRecording ? "var(--red)" : "var(--ink)",
                color: "white",
                fontFamily: "Manrope",
                fontWeight: "800",
                fontSize: "13px",
                cursor: "pointer",
                transition: "transform 0.15s ease",
                boxShadow: isRecording ? "0 0 0 5px rgba(239, 68, 68, 0.25)" : "none"
              }}
            >
              {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              {isRecording ? `Recording (${recordSeconds}s) · Tap to Stop` : "Tap to Record Voice Note"}
            </button>

            {voiceNotes.length > 0 && (
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {voiceNotes.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      background: "var(--subtle-bg)",
                      border: "1px solid var(--line)"
                    }}
                  >
                    <button
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "var(--card-bg)",
                        border: "1px solid var(--line)",
                        display: "grid",
                        placeItems: "center",
                        color: "var(--ink)"
                      }}
                    >
                      <Play size={13} style={{ marginLeft: "2px" }} />
                    </button>
                    <div>
                      <strong style={{ fontSize: "11px", display: "block" }}>{v.label}</strong>
                      <small style={{ fontSize: "9px", color: "var(--muted)" }}>
                        {v.duration} · {v.time}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Detailed Written Observation */}
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Inspector Written Observation</h3>
              <p>Comprehensive notes detailing observed hygiene infractions or commendations.</p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "8px" }}>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Describe observed conditions, non-compliances, corrective advice given to vendor..."
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                fontFamily: "inherit",
                fontSize: "13px",
                lineHeight: "1.5"
              }}
            />

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "160px" }}>
                <label style={{ fontSize: "11px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                  Primary Domain
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--line)" }}
                >
                  <option>Hygiene & Cleanliness</option>
                  <option>Safety & Hazardous Equipment</option>
                  <option>Documentation & Licensing</option>
                  <option>Waste Management</option>
                </select>
              </div>

              <div style={{ flex: 1, minWidth: "160px" }}>
                <label style={{ fontSize: "11px", fontWeight: "700", display: "block", marginBottom: "4px" }}>
                  Infraction Severity
                </label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid var(--line)" }}
                >
                  <option>Low Severity</option>
                  <option>Medium Severity</option>
                  <option>High Severity</option>
                  <option>Critical Threat</option>
                </select>
              </div>
            </div>
          </div>

          <div className="inspection-footer" style={{ marginTop: "24px" }}>
            <button
              className="secondary-btn"
              type="button"
              onClick={() => navigate(`/inspections/${inspectionId}/checklist`)}
            >
              Back to Checklist
            </button>
            <button
              className="primary-btn"
              type="button"
              onClick={() => navigate(`/inspections/${inspectionId}/analysis`)}
            >
              Proceed to AI Analysis <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
