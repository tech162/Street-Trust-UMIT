import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { BackButton } from "../../components/BackButton";
import { Status } from "../../components/Status";
import { vendors } from "../../data/mockData";

export function MapPage() {
  const navigate = useNavigate();
  const [activePin, setActivePin] = useState(null);

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
        <div
          className="fake-map"
          style={{ height: "550px" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActivePin(null);
          }}
        >
          <div className="map-grid"></div>
          <div className="road r1"></div><div className="road r2"></div><div className="road r3"></div>
          <div className="map-label l1">Nashik Road</div>
          <div className="map-label l2">College Road</div>
          <div className="map-label l3">Panchavati</div>

          {vendors.map((v, i) => {
            const left = (12 + i * 10) + "%";
            const top = (20 + (i % 4) * 18) + "%";

            return (
              <button
                key={v.id}
                className={"map-pin " + (v.status === "Compliant" ? "green" : v.status === "Warning" ? "amber" : "red")}
                style={{ left, top }}
                title={`${v.name} (${v.status})`}
                aria-label={`View ${v.name}`}
                onMouseEnter={() => setActivePin({ vendor: v, left, top })}
                onClick={() => setActivePin({ vendor: v, left, top })}
              >
                <span></span>
              </button>
            );
          })}

          {activePin && (
            <div
              className="map-tooltip"
              style={{ left: activePin.left, top: activePin.top }}
              role="tooltip"
            >
              <button
                className="map-tooltip-close-btn"
                onClick={() => setActivePin(null)}
                aria-label="Close tooltip"
              >
                <X size={12} />
              </button>
              <h4>{activePin.vendor.name}</h4>
              <p>{activePin.vendor.area} · {activePin.vendor.category}</p>
              <div className="tt-score">
                <strong>{activePin.vendor.score}/100</strong>
                <Status>{activePin.vendor.status}</Status>
              </div>
              <button
                className="tt-view"
                onClick={() => navigate(`/vendors/${activePin.vendor.id}`)}
              >
                View Vendor <ArrowRight size={13} />
              </button>
            </div>
          )}

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
