import React from "react";
import { NavLink } from "react-router-dom";
import {
  Bell, Building2, ClipboardCheck, FileText, LayoutDashboard, LogOut,
  MapPin, PanelLeftClose, PanelLeftOpen, QrCode, ShieldCheck, Store,
  UserRound, Users
} from "lucide-react";
import { Logo } from "../components/Logo";
import { useAuth } from "../context/AuthContext";

export function Sidebar({ collapsed, setCollapsed }) {
  const { role, logout } = useAuth();

  const inspectorItems = [
    ["Dashboard", "/dashboard", LayoutDashboard],
    ["Vendors", "/vendors", Users],
    ["Inspections", "/inspections", ClipboardCheck],
    ["Reports", "/reports", FileText],
    ["Map", "/map", MapPin],
    ["Notifications", "/notifications", Bell],
    ["Profile", "/profile", UserRound],
    ["Settings", "/settings", Building2]
  ];

  const vendorItems = [
    ["Dashboard", "/vendor/dashboard", LayoutDashboard],
    ["My Profile", "/vendor/profile", UserRound],
    ["Documents", "/vendor/documents", FileText],
    ["Inspections", "/vendor/inspections", ClipboardCheck],
    ["Compliance", "/vendor/compliance", ShieldCheck],
    ["Reports", "/vendor/reports", FileText],
    ["QR Verification", "/vendor/qr", QrCode],
    ["Notifications", "/vendor/notifications", Bell],
    ["Settings", "/vendor/settings", Building2]
  ];

  const items = role === "inspector" ? inspectorItems : vendorItems;

  return (
    <aside className={"sidebar " + (collapsed ? "collapsed" : "")}>
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
        <span>{role === "inspector" ? "AUTHORIZED INSPECTOR" : "REGISTERED VENDOR"}</span>
      </div>
      <nav>
        {items.map(([label, to, Icon]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? "nav-active" : "")}
            title={label}
            end={to === "/dashboard" || to === "/vendor/dashboard"}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="side-bottom">
        <div className="security-card" title="Secure workspace · Protected access">
          <ShieldCheck size={18} />
          <div>
            <strong>Secure workspace</strong>
            <small>Protected access</small>
          </div>
        </div>
        <button className="logout" onClick={logout} title="Sign out">
          <LogOut size={17} /> <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
