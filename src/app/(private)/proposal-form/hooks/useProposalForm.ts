import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { BankAccount, ProposalFormData } from "../types";
import {
  handleCreateProject,
  handleGetSectors,
} from "../server/proposalActions";

export const useProposalForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ProposalFormData>({
    title: "",
    description: "",
    sector: "",
    team_size: "",
    expected_outcome: "",
    potential_risks: "",
    target_funds: "",
    target_start_date: "",
    tags: "",
    bank_accounts: [],
    supporting_docs: [],
  });
  const [isPending, startTransition] = useTransition();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof ProposalFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        supporting_docs: Array.from(e.target.files || []),
      }));
    }
  };

  const handleAddBankAccount = (account: Omit<BankAccount, "id">) => {
    const newAccount: BankAccount = {
      ...account,
      id: crypto.randomUUID(),
    };
    setFormData((prev) => ({
      ...prev,
      bank_accounts: [...prev.bank_accounts, newAccount],
    }));
    toast.success("Bank account added successfully");
  };

  const handleRemoveBankAccount = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      bank_accounts: prev.bank_accounts.filter((account) => account.id !== id),
    }));
    toast.success("Bank account removed");
  };

  const handleUpdateBankAccount = (
    id: string,
    account: Omit<BankAccount, "id">
  ) => {
    setFormData((prev) => ({
      ...prev,
      bank_accounts: prev.bank_accounts.map((acc) =>
        acc.id === id ? { ...account, id } : acc
      ),
    }));
    toast.success("Bank account updated");
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (
          !formData.title.trim() ||
          !formData.description.trim() ||
          !formData.sector
        ) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (formData.description.length < 50) {
          toast.error("Description must be at least 50 characters");
          return false;
        }
        return true;

      case 2:
        if (
          !formData.expected_outcome.trim() ||
          !formData.potential_risks.trim() ||
          !formData.team_size.trim()
        ) {
          toast.error("Please fill in all required fields");
          return false;
        }
        return true;

      case 3:
        if (
          !formData.target_funds ||
          Number(formData.target_funds) <= 0 ||
          !formData.target_start_date
        ) {
          toast.error("Please fill in all required fields");
          return false;
        }
        if (formData.bank_accounts.length === 0) {
          toast.error("Please add at least one bank account");
          return false;
        }
        return true;

      case 4:
        if (!formData.tags.trim()) {
          toast.error("Please add at least one tag");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(currentStep)) {
      return;
    }

    startTransition(async () => {
      try {
        const result = await handleCreateProject(formData);

        if (result.success) {
          toast.success(result.message, {
            description: "Your project is now pending admin approval.",
          });

          // Navigate to dashboard after successful submission
          router.push("/dashboard");
        } else {
          toast.error(result.message || "Failed to submit project proposal");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return {
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
  };
};
