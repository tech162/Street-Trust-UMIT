import React from "react";
import { Link } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";

export function VendorProfilePage() {
  return (
    <div className="page">
      <BackButton label="Dashboard" to="/vendor/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">MY BUSINESS PROFILE</span>
          <h1>Shree Misal Corner</h1>
          <p>Street Food · Nashik Road, Nashik</p>
        </div>
      </div>

      <div className="profile-hero panel">
        <div className="profile-logo">S</div>
        <div className="profile-title">
          <div>
            <span className="eyebrow">REGISTERED ID: ST-1024</span>
            <h1>Shree Misal Corner</h1>
            <p>Owner: Priya Sharma · Phone: +91 98765 43210</p>
          </div>
          <Status>Good Standing</Status>
        </div>
        <div className="profile-actions">
          <Link to="/vendor/documents" className="secondary-btn">My Documents</Link>
          <Link to="/vendor/qr" className="primary-btn">View Verification QR</Link>
        </div>
      </div>

      <section className="panel" style={{ marginTop: "20px" }}>
        <h3>Business Details</h3>
        <div className="info-grid" style={{ marginTop: "15px" }}>
          <div className="info"><span>Registration ID</span><strong>ST-1024</strong></div>
          <div className="info"><span>Business Owner</span><strong>Priya Sharma</strong></div>
          <div className="info"><span>Category</span><strong>Street Food / Restaurant</strong></div>
          <div className="info"><span>FSSAI License</span><strong>FSSAI-8839201923</strong></div>
          <div className="info"><span>Operating Hours</span><strong>8:00 AM – 10:00 PM</strong></div>
          <div className="info"><span>Registered Address</span><strong>Shop #4, College Road Market, Nashik</strong></div>
        </div>
      </section>
    </div>
  );
}
