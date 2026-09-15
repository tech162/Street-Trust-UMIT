import React from "react";

export function KPI({ label, value, detail, icon: Icon, kind = "" }) {
  return (
    <div className="kpi">
      <div className={"kpi-icon " + kind}><Icon size={20} /></div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}
