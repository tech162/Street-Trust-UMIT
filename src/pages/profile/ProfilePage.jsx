import React from "react";
import { UserRound, ShieldCheck } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { useAuth } from "../../context/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="page">
      <BackButton label="Dashboard" to="/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">INSPECTOR PROFILE</span>
          <h1>User Settings & Identity</h1>
          <p>Verified credentials for food compliance authority.</p>
        </div>
      </div>

      <div className="profile-hero panel">
        <div className="profile-logo"><UserRound size={32} /></div>
        <div className="profile-title">
          <div>
            <span className="eyebrow">ID: AUDITOR-2091</span>
            <h1>{user?.name || "Inspector Aarav"}</h1>
            <p>Senior Compliance Auditor · Nashik Division</p>
          </div>
          <span className="status compliant">Active Auditor</span>
        </div>
      </div>

      <section className="panel" style={{ marginTop: "20px" }}>
        <h3>Official Credentials</h3>
        <div className="info-grid">
          <div className="info"><span>Full Name</span><strong>Inspector Aarav Shah</strong></div>
          <div className="info"><span>Official Email</span><strong>aarav.shah@streettrust.app</strong></div>
          <div className="info"><span>Jurisdiction</span><strong>Nashik Central Zone</strong></div>
          <div className="info"><span>Badge Number</span><strong>INSP-NSK-4092</strong></div>
        </div>
      </section>
    </div>
  );
}
