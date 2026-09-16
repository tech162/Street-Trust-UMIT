import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight, CheckCircle2, ClipboardCheck, FileText, QrCode, ShieldCheck
} from "lucide-react";
import { KPI } from "../../components/KPI";
import { Status } from "../../components/Status";
import { InspectionTable } from "../../components/InspectionTable";

export function VendorDashboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">{t("vendorDashboard.eyebrow")}</span>
          <h1>{t("vendorDashboard.greeting")}</h1>
          <p>{t("vendorDashboard.greetingSubtitle")}</p>
        </div>
        <button className="secondary-btn" onClick={() => navigate("/vendor/qr")}>
          <QrCode size={17} /> {t("vendorDashboard.viewQR")}
        </button>
      </div>

      <div className="kpi-grid four">
        <KPI label={t("vendorDashboard.kpi.trustScore")} value="92" detail={t("vendorDashboard.kpi.trustScoreDetail")} icon={ShieldCheck} kind="green" />
        <KPI label={t("vendorDashboard.kpi.compliance")} value={t("vendorDashboard.goodStanding")} detail={t("vendorDashboard.kpi.complianceDetail")} icon={CheckCircle2} kind="green" />
        <KPI label={t("vendorDashboard.kpi.nextInspection")} value="12 Dec" detail={t("vendorDashboard.kpi.nextInspectionDetail")} icon={ClipboardCheck} kind="amber" />
        <KPI label={t("vendorDashboard.kpi.documentsExpiring")} value="1" detail={t("vendorDashboard.kpi.documentsExpiringDetail")} icon={FileText} kind="red" />
      </div>

      <div className="vendor-dash-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>{t("vendorDashboard.currentCompliance")}</h3>
              <p>{t("vendorDashboard.currentComplianceDesc")}</p>
            </div>
            <Status>{t("vendorDashboard.goodStanding")}</Status>
          </div>
          <div className="vendor-score-row">
            <div className="score-ring" style={{ "--score": 92 }}>
              <div><strong>92</strong><small>/100</small></div>
            </div>
            <div>
              <h2>{t("vendorDashboard.goodStandingTitle")}</h2>
              <p>{t("vendorDashboard.lastVerified")}</p>
              <Link to="/vendor/compliance" className="text-btn">
                {t("vendorDashboard.viewComplianceDetails")} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="panel action-panel">
          <h3>{t("vendorDashboard.actionRequired")}</h3>
          <div className="action-item">
            <div className="action-icon"><FileText /></div>
            <div>
              <strong>{t("vendorDashboard.certificateExpiringSoon")}</strong>
              <p>{t("vendorDashboard.uploadCertificate")}</p>
              <Link to="/vendor/documents" className="text-btn">
                {t("vendorDashboard.uploadCertificateLink")} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>{t("vendorDashboard.recentInspection")}</h3>
            <p>{t("vendorDashboard.recentInspectionDesc")}</p>
          </div>
          <Link to="/vendor/inspections" className="primary-btn">
            {t("common.viewReport")} <ArrowRight size={16} />
          </Link>
        </div>
        <InspectionTable
          rows={[
            { vendor: "Shree Misal Corner", location: "Nashik Road", last: "12 Sep 2026", due: "12 Dec 2026", status: "Compliant", score: 92 }
          ]}
        />
      </section>
    </div>
  );
}
