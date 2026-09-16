import React from "react";
import { useTranslation } from "react-i18next";
import { BackButton } from "../../components/BackButton";
import { useAuth } from "../../context/AuthContext";

export function SettingsPage() {
  const { role } = useAuth();
  const { t, i18n } = useTranslation();
  const parentPath = role === "vendor" ? "/vendor/dashboard" : "/dashboard";
  const parentLabel = role === "vendor" ? t("settings.vendorDashboard") : t("nav.dashboard");

  return (
    <div className="page">
      <BackButton label={parentLabel} to={parentPath} />

      <div className="page-heading">
        <div>
          <span className="eyebrow">{t("settings.eyebrow")}</span>
          <h1>{t("settings.title")}</h1>
          <p>{t("settings.subtitle")}</p>
        </div>
      </div>

      <section className="panel">
        <h3>{t("settings.workspacePreferences")}</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "15px" }}>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>{t("settings.emailAlerts")}</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>{t("settings.autoSave")}</span>
          </label>
          <label className="checkbox">
            <input type="checkbox" defaultChecked />
            <span>{t("settings.highRiskPins")}</span>
          </label>
        </div>
      </section>

      <section className="panel" style={{ marginTop: "16px" }}>
        <h3>{t("settings.language")}</h3>
        <p style={{ color: "var(--muted)", marginBottom: "8px", fontSize: "14px" }}>{t("settings.languageDesc")}</p>
        <p style={{ color: "var(--muted)", fontSize: "13px" }}>
          {t("language.label")}: <strong style={{ color: "var(--ink)" }}>{t(`language.${i18n.language || "en"}`)}</strong>
          {" "}— {t("language.en")} / {t("language.hi")} / {t("language.mr")}
        </p>
        <p style={{ color: "var(--muted)", fontSize: "12px", marginTop: "8px" }}>
          {t("settings.languageSelectorHint")}
        </p>
      </section>
    </div>
  );
}
