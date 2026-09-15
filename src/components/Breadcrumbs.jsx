import React from "react";
import { useLocation, Link } from "react-router-dom";
import { getVendor, getInspection } from "../data/mockData";

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0 || location.pathname === "/login") {
    return <div className="crumb"><span>StreetTrust</span><b>/</b><strong>Dashboard</strong></div>;
  }

  const crumbs = [];

  // Always start with StreetTrust / Dashboard if in inspector or vendor workspace
  if (pathSegments[0] === "vendor") {
    crumbs.push({ label: "Vendor Portal", to: "/vendor/dashboard" });
    if (pathSegments[1]) {
      const sub = pathSegments[1];
      const title = sub === "qr" ? "QR Verification" : sub.charAt(0).toUpperCase() + sub.slice(1);
      crumbs.push({ label: title, to: `/vendor/${sub}` });
    }
  } else {
    crumbs.push({ label: "StreetTrust", to: "/dashboard" });

    let currentPath = "";
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      currentPath += `/${segment}`;

      let label = segment.charAt(0).toUpperCase() + segment.slice(1);

      // Check if dynamic ID for vendor or inspection
      if (pathSegments[i - 1] === "vendors") {
        const v = getVendor(segment);
        if (v) label = v.name;
      } else if (pathSegments[i - 1] === "inspections" || pathSegments[i - 1] === "reports") {
        const insp = getInspection(segment);
        if (insp) label = insp.code || insp.vendor;
      }

      crumbs.push({ label, to: currentPath });
    }
  }

  return (
    <div className="crumb">
      {crumbs.map((c, idx) => (
        <React.Fragment key={c.to + idx}>
          {idx > 0 && <b>/</b>}
          {idx === crumbs.length - 1 ? (
            <strong>{c.label}</strong>
          ) : (
            <Link to={c.to} style={{ color: "inherit", textDecoration: "none" }}>
              <span>{c.label}</span>
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
