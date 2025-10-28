import { Progress } from "@/components/ui/progress";

interface FormProgressBarProps {
  currentStep: number;
  totalSteps: number;
  progress: number;
}

const FormProgressBar = ({
  currentStep,
  totalSteps,
  progress,
}: FormProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default FormProgressBar;
