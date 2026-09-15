import React from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { Logo } from "../../components/Logo";
import { Status } from "../../components/Status";
import { ThemeToggle } from "../../components/ThemeToggle";
import { getVendor } from "../../data/mockData";

function Info({ label, value }) {
  return (
    <div className="info">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function PublicVerifyPage() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const outletCtx = useOutletContext() || {};
  const { theme, toggleTheme } = outletCtx;
  const v = getVendor(vendorId);

  return (
    <div className="public-page">
      <header className="public-header">
        <Logo />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {toggleTheme && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </div>
      </header>

      <main className="verify-main">
        <BackButton label="Verify another business" to="/public/verify" />

        <div className="verified-pill">
          <CheckCircle2 size={17} /> VERIFIED BY STREETTRUST
        </div>

        {!v ? (
          <div className="verify-card panel" style={{ textAlign: "center", padding: "40px" }}>
            <h1>Vendor Not Found</h1>
            <p className="muted">No registered business found for ID: {vendorId}.</p>
            <button className="primary-btn" onClick={() => navigate("/public/verify")}>
              Search Another Business
            </button>
          </div>
        ) : (
          <div className="verify-card panel">
            <div className="verify-top">
              <div className="public-business-logo">{v.name[0]}</div>
              <div>
                <span className="eyebrow">VERIFIED BUSINESS</span>
                <h1>{v.name}</h1>
                <p>{v.category} · {v.area}, Nashik</p>
              </div>
              <Status>{v.status}</Status>
            </div>

            <div className="public-score">
              <div className="score-ring" style={{ "--score": v.score }}>
                <div><strong>{v.score}</strong><small>/100</small></div>
              </div>
              <div>
                <h2>{v.score >= 80 ? "Good standing" : "Under review"}</h2>
                <p>Current StreetTrust compliance score</p>
                <span>Last verified {v.last}</span>
              </div>
            </div>

            <div className="public-grid">
              <Info label="Verification ID" value={v.id} />
              <Info label="Registration" value="Verified" />
              <Info label="Hygiene" value="Good" />
              <Info label="Safety" value="Compliant" />
            </div>

            <div className="public-note">
              <ShieldCheck />
              <div>
                <strong>What this means</strong>
                <p>This public profile shows finalized information intended for verification. Private inspector notes and sensitive documents are not displayed.</p>
              </div>
            </div>

            <button className="secondary-btn full">Share verification <ArrowRight size={16} /></button>
          </div>
        )}

        <p className="public-disclaimer">StreetTrust provides digital verification information. Always confirm the latest status before making a decision.</p>
      </main>
    </div>
  );
}
