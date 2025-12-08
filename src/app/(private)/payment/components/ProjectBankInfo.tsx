import { Project } from "@/types";
import { decrypt } from "@/lib/crypto";

interface ProjectBankInfoProps {
  project: Project;
}

export const ProjectBankInfo = ({ project }: ProjectBankInfoProps) => {
  if (!project.bank_details || project.bank_details.length === 0) {
    return null;
  }

  const bankAccount = project.bank_details[0];

  // Decrypt sensitive bank information
  const accountName = decrypt(bankAccount.account_name);
  const bankName = decrypt(bankAccount.bank_name);
  const accountNumber = decrypt(bankAccount.account_number);

  return (
    <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
      <p className="text-xs font-semibold mb-2">Payment will be sent to:</p>
      <p className="text-sm font-medium">{accountName}</p>
      <p className="text-xs text-muted-foreground">{bankName}</p>
      <p className="text-xs text-muted-foreground">Account: {accountNumber}</p>
    </div>
  );
};
