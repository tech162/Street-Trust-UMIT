import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight, CheckCircle2, ChevronDown, ClipboardCheck, FileText,
  ShieldCheck, Store, X
} from "lucide-react";
import { KPI } from "../../components/KPI";
import { Status } from "../../components/Status";
import { InspectionTable } from "../../components/InspectionTable";
import { vendors, inspectionRows } from "../../data/mockData";

export function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [activePin, setActivePin] = useState(null);
  const [ringProgress, setRingProgress] = useState(0);

  // Animate compliance ring on load (600-900ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setRingProgress(84);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">{t("dashboard.eyebrow")}</span>
          <h1>{t("dashboard.greeting")}</h1>
          <p>{t("dashboard.greetingSubtitle")}</p>
        </div>
        <button className="primary-btn" onClick={() => navigate("/vendors/ST-1024/inspections/new")}>
          <ClipboardCheck size={17} /> {t("dashboard.startInspection")}
        </button>
      </div>

      {/* Numerical KPI Grid with animated statistics */}
      <div className="kpi-grid">
        <KPI label={t("dashboard.kpi.totalVendors")} value="128" detail={t("dashboard.kpi.totalVendorsDetail")} icon={Store} />
        <KPI label={t("dashboard.kpi.inspectionsDue")} value="14" detail={t("dashboard.kpi.inspectionsDueDetail")} icon={ClipboardCheck} kind="amber" />
        <KPI label={t("dashboard.kpi.completed")} value="96" detail={t("dashboard.kpi.completedDetail")} icon={CheckCircle2} kind="green" />
        <KPI label={t("dashboard.kpi.nonCompliant")} value="7" detail={t("dashboard.kpi.nonCompliantDetail")} icon={ShieldCheck} kind="red" />
        <KPI label={t("dashboard.kpi.pendingReviews")} value="5" detail={t("dashboard.kpi.pendingReviewsDetail")} icon={FileText} kind="purple" />
      </div>

      {/* Visually Strong Circular Compliance Overview */}
      <div className="compliance-overview-card">
        <div className="compliance-ring-container">
          <svg className="compliance-ring-svg" viewBox="0 0 100 100" aria-label="Compliance score 84%">
            <circle className="ring-bg" cx="50" cy="50" r="42" strokeWidth="9" />
            <circle
              className="ring-progress"
              cx="50"
              cy="50"
              r="42"
              strokeWidth="9"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * ringProgress) / 100}
            />
          </svg>
          <div className="ring-center-content">
            <strong>{ringProgress}</strong>
            <div className="ring-divider"></div>
            <span>Compliance<br />Score</span>
          </div>
        </div>
        <div className="compliance-overview-meta">
          <h4>Overall District Compliance Overview</h4>
          <p>84% of monitored food vendors meet mandatory safety and hygiene thresholds. Regular inspections ensure street food safety across Nashik.</p>
          <div className="compliance-tags">
            <span className="compliance-tag green"><i className="dot green"></i> 96 Compliant</span>
            <span className="compliance-tag amber"><i className="dot amber"></i> 14 Due Soon</span>
            <span className="compliance-tag red"><i className="dot red"></i> 7 Non-Compliant</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Vendor Map with Interactive Markers */}
        <section className="panel map-panel">
          <div className="panel-head">
            <div>
              <h3>{t("dashboard.vendorCoverage")}</h3>
              <p>{t("dashboard.vendorCoverageDesc")}</p>
            </div>
            <Link to="/map" className="text-btn">
              {t("common.openMap")} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="fake-map" onClick={(e) => {
            // Close tooltip if clicking map background
            if (e.target === e.currentTarget) setActivePin(null);
          }}>
            <div className="map-grid"></div>
            <div className="road r1"></div><div className="road r2"></div><div className="road r3"></div>
            <div className="map-label l1">{t("dashboard.mapLabels.nashikRoad")}</div>
            <div className="map-label l2">{t("dashboard.mapLabels.collegeRoad")}</div>
            <div className="map-label l3">{t("dashboard.mapLabels.panchavati")}</div>

            {vendors.slice(0, 7).map((v, i) => {
              const left = (15 + i * 11) + "%";
              const top = (24 + (i % 3) * 21) + "%";
              const isNonCompliant = v.status === "Non-Compliant";

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

            {/* Interactive Tooltip Card */}
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
                <p>{activePin.vendor.area}</p>
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
              <span><i className="dot green"></i>{t("dashboard.legend.compliant")}</span>
              <span><i className="dot amber"></i>{t("dashboard.legend.warning")}</span>
              <span><i className="dot red"></i>{t("dashboard.legend.nonCompliant")}</span>
            </div>
          </div>
        </section>

        {/* Inspection Queue */}
        <section className="panel queue-panel">
          <div className="panel-head">
            <div>
              <h3>{t("dashboard.inspectionQueue")}</h3>
              <p>{t("dashboard.inspectionQueueDesc")}</p>
            </div>
            <button className="icon-btn" aria-label="Toggle queue"><ChevronDown size={17} /></button>
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
                <button
                  className="small-action inspect-action-btn"
                  onClick={() => navigate(`/vendors/${r.vendorId || "ST-1024"}`)}
                >
                  {t("common.inspect")} <ArrowRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recent Inspections Table */}
      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>{t("dashboard.recentInspections")}</h3>
            <p>{t("dashboard.recentInspectionsDesc")}</p>
          </div>
          <Link to="/inspections" className="text-btn">
            {t("common.viewAll")} <ArrowRight size={15} />
          </Link>
        </div>
        <InspectionTable rows={inspectionRows.slice(0, 3)} />
      </section>
    </div>
  );
}
