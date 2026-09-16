import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Bell, Building2, ClipboardCheck, FileText, LayoutDashboard, LogOut,
  MapPin, PanelLeftClose, PanelLeftOpen, QrCode, ShieldCheck, Store,
  UserRound, Users
} from "lucide-react";
import { Logo } from "../components/Logo";
import { useAuth } from "../context/AuthContext";

export function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const { role, logout } = useAuth();
  const { t } = useTranslation();

  const inspectorItems = [
    [t("nav.dashboard"), "/dashboard", LayoutDashboard],
    [t("nav.vendors"), "/vendors", Users],
    [t("nav.inspections"), "/inspections", ClipboardCheck],
    [t("nav.reports"), "/reports", FileText],
    [t("nav.map"), "/map", MapPin],
    [t("nav.notifications"), "/notifications", Bell],
    [t("nav.profile"), "/profile", UserRound],
    [t("nav.settings"), "/settings", Building2]
  ];

  const vendorItems = [
    [t("nav.dashboard"), "/vendor/dashboard", LayoutDashboard],
    [t("nav.myProfile"), "/vendor/profile", UserRound],
    [t("nav.documents"), "/vendor/documents", FileText],
    [t("nav.inspections"), "/vendor/inspections", ClipboardCheck],
    [t("nav.compliance"), "/vendor/compliance", ShieldCheck],
    [t("nav.reports"), "/vendor/reports", FileText],
    [t("nav.qrVerification"), "/vendor/qr", QrCode],
    [t("nav.notifications"), "/vendor/notifications", Bell],
    [t("nav.settings"), "/vendor/settings", Building2]
  ];

  const items = role === "inspector" ? inspectorItems : vendorItems;

  const handleNavClick = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <aside className={"sidebar " + (collapsed ? "collapsed " : "") + (mobileOpen ? "mobile-open" : "")}>
      <div className="side-header">
        <Logo />
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar (Ctrl+B)" : "Minimize sidebar (Ctrl+B)"}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
      <div className="side-role">
        <span>{role === "inspector" ? t("nav.authorizedInspector") : t("nav.registeredVendor")}</span>
      </div>
      <nav>
        {items.map(([label, to, Icon]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            title={label}
            end={to === "/dashboard" || to === "/vendor/dashboard"}
            onClick={handleNavClick}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="side-bottom">
        <div className="security-card" title={t("common.secureWorkspace")}>
          <ShieldCheck size={18} />
          <div>
            <strong>{t("common.secureWorkspace")}</strong>
            <small>{t("common.protectedAccess")}</small>
          </div>
        </div>
        <button className="logout" onClick={logout} title={t("common.signOut")}>
          <LogOut size={17} /> <span>{t("common.signOut")}</span>
        </button>
      </div>
    </aside>
  );
}
