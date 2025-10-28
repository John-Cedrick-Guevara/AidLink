import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Save, Loader2 } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isPending?: boolean;
}

const FormNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isPending = false,
}: FormNavigationProps) => {
  return (
    <div className="flex gap-4 mt-8 pt-6 border-t border-border/50">
      {currentStep > 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="flex-1"
          disabled={isPending}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
      )}
      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={onNext}
          className="flex-1 bg-gradient-primary hover:opacity-90"
          disabled={isPending}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          type="button"
          onClick={onSubmit}
          className="flex-1 bg-gradient-primary hover:opacity-90"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Submit Proposal
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
