import React from "react";
import { Bell, AlertTriangle, CheckCircle2 } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { useAuth } from "../../context/AuthContext";

export function NotificationsPage() {
  const { role } = useAuth();
  const parentPath = role === "vendor" ? "/vendor/dashboard" : "/dashboard";
  const parentLabel = role === "vendor" ? "Vendor Dashboard" : "Dashboard";

  const notifs = [
    { title: "Upcoming Inspection", text: "Annapurna Snacks is due for inspection on Dec 8, 2026.", time: "10 mins ago", type: "warning" },
    { title: "Report Finalized", text: "Shree Misal Corner assessment completed with score 94.", time: "2 hours ago", type: "success" },
    { title: "Document Expiry Warning", text: "Ganga Tea & Snacks fire license expires in 12 days.", time: "1 day ago", type: "alert" }
  ];

  return (
    <div className="page">
      <BackButton label={parentLabel} to={parentPath} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">NOTIFICATIONS</span>
          <h1>Activity Alerts</h1>
          <p>Important inspection, compliance, and document reminders.</p>
        </div>
      </div>

      <section className="panel">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {notifs.map((n, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "14px",
                padding: "16px",
                borderRadius: "9px",
                background: "var(--subtle-bg)",
                border: "1px solid var(--line)"
              }}
            >
              {n.type === "warning" ? <Bell style={{ color: "var(--amber-text)" }} /> : n.type === "alert" ? <AlertTriangle style={{ color: "var(--red-text)" }} /> : <CheckCircle2 style={{ color: "var(--green-text)" }} />}
              <div>
                <strong style={{ fontSize: "12px", display: "block" }}>{n.title}</strong>
                <p style={{ margin: "4px 0", fontSize: "10px", color: "var(--muted)" }}>{n.text}</p>
                <small style={{ fontSize: "9px", color: "var(--muted)" }}>{n.time}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
