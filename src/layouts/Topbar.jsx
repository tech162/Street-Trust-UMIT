import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useAuth } from "../context/AuthContext";

export function Topbar({ theme, toggleTheme, collapsed, setCollapsed }) {
  const { role, user } = useAuth();
  const { t } = useTranslation();
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
          <input placeholder={t("common.search")} />
        </div>
      </div>
      <div className="top-actions">
        <LanguageSwitcher />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <button
          className="icon-btn"
          title={t("common.notifications")}
          onClick={() => navigate(notificationsPath)}
        >
          <Bell size={19} />
          <i></i>
        </button>
        <button
          className="avatar"
          title={user?.name || t("common.profile")}
          onClick={() => navigate(profilePath)}
        >
          {avatarInitials}
        </button>
      </div>
    </header>
  );
}
