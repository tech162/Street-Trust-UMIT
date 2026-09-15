import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("st_theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("st_theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="public-page" data-theme={theme}>
      <Outlet context={{ theme, toggleTheme }} />
    </div>
  );
}
