import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function NotFoundPage() {
  const { role, isAuthenticated } = useAuth();

  const homeTarget = !isAuthenticated
    ? "/login"
    : role === "vendor"
    ? "/vendor/dashboard"
    : "/dashboard";

  return (
    <div className="page" style={{ padding: "60px 20px" }}>
      <div className="empty-hero panel" style={{ maxWidth: "600px", margin: "auto" }}>
        <div className="empty-icon">
          <Sparkles />
        </div>
        <span className="eyebrow">ERROR 404</span>
        <h1 style={{ fontSize: "36px", margin: "10px 0" }}>Page not found</h1>
        <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "25px" }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Link to={homeTarget} className="primary-btn">
            Back to Dashboard <ArrowRight size={16} />
          </Link>
          <Link to="/public/verify" className="secondary-btn">
            Public Verification
          </Link>
        </div>
      </div>
    </div>
  );
}
