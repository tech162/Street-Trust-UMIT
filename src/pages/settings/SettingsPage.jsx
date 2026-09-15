import React from "react";
import { Building2, Sliders } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { useAuth } from "../../context/AuthContext";

export function SettingsPage() {
  const { role } = useAuth();
  const parentPath = role === "vendor" ? "/vendor/dashboard" : "/dashboard";
  const parentLabel = role === "vendor" ? "Vendor Dashboard" : "Dashboard";

  return (
    <div className="page">
      <BackButton label={parentLabel} to={parentPath} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">SYSTEM SETTINGS</span>
          <h1>Preferences & Workspace</h1>
          <p>Configure notification thresholds and system preferences.</p>
        </div>
      </div>

      <section className="panel">
        <h3>Workspace Preferences</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>Enable instant email alerts for non-compliant field reports</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>Auto-save draft checklist entries every 30 seconds</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>Show high-risk vendor pins on map landing page</span>
          </label>
        </div>
      </section>
    </div>
  );
}
