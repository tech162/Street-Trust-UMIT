import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, CheckCircle2, Download, ExternalLink,
  FileCheck, FileText, Image as ImageIcon, Printer,
  Share2, ShieldAlert, Sparkles, UserCheck
} from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { InspectionStepper } from "../../components/InspectionStepper";
import { Logo } from "../../components/Logo";
import { Status } from "../../components/Status";
import { getReport, getInspection, getVendor } from "../../data/mockData";

export function ReportPage() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();

  const [shareToast, setShareToast] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);

  const report = getReport(inspectionId);
  const insp = getInspection(inspectionId);
  const vendor = getVendor(report?.vendorId || insp?.vendorId || "ST-1024");

  const code = report?.code || insp?.code || "ST-INS-2094";
  const vendorName = report?.vendor || insp?.vendor || vendor?.name || "Shree Misal Corner";
  const score = report?.score || 84;

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="page">
      <BackButton label="AI Analysis" to={`/inspections/${inspectionId}/analysis`} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">STEP 5 OF 5 · OFFICIAL REGULATORY DOCUMENT</span>
          <h1>Inspection Report</h1>
          <p>Official municipal health and food safety verification certificate.</p>
        </div>
        <div className="heading-actions">
          <button className="secondary-btn" onClick={handleShare} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Share2 size={16} /> Share Report
          </button>
          <button className="primary-btn" onClick={handleDownload} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Download size={16} /> Download Report
          </button>
        </div>
      </div>

      {shareToast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "var(--ink)",
            color: "var(--card-bg)",
            padding: "12px 20px",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            fontSize: "13px",
            fontWeight: "700",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            animation: "dropIn 0.2s ease"
          }}
        >
          <CheckCircle2 size={16} style={{ color: "var(--green)" }} /> Report link copied to clipboard!
        </div>
      )}

      <InspectionStepper currentStep={5} />

      {/* Official Inspection Report Sheet */}
      <section className="report-sheet panel" style={{ maxWidth: "860px", margin: "0 auto", padding: "36px" }}>
        {/* Document Header */}
        <div className="report-header" style={{ borderBottom: "2px solid var(--ink)", paddingBottom: "20px", marginBottom: "24px" }}>
          <div>
            <Logo />
            <h2 style={{ fontFamily: "Manrope", fontSize: "18px", fontWeight: "800", marginTop: "12px", color: "var(--ink)" }}>
              StreetTrust Food Safety Inspection Report
            </h2>
            <p style={{ fontSize: "11px", color: "var(--muted)", margin: "2px 0 0" }}>
              Municipal Corporation of Nashik · Directorate of Food Safety & Public Health
            </p>
          </div>
          <div className="report-meta" style={{ textAlign: "right" }}>
            <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--muted)", fontWeight: "800" }}>
              Official Certificate ID
            </span>
            <strong style={{ fontSize: "15px", fontFamily: "monospace", display: "block", color: "var(--ink)" }}>
              {code}
            </strong>
            <span style={{ fontSize: "11px", color: "var(--muted)" }}>Date: 15 September 2026</span>
          </div>
        </div>

        {/* 1. Vendor, Inspection, and Inspector Information Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "16px", marginBottom: "26px" }}>
          {/* Vendor Information */}
          <div style={{ background: "var(--subtle-bg)", padding: "16px", borderRadius: "10px", border: "1px solid var(--line)" }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>VENDOR INFORMATION</span>
            <strong style={{ fontSize: "14px", display: "block", color: "var(--ink)", fontFamily: "Manrope" }}>
              {vendorName}
            </strong>
            <p style={{ fontSize: "11px", color: "var(--muted)", margin: "4px 0 8px" }}>
              ID: {vendor?.id || "ST-1024"} · {vendor?.category || "Street Food"}
            </p>
            <div style={{ fontSize: "11px", lineHeight: "1.6", color: "var(--ink)" }}>
              <div><strong>Area:</strong> {vendor?.area || "Nashik Road, Nashik"}</div>
              <div><strong>Proprietor:</strong> {vendor?.owner || "Priya Sharma"}</div>
              <div><strong>Contact:</strong> {vendor?.phone || "+91 98765 43210"}</div>
            </div>
          </div>

          {/* Inspection Information */}
          <div style={{ background: "var(--subtle-bg)", padding: "16px", borderRadius: "10px", border: "1px solid var(--line)" }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>INSPECTION INFORMATION</span>
            <div style={{ fontSize: "11px", lineHeight: "1.6", color: "var(--ink)" }}>
              <div><strong>Inspection ID:</strong> {code}</div>
              <div><strong>Type:</strong> Routine Compliance Audit</div>
              <div><strong>Date & Time:</strong> 15 Sep 2026 · 10:30 AM</div>
              <div><strong>Cycle:</strong> Quarterly Routine Verification</div>
              <div><strong>Next Audit Due:</strong> 12 Dec 2026</div>
            </div>
          </div>

          {/* Inspector Information */}
          <div style={{ background: "var(--subtle-bg)", padding: "16px", borderRadius: "10px", border: "1px solid var(--line)" }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: "8px" }}>INSPECTOR INFORMATION</span>
            <strong style={{ fontSize: "13px", display: "block", color: "var(--ink)", fontFamily: "Manrope" }}>
              Officer Aarav Shah
            </strong>
            <div style={{ fontSize: "11px", lineHeight: "1.6", color: "var(--ink)", marginTop: "4px" }}>
              <div><strong>Badge:</strong> #4092 · Zone 3 Ward</div>
              <div><strong>Jurisdiction:</strong> Nashik Municipal Division</div>
              <div><strong>Signature Status:</strong> <span style={{ color: "var(--green)" }}>Digital Verified ✓</span></div>
            </div>
          </div>
        </div>

        {/* 2. Compliance Score Overview */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--card-bg)",
            border: "2px solid var(--line)",
            borderRadius: "12px",
            padding: "20px 24px",
            marginBottom: "26px",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <strong style={{ fontSize: "38px", fontFamily: "Manrope", color: "var(--ink)" }}>
                  {score}
                </strong>
                <span style={{ fontSize: "16px", color: "var(--muted)" }}>/ 100</span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: "800", textTransform: "uppercase", letterSpacing: ".08em", color: "var(--muted)" }}>
                Official Score
              </span>
            </div>
            <div style={{ borderLeft: "1px solid var(--line)", paddingLeft: "18px" }}>
              <Status>Needs Attention</Status>
              <h4 style={{ margin: "6px 0 2px", fontFamily: "Manrope", fontSize: "14px" }}>
                Conditional Compliance Approved
              </h4>
              <p style={{ margin: 0, fontSize: "11px", color: "var(--muted)" }}>
                Vendor operates satisfactorily but must address 2 remedial items within 14 days.
              </p>
            </div>
          </div>

          <div className="report-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            <div className="info">
              <span>Passed Checks</span>
              <strong style={{ color: "var(--green)" }}>18</strong>
            </div>
            <div className="info">
              <span>Partial Checks</span>
              <strong style={{ color: "var(--amber-text)" }}>4</strong>
            </div>
            <div className="info">
              <span>Failed Checks</span>
              <strong style={{ color: "var(--red)" }}>2</strong>
            </div>
            <div className="info">
              <span>Risk Classification</span>
              <strong>Moderate</strong>
            </div>
          </div>
        </div>

        {/* 3. Compliance Summary */}
        <div style={{ marginBottom: "26px" }}>
          <h3 className="report-section-title">Compliance Summary</h3>
          <p style={{ fontSize: "12px", color: "var(--ink)", lineHeight: "1.6", background: "var(--subtle-bg)", padding: "14px 16px", borderRadius: "8px", border: "1px solid var(--line)", margin: 0 }}>
            Shree Misal Corner underwent comprehensive on-site food safety evaluation. Food handlers displayed proper sanitation habits, valid personal medical records, and maintained clean cooking surfaces. Remedial action is required regarding the waste disposal zone and the visible posting of commercial gas pipe safety certification.
          </p>
        </div>

        {/* 4. Violations & Non-Compliances */}
        <div style={{ marginBottom: "26px" }}>
          <h3 className="report-section-title">Violations & Findings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="finding">
              <span className="finding-dot amber"></span>
              <div style={{ flex: 1 }}>
                <strong>Waste disposal area requires improvement</strong>
                <p>Hygiene · Medium severity · Commercial waste bin was uncovered during preparation hours.</p>
              </div>
              <Status>Medium</Status>
            </div>
            <div className="finding">
              <span className="finding-dot red"></span>
              <div style={{ flex: 1 }}>
                <strong>Commercial gas certification verification required</strong>
                <p>Safety · High severity · Annual safety certificate for LPG installation must be renewed.</p>
              </div>
              <Status>High</Status>
            </div>
          </div>
        </div>

        {/* 5. Observations & Recommendations */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "26px" }}>
          <div>
            <h3 className="report-section-title">Inspector Observations</h3>
            <ul style={{ fontSize: "11px", color: "var(--ink)", lineHeight: "1.6", paddingLeft: "18px", margin: 0 }}>
              <li>Cooking area sanitized before peak service window.</li>
              <li>Drinking water filtered through certified RO system.</li>
              <li>Hand sanitizer and soap available at washing basin.</li>
              <li>Raw spices and flours stored in labeled containers.</li>
            </ul>
          </div>
          <div>
            <h3 className="report-section-title">Mandatory Recommendations</h3>
            <ul style={{ fontSize: "11px", color: "var(--ink)", lineHeight: "1.6", paddingLeft: "18px", margin: 0 }}>
              <li>Replace waste bin with foot-operated pedal cover (7 days).</li>
              <li>Display laminated copy of LPG inspection certificate (14 days).</li>
              <li>Maintain pest control log with quarterly service receipt.</li>
              <li>Schedule follow-up inspector verification by 30 Sep 2026.</li>
            </ul>
          </div>
        </div>

        {/* 6. Evidence Log */}
        <div style={{ marginBottom: "28px" }}>
          <h3 className="report-section-title">Attached Evidence (Photographs & Audio)</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: "var(--subtle-bg)", borderRadius: "8px", border: "1px solid var(--line)", fontSize: "11px" }}>
              <ImageIcon size={15} style={{ color: "var(--amber-text)" }} />
              <span>prep_area_cleanliness.jpg (2.4 MB)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: "var(--subtle-bg)", borderRadius: "8px", border: "1px solid var(--line)", fontSize: "11px" }}>
              <ImageIcon size={15} style={{ color: "var(--amber-text)" }} />
              <span>waste_disposal_bins.jpg (1.8 MB)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", background: "var(--subtle-bg)", borderRadius: "8px", border: "1px solid var(--line)", fontSize: "11px" }}>
              <FileCheck size={15} style={{ color: "var(--green)" }} />
              <span>audio_inspection_notes.wav (0:42)</span>
            </div>
          </div>
        </div>

        {/* Official Certification Footer */}
        <div className="report-footer" style={{ borderTop: "2px solid var(--line)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "10px", color: "var(--muted)", display: "block" }}>
              Verified under StreetTrust Digital Food Compliance Standards · Official seal applied
            </span>
            <small style={{ fontSize: "9px", color: "var(--muted)" }}>
              Report Hash: SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069
            </small>
          </div>
          <button
            className="primary-btn"
            onClick={() => {
              setIsFinalized(true);
              setTimeout(() => navigate("/dashboard"), 1200);
            }}
            disabled={isFinalized}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            {isFinalized ? (
              <>Report Finalized ✓</>
            ) : (
              <>
                Finalize & Publish to Registry <CheckCircle2 size={17} />
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
