export interface Project {
  id: string;
  title: string;
  description: string;
  target_funds: number;
  expected_outcome: string;
  potential_risks: string;
  status: "pending" | "approved" | "rejected" | "completed";
  image?: string;
  team_size: string;
  tags: string;
  documents_url: string;

  funds: Fund[];
  proposer: User;
  sector: Sector;
  comments: Comment[];
  ratings?: Rating[];
  bank_details?: DecryptedBankAccount[];
  updates?: ProjectUpdate[];

  created_at: string;
  updatedAt: string;
  target_start_date: string;
}

// Raw encrypted bank account from database
export interface EncryptedBankAccount {
  id: string;
  bank_name: { content: string; iv: string; tag: string };
  account_number: { content: string; iv: string; tag: string };
  account_name: { content: string; iv: string; tag: string };
}

// Decrypted bank account for client use
export interface DecryptedBankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
}

// For backwards compatibility
export type BankAccount = EncryptedBankAccount;

export interface Notifications {
  id: string;
  type: "donation" | "approval" | "rejection" | "comment" | "update";
  title: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface Fund {
  id: string;
  amount: number;
  project: string;
  status: "pending" | "approve" | "failed";

  user: User;
  sector: Sector;
  method: string;
  receipt_url?: string;

  created_at: string;
  updated_at: string;
}

export interface FundSummary {
  amount: number;
  id: string;
  method: string;
  receipt_url: string;
  status: string;
  created_at: string;

  project: {
    title: string;
    proposer: string;
  };

  user: {
    email: string;
    full_name: string;
    id: string;
  };
}

export interface Comment {
  id: string;
  content: string;
  project: string;

  user_id: User;

  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  full_name: string;
  email: string;
  status: "normal" | "restricted";
  role: "admin" | "user";

  fundsDonated: number;
  projectsCount: number;

  created_at: string;
  updated_at: string;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  project: string;
  user: string;
  created_at: string;
}

export interface SectorList {
  id: string;
  title: string;
  description: string;
  projectCount: number;
  totalRaised: number;
}

export interface Sector {
  id: string;
  title: string;
  description: string;

  created_at: string;
  updated_at: string;
}

export interface Rating {
  id: string;
  rating: number;
  project: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Developer {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface HowItWorksStep {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  step: string;
}
