import React from "react";
import { Link } from "react-router-dom";

export function BackButton({ label, to, className = "" }) {
  if (!to) return null;
  return (
    <Link to={to} className={`back-link ${className}`} aria-label={`Back to ${label}`}>
      ← Back to {label}
    </Link>
  );
}
