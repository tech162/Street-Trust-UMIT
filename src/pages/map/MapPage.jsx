import React from "react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../../components/BackButton";
import { vendors } from "../../data/mockData";

export function MapPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <BackButton label="Dashboard" to="/dashboard" />

      <div className="page-heading">
        <div>
          <span className="eyebrow">GEOGRAPHIC COVERAGE</span>
          <h1>Vendor Map</h1>
          <p>Interactive compliance overview across your assigned inspection zone.</p>
        </div>
      </div>

      <section className="panel">
        <div className="fake-map" style={{ height: "550px" }}>
          <div className="map-grid"></div>
          <div className="road r1"></div><div className="road r2"></div><div className="road r3"></div>
          <div className="map-label l1">Nashik Road</div>
          <div className="map-label l2">College Road</div>
          <div className="map-label l3">Panchavati</div>
          {vendors.map((v, i) => (
            <button
              className={"map-pin " + (v.status === "Compliant" ? "green" : v.status === "Warning" ? "amber" : "red")}
              style={{ left: (12 + i * 10) + "%", top: (20 + (i % 4) * 18) + "%" }}
              key={v.id}
              title={v.name}
              onClick={() => navigate(`/vendors/${v.id}`)}
            >
              <span></span>
            </button>
          ))}
          <div className="map-legend">
            <span><i className="dot green"></i>Compliant</span>
            <span><i className="dot amber"></i>Warning</span>
            <span><i className="dot red"></i>Non-compliant</span>
          </div>
        </div>
      </section>
    </div>
  );
}
