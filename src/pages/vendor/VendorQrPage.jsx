import React from "react";
import { Link } from "react-router-dom";
import { QrCode, ArrowRight, ShieldCheck } from "lucide-react";
import { BackButton } from "../../components/BackButton";

export function VendorQrPage() {
  const publicLink = "/public/verify/ST-1024";

  return (
    <div className="page">
      <BackButton label="Dashboard" to="/vendor/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">PUBLIC VERIFICATION</span>
          <h1>Vendor Verification QR Code</h1>
          <p>Display or print this QR code at your stall for public verification.</p>
        </div>
      </div>

      <section className="panel" style={{ maxWidth: "550px", textAlign: "center", padding: "40px 20px" }}>
        <div style={{ display: "inline-block", background: "white", padding: "20px", borderRadius: "16px", border: "1px solid var(--line)" }}>
          <QrCode size={180} style={{ color: "#171717" }} />
        </div>
        <h2 style={{ fontFamily: "Manrope", margin: "16px 0 5px" }}>Shree Misal Corner</h2>
        <p className="muted" style={{ fontSize: "11px", margin: "0 0 20px" }}>Vendor ID: ST-1024 · Nashik Road</p>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button className="secondary-btn" onClick={() => window.print()}>Print Poster</button>
          <Link to={publicLink} className="primary-btn">
            View Public Profile <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
