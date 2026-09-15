import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, Search } from "lucide-react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ThemeToggle } from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";

export function Topbar({ theme, toggleTheme, collapsed, setCollapsed }) {
  const { role, user } = useAuth();
  const navigate = useNavigate();

  const profilePath = role === "vendor" ? "/vendor/profile" : "/profile";
  const notificationsPath = role === "vendor" ? "/vendor/notifications" : "/notifications";
  const avatarInitials = role === "vendor" ? "PS" : "AS";

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle menu">
          <Menu />
        </button>
        <Breadcrumbs />
      </div>
      <div className="topbar-center">
        <div className="global-search">
          <Search size={17} />
          <input placeholder="Search vendors, reports..." />
        </div>
      </div>
      <div className="top-actions">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <button
          className="icon-btn"
          title="Notifications"
          onClick={() => navigate(notificationsPath)}
        >
          <Bell size={19} />
          <i></i>
        </button>
        <button
          className="avatar"
          title={user?.name || "Profile"}
          onClick={() => navigate(profilePath)}
        >
          {avatarInitials}
        </button>
      </div>
    </header>
  );
}
