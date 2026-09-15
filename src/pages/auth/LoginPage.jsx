import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, ClipboardCheck, Globe2, Store } from "lucide-react";
import { Logo } from "../../components/Logo";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useAuth } from "../../context/AuthContext";

export function LoginPage() {
  const { login } = useAuth();
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
      setError("Please enter your email and password.");
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
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="login-visual">
        <div className="login-visual-inner">
          <Logo dark />
          <div className="visual-copy">
            <span className="eyebrow">INSPECTION & VERIFICATION PLATFORM</span>
            <h1>Make every street<br /><em>safer to trust.</em></h1>
            <p>Digitize inspections, surface compliance risks, and give the public a clear way to verify trusted food businesses.</p>
            <div className="trust-points">
              <div><CheckCircle2 /> Standardized inspections</div>
              <div><CheckCircle2 /> Evidence-backed compliance</div>
              <div><CheckCircle2 /> Public verification</div>
            </div>
          </div>
          <div className="visual-foot">
            <span>VERIFY. INSPECT. TRUST.</span>
            <span>© 2026 StreetTrust</span>
          </div>
        </div>
      </div>
      <div className="login-form-side">
        <div className="mobile-logo"><Logo /></div>
        <div className="login-card">
          <span className="eyebrow">WELCOME BACK</span>
          <h2>Sign in to StreetTrust</h2>
          <p className="muted">Access your inspection and compliance workspace.</p>

          <div className="role-switch">
            <button
              className={role === "inspector" ? "active" : ""}
              onClick={() => setRole("inspector")}
            >
              <ClipboardCheck size={16} /> Inspector
            </button>
            <button
              className={role === "vendor" ? "active" : ""}
              onClick={() => setRole("vendor")}
            >
              <Store size={16} /> Vendor
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Email / Username
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === "inspector" ? "inspector@streettrust.app" : "vendor@streettrust.app"}
              />
            </label>
            <label>
              Password
              <div className="password-wrap">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            {error && <div className="form-error">{error}</div>}
            <div className="form-options">
              <label className="checkbox">
                <input type="checkbox" /> <span>Remember me</span>
              </label>
              <button type="button" className="link-btn">Forgot password?</button>
            </div>
            <button className="primary-btn full" type="submit">
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider"><span>OR</span></div>
          <button className="public-btn" onClick={handlePublicClick}>
            <Globe2 size={18} /> Continue as Public User
          </button>
          <div className="demo-hint">Demo: any non-empty credentials work in this frontend prototype.</div>
        </div>
      </div>
    </div>
  );
}
