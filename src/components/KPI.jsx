import React, { useEffect, useRef, useState } from "react";

function useCountUp(target, duration = 700) {
  const [value, setValue] = useState(0);
  const num = parseFloat(target);
  const isNum = !isNaN(num) && String(target).trim() !== "";

  useEffect(() => {
    if (!isNum) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setValue(num); return; }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(ease * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [num, duration, isNum]);

  return isNum ? value : target;
}

export function KPI({ label, value, detail, icon: Icon, kind = "" }) {
  const displayed = useCountUp(value);
  return (
    <div className="kpi">
      <div className={"kpi-icon " + kind}><Icon size={20} /></div>
      <div>
        <span>{label}</span>
        <strong>{displayed}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}
