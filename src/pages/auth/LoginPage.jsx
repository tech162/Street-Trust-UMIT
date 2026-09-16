import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, CheckCircle2, ClipboardCheck, Globe2, Store } from "lucide-react";
import { Logo } from "../../components/Logo";
import { ThemeToggle } from "../../components/ThemeToggle";
import { LanguageSwitcher } from "../../components/LanguageSwitcher";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role, setRole] = useState("inspector");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("st_theme") || "light");

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("st_theme", next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(t("login.errorRequired"));
      return;
    }
    login(role);
    if (role === "inspector") {
      navigate("/dashboard");
    } else {
      navigate("/vendor/dashboard");
    }
  };

  const handlePublicClick = () => {
    login("public");
    navigate("/public/verify");
  };

  return (
    <div className="login-page" data-theme={theme}>
      <div className="login-top-right">
        <LanguageSwitcher />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="login-visual">
        <div className="login-visual-inner">
          <Logo dark />
          <div className="visual-copy">
            <span className="eyebrow">{t("login.inspectionPlatform")}</span>
            <h1>{t("login.tagline")}<br /><em>{t("login.taglineEm")}</em></h1>
            <p>{t("login.taglineDesc")}</p>
            <div className="trust-points">
              <div><CheckCircle2 /> {t("login.trust1")}</div>
              <div><CheckCircle2 /> {t("login.trust2")}</div>
              <div><CheckCircle2 /> {t("login.trust3")}</div>
            </div>
          </div>
          <div className="visual-foot">
            <span>{t("login.verifyInspectTrust")}</span>
            <span>{t("login.copyright")}</span>
          </div>
        </div>
      </div>
      <div className="login-form-side">
        <div className="mobile-logo"><Logo /></div>
        <div className="login-card">
          <span className="eyebrow">{t("login.welcomeBack")}</span>
          <h2>{t("login.signInTitle")}</h2>
          <p className="muted">{t("login.signInSubtitle")}</p>

          <div className="role-switch">
            <button
              className={role === "inspector" ? "active" : ""}
              onClick={() => setRole("inspector")}
            >
              <ClipboardCheck size={16} /> {t("login.inspector")}
            </button>
            <button
              className={role === "vendor" ? "active" : ""}
              onClick={() => setRole("vendor")}
            >
              <Store size={16} /> {t("login.vendor")}
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              {t("login.emailLabel")}
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "inspector" ? "inspector@streettrust.app" : "vendor@streettrust.app"}
              />
            </label>
            <label>
              {t("login.passwordLabel")}
              <div className="password-wrap">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("login.passwordPlaceholder")}
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? t("login.hide") : t("login.show")}
                </button>
              </div>
            </label>
            {error && <div className="form-error">{error}</div>}
            <div className="form-options">
              <label className="checkbox">
                <input type="checkbox" /> <span>{t("login.rememberMe")}</span>
              </label>
              <button type="button" className="link-btn">{t("login.forgotPassword")}</button>
            </div>
            <button className="primary-btn full" type="submit">
              {t("login.signIn")} <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider"><span>{t("common.or")}</span></div>
          <button className="public-btn" onClick={handlePublicClick}>
            <Globe2 size={18} /> {t("login.publicUser")}
          </button>
          <div className="demo-hint">{t("login.demoHint")}</div>
        </div>
      </div>
    </div>
  );
}
