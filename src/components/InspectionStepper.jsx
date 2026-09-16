import React from "react";
import { Check } from "lucide-react";

const STEPS = [
  { num: 1, label: "Vendor", key: "vendor" },
  { num: 2, label: "Checklist", key: "checklist" },
  { num: 3, label: "Evidence", key: "evidence" },
  { num: 4, label: "AI Analysis", key: "analysis" },
  { num: 5, label: "Report", key: "report" }
];

export function InspectionStepper({ currentStep = 1 }) {
  return (
    <div className="inspection-stepper" role="navigation" aria-label="Inspection progress">
      <div className="stepper-track">
        {STEPS.map((step, idx) => {
          const isCompleted = step.num < currentStep;
          const isActive = step.num === currentStep;
          const isUpcoming = step.num > currentStep;

          return (
            <React.Fragment key={step.key}>
              <div
                className={`stepper-node ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""} ${isUpcoming ? "upcoming" : ""}`}
                aria-current={isActive ? "step" : undefined}
              >
                <div className="stepper-circle">
                  {isCompleted ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>
                <span className="stepper-label">{step.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`stepper-connector ${step.num < currentStep ? "completed" : ""}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
