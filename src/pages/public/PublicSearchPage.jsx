import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ArrowRight, QrCode, Search, ShieldCheck } from "lucide-react";
import { Logo } from "../../components/Logo";
import { ThemeToggle } from "../../components/ThemeToggle";

export function PublicSearchPage() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const outletCtx = useOutletContext() || {};
  const { theme, toggleTheme } = outletCtx;

  const handleVerify = (e) => {
    e.preventDefault();
    const vendorId = q.trim() || "ST-1024";
    navigate(`/public/verify/${vendorId}`);
  };

  return (
    <div className="public-page">
      <header className="public-header">
        <Logo />
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {toggleTheme && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
          <button className="secondary-btn" onClick={() => navigate("/login")}>
            Restricted user sign in
          </button>
        </div>
      </header>

      <main className="public-search-main">
        <div className="public-search-copy">
          <div className="verified-pill">
            <ShieldCheck size={17} /> PUBLIC VERIFICATION
          </div>
          <h1>Can you trust this business?</h1>
          <p>Verify a StreetTrust-registered vendor using their vendor ID or scan their QR code.</p>
        </div>

        <div className="verify-search panel">
          <form onSubmit={handleVerify} className="search-large">
            <Search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Enter vendor ID (e.g. ST-1024 or vendor-1)"
            />
            <button className="primary-btn" type="submit">
              Verify <ArrowRight size={17} />
            </button>
          </form>

          <div className="or-line"><span>OR</span></div>

          <button className="qr-cta" onClick={() => navigate("/public/verify/ST-1024")}>
            <QrCode size={28} />
            <div>
              <strong>Scan a StreetTrust QR code</strong>
              <span>Point your camera at the vendor's verification QR.</span>
            </div>
            <ArrowRight />
          </button>
        </div>
      </main>
    </div>
  );
}
