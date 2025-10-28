import { CheckCircle2 } from "lucide-react";
import type { StepConfig } from "../types";

interface StepIndicatorsProps {
  steps: StepConfig[];
  currentStep: number;
}

const StepIndicators = ({ steps, currentStep }: StepIndicatorsProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {steps.map((step, index) => {
        const StepIcon = step.icon;
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div
            key={stepNumber}
            className={`p-3 rounded-lg border-2 transition-all ${
              isActive
                ? "border-primary bg-primary/5"
                : isCompleted
                ? "border-success bg-success/5"
                : "border-border bg-muted/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-success" />
              ) : (
                <StepIcon
                  className={`w-4 h-4 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              )}
              <span
                className={`text-xs font-semibold ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                    ? "text-success"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{step.desc}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicators;
