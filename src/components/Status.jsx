import React from "react";

export function Status({ children }) {
  const cls = String(children).toLowerCase().replaceAll(" ", "-");
  return <span className={"status " + cls}>{children}</span>;
}
