import React from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ theme, toggleTheme, className = "" }) {
  return (
    <button 
      className={`icon-btn theme-btn ${className}`} 
      onClick={toggleTheme} 
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`} 
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
