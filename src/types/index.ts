export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  status: "pending" | "approved" | "rejected" | "completed";
  image?: string;
  author: string;
  createdAt: string; // Changed from Date to string
  updatedAt: string; // Changed from Date to string
  deadline?: string; // Changed from Date to string
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
