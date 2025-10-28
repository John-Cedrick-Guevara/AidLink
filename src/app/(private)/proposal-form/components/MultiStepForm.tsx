"use client";
import { Card } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { FileText, Target, DollarSign, Upload } from "lucide-react";

// Components
import FormProgressBar from "./FormProgressBar";
import StepIndicators from "./StepIndicators";
import FormNavigation from "./FormNavigation";
import Step1GeneralInfo from "./steps/Step1GeneralInfo";
import Step2Objectives from "./steps/Step2Objectives";
import Step3Funding from "./steps/Step3Funding";
import Step4Documents from "./steps/Step4Documents";

// Hooks
import { useProposalForm } from "../hooks/useProposalForm";

// Types
import type { StepConfig } from "../types";

const MultiStepProjectForm = () => {
  const {
    currentStep,
    formData,
    totalSteps,
    progress,
    isPending,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleAddBankAccount,
    handleRemoveBankAccount,
    handleUpdateBankAccount,
    nextStep,
    prevStep,
    handleSubmit,
  } = useProposalForm();

  const stepConfigs: StepConfig[] = [
    { icon: FileText, title: "General Info", desc: "Basic project details" },
    { icon: Target, title: "Objectives", desc: "Goals and challenges" },
    { icon: DollarSign, title: "Funding", desc: "Budget and timeline" },
    { icon: Upload, title: "Documents", desc: "Supporting files" },
  ];

  const formStepProps = {
    formData,
    onFormChange: handleChange,
    onSelectChange: handleSelectChange,
    onFileChange: handleFileChange,
    onAddBankAccount: handleAddBankAccount,
    onRemoveBankAccount: handleRemoveBankAccount,
    onUpdateBankAccount: handleUpdateBankAccount,
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <FormProgressBar
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
      />

      {/* Step Indicators */}
      <StepIndicators steps={stepConfigs} currentStep={currentStep} />

      {/* Form Content */}
      <Card className="glass-card p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && <Step1GeneralInfo {...formStepProps} />}
          {currentStep === 2 && <Step2Objectives {...formStepProps} />}
          {currentStep === 3 && <Step3Funding {...formStepProps} />}
          {currentStep === 4 && <Step4Documents {...formStepProps} />}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPrevious={prevStep}
          onNext={nextStep}
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      </Card>
    </div>
  );
};

export default MultiStepProjectForm;
