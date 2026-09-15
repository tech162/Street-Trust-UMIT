import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppLayout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("st_theme") || "light";
  });

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("st_sidebar_collapsed") === "true";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("st_theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("st_sidebar_collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setCollapsed((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="app-shell" data-theme={theme}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={"main-area " + (collapsed ? "expanded-main" : "")}>
        <Topbar
          theme={theme}
          toggleTheme={toggleTheme}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
