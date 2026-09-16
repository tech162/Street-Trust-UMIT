import React, { useState } from "react";
import { Bell, AlertTriangle, CheckCircle2, ShieldAlert, Filter } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { useAuth } from "../../context/AuthContext";

export function NotificationsPage() {
  const { role } = useAuth();
  const parentPath = role === "vendor" ? "/vendor/dashboard" : "/dashboard";
  const parentLabel = role === "vendor" ? "Vendor Dashboard" : "Dashboard";

  const [filter, setFilter] = useState("all");

  const notifs = [
    {
      id: 1,
      title: "Upcoming Inspection Audit",
      vendor: "Annapurna Snacks",
      location: "College Road",
      text: "Scheduled for quarterly compliance review on 18 Sep 2026.",
      time: "10 mins ago",
      type: "warning",
      status: "Due Soon"
    },
    {
      id: 2,
      title: "Inspection Report Finalized",
      vendor: "Shree Misal Corner",
      location: "Nashik Road",
      text: "Assessment completed with score 94/100. Vendor approved in Good Standing.",
      time: "2 hours ago",
      type: "success",
      status: "Compliant"
    },
    {
      id: 3,
      title: "Critical License Expiry Notice",
      vendor: "Ganga Tea & Snacks",
      location: "Nashik City",
      text: "Commercial fire & LPG safety certificate expires in 12 days. Remedial submission required.",
      time: "1 day ago",
      type: "alert",
      status: "Overdue"
    },
    {
      id: 4,
      title: "Hygiene Compliance Flagged",
      vendor: "Kokan Fresh Bites",
      location: "Panchavati",
      text: "Kitchen surface sanitation below threshold during random audit. Follow-up inspection booked.",
      time: "2 days ago",
      type: "alert",
      status: "High Risk"
    }
  ];

  const filtered = filter === "all" ? notifs : notifs.filter((n) => n.type === filter);

  return (
    <div className="page">
      <BackButton label={parentLabel} to={parentPath} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">ACTIVITY & COMPLIANCE ALERTS</span>
          <h1>Notifications</h1>
          <p>Real-time updates regarding scheduled inspections, violations, and document alerts.</p>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {["all", "warning", "alert", "success"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? "primary-btn" : "secondary-btn"}
              style={{ fontSize: "11px", padding: "8px 14px", textTransform: "capitalize" }}
            >
              {f === "all" ? "All Alerts" : f}
            </button>
          ))}
        </div>
      </div>

      <section className="panel" style={{ maxWidth: "840px", margin: "0 auto" }}>
        <div className="notif-list">
          {filtered.map((n) => (
            <div key={n.id} className={`notif-card ${n.type}`}>
              <div className={`notif-icon ${n.type}`}>
                {n.type === "alert" ? (
                  <ShieldAlert size={18} />
                ) : n.type === "warning" ? (
                  <Bell size={18} />
                ) : (
                  <CheckCircle2 size={18} />
                )}
              </div>
              <div className="notif-body">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <strong>{n.title}</strong>
                  <span className={`status-pill mini ${n.type === "success" ? "green" : n.type === "warning" ? "amber" : "red"}`}>
                    {n.status}
                  </span>
                </div>
                <p style={{ margin: "4px 0 2px", fontWeight: "600", color: "var(--ink)" }}>
                  {n.vendor} · <span style={{ color: "var(--muted)", fontWeight: "normal" }}>{n.location}</span>
                </p>
                <p>{n.text}</p>
                <span className="notif-time">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
