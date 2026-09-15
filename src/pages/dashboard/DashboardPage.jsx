import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight, CheckCircle2, ChevronDown, ClipboardCheck, FileText,
  ShieldCheck, Store
} from "lucide-react";
import { KPI } from "../../components/KPI";
import { Status } from "../../components/Status";
import { InspectionTable } from "../../components/InspectionTable";
import { vendors, inspectionRows } from "../../data/mockData";

export function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">TUESDAY, 15 SEPTEMBER 2026</span>
          <h1>Good morning, Inspector.</h1>
          <p>Here’s your inspection overview for today.</p>
        </div>
        <button className="primary-btn" onClick={() => navigate("/vendors/ST-1024/inspections/new")}>
          <ClipboardCheck size={17} /> Start inspection
        </button>
      </div>

      <div className="kpi-grid">
        <KPI label="Total Vendors" value="128" detail="+8.4% this month" icon={Store} />
        <KPI label="Inspections Due" value="14" detail="4 due this week" icon={ClipboardCheck} kind="amber" />
        <KPI label="Completed" value="96" detail="+12 this month" icon={CheckCircle2} kind="green" />
        <KPI label="Non-Compliant" value="7" detail="3 require action" icon={ShieldCheck} kind="red" />
        <KPI label="Pending Reviews" value="5" detail="Awaiting your review" icon={FileText} kind="purple" />
      </div>

      <div className="dashboard-grid">
        <section className="panel map-panel">
          <div className="panel-head">
            <div>
              <h3>Vendor coverage</h3>
              <p>Live inspection status across your assigned area</p>
            </div>
            <Link to="/map" className="text-btn">
              Open map <ArrowRight size={15} />
            </Link>
          </div>
          <div className="fake-map">
            <div className="map-grid"></div>
            <div className="road r1"></div><div className="road r2"></div><div className="road r3"></div>
            <div className="map-label l1">Nashik Road</div>
            <div className="map-label l2">College Road</div>
            <div className="map-label l3">Panchavati</div>
            {vendors.slice(0, 7).map((v, i) => (
              <button
                className={"map-pin " + (v.status === "Compliant" ? "green" : v.status === "Warning" ? "amber" : "red")}
                style={{ left: (15 + i * 11) + "%", top: (24 + (i % 3) * 21) + "%" }}
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

        <section className="panel queue-panel">
          <div className="panel-head">
            <div>
              <h3>Inspection queue</h3>
              <p>Vendors needing attention</p>
            </div>
            <button className="icon-btn"><ChevronDown size={17} /></button>
          </div>
          <div className="queue-list">
            {inspectionRows.map((r) => (
              <div className="queue-item" key={r.vendor}>
                <div className="mini-avatar">{r.vendor.slice(0, 1)}</div>
                <div className="queue-main">
                  <strong>{r.vendor}</strong>
                  <small>{r.location} · Due {r.due}</small>
                </div>
                <Status>{r.status}</Status>
                <button className="small-action" onClick={() => navigate(`/vendors/${r.vendorId || "ST-1024"}`)}>
                  Inspect
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Recent inspections</h3>
            <p>Latest completed field activity</p>
          </div>
          <Link to="/inspections" className="text-btn">
            View all <ArrowRight size={15} />
          </Link>
        </div>
        <InspectionTable rows={inspectionRows.slice(0, 3)} />
      </section>
    </div>
  );
}
