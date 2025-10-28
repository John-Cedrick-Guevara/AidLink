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

  funds: Fund[];
  proposer: User;
  sector: Sector;
  comments: Comment[];
  ratings?: Rating[];
  bank_details?: BankAccount[];

  createdAt: string;
  updatedAt: string;
  target_start_date: string;
}

export interface BankAccount {
  id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
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
