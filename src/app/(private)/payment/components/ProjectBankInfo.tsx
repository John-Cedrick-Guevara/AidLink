import { Project } from "@/types";

interface ProjectBankInfoProps {
  project: Project;
}

export const ProjectBankInfo = ({ project }: ProjectBankInfoProps) => {
  if (!project.bank_details || project.bank_details.length === 0) {
    return null;
  }

  const bankAccount = project.bank_details[0];

  return (
    <div className="mb-6 p-4 bg-muted/50 rounded-lg border">
      <p className="text-xs font-semibold mb-2">Payment will be sent to:</p>
      <p className="text-sm font-medium">{bankAccount.account_name}</p>
      <p className="text-xs text-muted-foreground">{bankAccount.bank_name}</p>
      <p className="text-xs text-muted-foreground">
        Account: {bankAccount.account_number}
      </p>
    </div>
  );
};
