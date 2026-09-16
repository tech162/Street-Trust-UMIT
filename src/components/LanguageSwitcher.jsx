import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe2, ChevronDown, Check } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("st_language", code);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-trigger"
        onClick={() => setOpen((o) => !o)}
        title="Change language"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe2 size={16} />
        <span className="lang-code">{current.code.toUpperCase()}</span>
        <ChevronDown size={13} className={open ? "rotated" : ""} />
      </button>

      {open && (
        <div className="lang-dropdown" role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={"lang-option" + (lang.code === current.code ? " active" : "")}
              onClick={() => changeLanguage(lang.code)}
              role="option"
              aria-selected={lang.code === current.code}
            >
              <span className="lang-native">{lang.native}</span>
              <span className="lang-english">{lang.label}</span>
              {lang.code === current.code && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
