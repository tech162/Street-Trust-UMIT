import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell, CheckCircle2, ChevronRight, FileText,
  MapPin, Menu, Search, ShieldAlert, Store, X
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ThemeToggle } from "../components/ThemeToggle";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useAuth } from "../context/AuthContext";
import { vendors, inspectionRows, reports } from "../data/mockData";

export function Topbar({ theme, toggleTheme, mobileOpen, setMobileOpen }) {
  const { role, user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);

  const profilePath = role === "vendor" ? "/vendor/profile" : "/profile";
  const notificationsPath = role === "vendor" ? "/vendor/notifications" : "/notifications";
  const avatarInitials = role === "vendor" ? "PS" : "AS";

  // Recent notifications list
  const recentNotifications = [
    {
      id: "n1",
      title: "Upcoming Inspection",
      vendor: "Annapurna Snacks",
      location: "College Road",
      time: "10 mins ago",
      type: "warning",
      status: "Due Soon",
      to: "/vendors/ST-1041"
    },
    {
      id: "n2",
      title: "Inspection Finalized",
      vendor: "Shree Misal Corner",
      location: "Nashik Road",
      time: "2 hours ago",
      type: "success",
      status: "Compliant",
      to: "/inspections/inspection-1/report"
    },
    {
      id: "n3",
      title: "License Renewal Alert",
      vendor: "Ganga Tea & Snacks",
      location: "Nashik City",
      time: "1 day ago",
      type: "alert",
      status: "Overdue",
      to: "/vendors/ST-1152"
    }
  ];

  // Filter search results across vendors, inspections, reports
  const searchResults = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return {
        vendors: vendors.slice(0, 3),
        inspections: inspectionRows.slice(0, 2),
        reports: reports.slice(0, 1)
      };
    }
    return {
      vendors: vendors.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.id.toLowerCase().includes(q) ||
          v.area.toLowerCase().includes(q)
      ).slice(0, 4),
      inspections: inspectionRows.filter(
        (i) =>
          i.code.toLowerCase().includes(q) ||
          i.vendor.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      ).slice(0, 3),
      reports: reports.filter(
        (r) =>
          r.code.toLowerCase().includes(q) ||
          r.vendor.toLowerCase().includes(q)
      ).slice(0, 3)
    };
  }, [searchQuery]);

  const hasResults =
    searchResults.vendors.length > 0 ||
    searchResults.inspections.length > 0 ||
    searchResults.reports.length > 0;

  // Handle outside click & escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setShowNotifs(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelectResult = (path) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(path);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <Link to={role === "vendor" ? "/vendor/dashboard" : "/dashboard"} className="mobile-topbar-brand">
          <span className="mobile-brand-mark">ST</span>
        </Link>
        <Breadcrumbs />
      </div>

      <div className="topbar-center" ref={searchRef}>
        <div className={`global-search ${isSearchOpen ? "focused" : ""}`}>
          <Search size={17} />
          <input
            placeholder={t("common.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            aria-label="Global search"
          />
          {searchQuery && (
            <button
              className="search-clear-btn"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Global Search Overlay Dropdown */}
        {isSearchOpen && (
          <div className="search-dropdown-overlay" role="dialog" aria-label="Search results">
            <div className="search-overlay-header">
              <span>{searchQuery ? "Search Results" : "Suggested & Recent"}</span>
              <kbd className="esc-badge">ESC</kbd>
            </div>

            <div className="search-results-scroll">
              {!hasResults ? (
                <div className="search-empty-state">
                  <p>No matches found for "{searchQuery}"</p>
                  <small>Try searching by vendor name, location, or inspection ID</small>
                </div>
              ) : (
                <>
                  {/* Vendors Group */}
                  {searchResults.vendors.length > 0 && (
                    <div className="search-group">
                      <div className="search-group-title">
                        <Store size={13} /> Vendors
                      </div>
                      {searchResults.vendors.map((v) => (
                        <div
                          key={v.id}
                          className="search-result-item"
                          onClick={() => handleSelectResult(`/vendors/${v.id}`)}
                        >
                          <div className="search-item-icon">
                            <Store size={15} />
                          </div>
                          <div className="search-item-info">
                            <strong>{v.name}</strong>
                            <small>{v.area} · Score: {v.score}/100</small>
                          </div>
                          <span className={`status-pill ${v.status === "Compliant" ? "green" : v.status === "Warning" ? "amber" : "red"}`}>
                            {v.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inspections Group */}
                  {searchResults.inspections.length > 0 && (
                    <div className="search-group">
                      <div className="search-group-title">
                        <FileText size={13} /> Inspections
                      </div>
                      {searchResults.inspections.map((insp) => (
                        <div
                          key={insp.id}
                          className="search-result-item"
                          onClick={() => handleSelectResult(`/inspections/${insp.id}/report`)}
                        >
                          <div className="search-item-icon">
                            <FileText size={15} />
                          </div>
                          <div className="search-item-info">
                            <strong>{insp.code}</strong>
                            <small>{insp.vendor} · {insp.location}</small>
                          </div>
                          <span className="status-pill gray">{insp.status}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reports Group */}
                  {searchResults.reports.length > 0 && (
                    <div className="search-group">
                      <div className="search-group-title">
                        <CheckCircle2 size={13} /> Reports
                      </div>
                      {searchResults.reports.map((rep) => (
                        <div
                          key={rep.id}
                          className="search-result-item"
                          onClick={() => handleSelectResult(`/inspections/${rep.inspectionId || "inspection-1"}/report`)}
                        >
                          <div className="search-item-icon">
                            <CheckCircle2 size={15} />
                          </div>
                          <div className="search-item-info">
                            <strong>Report {rep.code}</strong>
                            <small>{rep.vendor} · {rep.date}</small>
                          </div>
                          <span className="search-score-pill">{rep.score}/100</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="top-actions">
        <LanguageSwitcher />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        {/* Notification Bell + Dropdown */}
        <div className="notif-dropdown-wrapper" ref={notifRef}>
          <button
            className={`icon-btn ${showNotifs ? "active" : ""}`}
            title={t("common.notifications")}
            onClick={() => setShowNotifs(!showNotifs)}
            aria-label="Notifications"
            aria-expanded={showNotifs}
          >
            <Bell size={19} />
            <i className="notif-badge-dot"></i>
          </button>

          {showNotifs && (
            <div className="notif-dropdown" role="dialog" aria-label="Recent notifications">
              <div className="notif-dropdown-header">
                <div>
                  <strong>{t("common.notifications")}</strong>
                  <span className="notif-count-tag">3 New</span>
                </div>
              </div>

              <div className="notif-dropdown-list">
                {recentNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`notif-dropdown-item ${n.type}`}
                    onClick={() => {
                      setShowNotifs(false);
                      navigate(n.to);
                    }}
                  >
                    <div className={`notif-item-icon ${n.type}`}>
                      {n.type === "alert" ? (
                        <ShieldAlert size={15} />
                      ) : n.type === "warning" ? (
                        <Bell size={15} />
                      ) : (
                        <CheckCircle2 size={15} />
                      )}
                    </div>
                    <div className="notif-item-content">
                      <div className="notif-item-top">
                        <strong>{n.title}</strong>
                        <span className="notif-item-time">{n.time}</span>
                      </div>
                      <p>{n.vendor} · {n.location}</p>
                      <span className={`status-pill mini ${n.type === "success" ? "green" : n.type === "warning" ? "amber" : "red"}`}>
                        {n.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="notif-dropdown-footer">
                <button
                  className="notif-view-all-btn"
                  onClick={() => {
                    setShowNotifs(false);
                    navigate(notificationsPath);
                  }}
                >
                  View all notifications <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="avatar"
          title={user?.name || t("common.profile")}
          onClick={() => navigate(profilePath)}
          aria-label="User profile"
        >
          {avatarInitials}
        </button>
      </div>
    </header>
  );
}
