import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("st_user_role") || null;
  });

  const [user, setUser] = useState(() => {
    const savedRole = localStorage.getItem("st_user_role");
    if (savedRole === "inspector") return { name: "Inspector Aarav", email: "inspector@streettrust.app" };
    if (savedRole === "vendor") return { name: "Priya Sharma", email: "vendor@streettrust.app", vendorId: "ST-1024" };
    if (savedRole === "public") return { name: "Public User", email: "public@streettrust.app" };
    return null;
  });

  const login = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("st_user_role", selectedRole);
    if (selectedRole === "inspector") {
      setUser({ name: "Inspector Aarav", email: "inspector@streettrust.app" });
    } else if (selectedRole === "vendor") {
      setUser({ name: "Priya Sharma", email: "vendor@streettrust.app", vendorId: "ST-1024" });
    } else {
      setUser({ name: "Public User", email: "public@streettrust.app" });
    }
  };

  const logout = () => {
    setRole(null);
    setUser(null);
    localStorage.removeItem("st_user_role");
  };

  return (
    <AuthContext.Provider value={{ role, user, isAuthenticated: !!role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
