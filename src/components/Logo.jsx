import React from "react";
import { ShieldCheck } from "lucide-react";

export function Logo({ dark = false }) {
  return (
    <div className={`logo ${dark ? "logo-dark" : ""}`}>
      <div className="logo-mark"><ShieldCheck size={21} /></div>
      <div className="logo-text"><strong>STREET</strong><span>TRUST</span></div>
    </div>
  );
}
