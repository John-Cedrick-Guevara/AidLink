export interface BankAccount {
  id: string;
  account_name: string;
  account_number: string;
  bank_name: string;
}
// Insert bank account details

export interface BankAccountInsert {
  account_name: string;
  account_number: string;
  bank_name: string;
  user: string;
  project_id: string;
}

export interface ProposalFormData {
  title: string;
  description: string;
  sector: string;
  team_size: string;
  expected_outcome: string;
  potential_risks: string;
  target_funds: string;
  target_start_date: string;
  tags: string;
  bank_accounts: BankAccount[];
  supporting_docs: File;
}

export interface StepConfig {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export interface FormStepProps {
  formData: ProposalFormData;
  onFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (name: keyof ProposalFormData, value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddBankAccount?: (account: Omit<BankAccount, "id">) => void;
  onRemoveBankAccount?: (id: string) => void;
  onUpdateBankAccount?: (id: string, account: Omit<BankAccount, "id">) => void;
}
