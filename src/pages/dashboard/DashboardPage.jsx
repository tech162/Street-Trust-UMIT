import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

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

      <div className="kpi-grid">
        <KPI label={t("dashboard.kpi.totalVendors")} value="128" detail={t("dashboard.kpi.totalVendorsDetail")} icon={Store} />
        <KPI label={t("dashboard.kpi.inspectionsDue")} value="14" detail={t("dashboard.kpi.inspectionsDueDetail")} icon={ClipboardCheck} kind="amber" />
        <KPI label={t("dashboard.kpi.completed")} value="96" detail={t("dashboard.kpi.completedDetail")} icon={CheckCircle2} kind="green" />
        <KPI label={t("dashboard.kpi.nonCompliant")} value="7" detail={t("dashboard.kpi.nonCompliantDetail")} icon={ShieldCheck} kind="red" />
        <KPI label={t("dashboard.kpi.pendingReviews")} value="5" detail={t("dashboard.kpi.pendingReviewsDetail")} icon={FileText} kind="purple" />
      </div>

      <div className="dashboard-grid">
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
          <div className="fake-map">
            <div className="map-grid"></div>
            <div className="road r1"></div><div className="road r2"></div><div className="road r3"></div>
            <div className="map-label l1">{t("dashboard.mapLabels.nashikRoad")}</div>
            <div className="map-label l2">{t("dashboard.mapLabels.collegeRoad")}</div>
            <div className="map-label l3">{t("dashboard.mapLabels.panchavati")}</div>
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
              <span><i className="dot green"></i>{t("dashboard.legend.compliant")}</span>
              <span><i className="dot amber"></i>{t("dashboard.legend.warning")}</span>
              <span><i className="dot red"></i>{t("dashboard.legend.nonCompliant")}</span>
            </div>
          </div>
        </section>

        <section className="panel queue-panel">
          <div className="panel-head">
            <div>
              <h3>{t("dashboard.inspectionQueue")}</h3>
              <p>{t("dashboard.inspectionQueueDesc")}</p>
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
                  {t("common.inspect")}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

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
