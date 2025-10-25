export interface Project {
  id: string;
  title: string;
  description: string;
  target_funds: number;
  current_funds: number;
  proposer_id: string;
  proposer_name: string;
  sector: string;
  status: "pending" | "approved" | "rejected" | "completed";
  team_size: string;
  expected_outcome: string;
  potential_risks: string;
  target_start_date: string;
  tags: string[];
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
  projects_contributed: number;
}

export interface Developer {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface FundingReceipt {
  id: string;
  project_id: string;
  project_title: string;
  donor_name: string;
  donor_email: string;
  amount: number;
  receipt_url: string;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  reviewed_at?: string;
}

export interface ProjectRating {
  id: string;
  project_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: "donation" | "approval" | "rejection" | "comment" | "update";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  projectId?: string;
}

export const sectors = [
  "Education",
  "Environment",
  "Health",
  "Community",
  "Technology",
  "Arts & Culture",
];

export const dummyProjects: Project[] = [
  {
    id: "1",
    title: "Digital Library for Rural Schools",
    description: "Creating a digital library platform with e-books and educational resources for students in rural areas who lack access to physical libraries. This includes tablets and internet connectivity.",
    target_funds: 50000,
    current_funds: 32500,
    proposer_id: "u1",
    proposer_name: "Maria Santos",
    sector: "Education",
    status: "approved",
    team_size: "8 students, 2 teachers",
    expected_outcome: "Provide digital reading materials to 500+ students across 5 rural schools",
    potential_risks: "Internet connectivity issues, device maintenance challenges",
    target_start_date: "2025-11-15",
    tags: ["SDG4", "Education", "Technology", "Rural Development"],
    created_at: "2025-09-20",
  },
  {
    id: "2",
    title: "Community Garden Initiative",
    description: "Establishing community gardens in three neighborhoods to promote sustainable agriculture, provide fresh produce, and create green spaces for education and recreation.",
    target_funds: 25000,
    current_funds: 18750,
    proposer_id: "u2",
    proposer_name: "Juan Dela Cruz",
    sector: "Environment",
    status: "approved",
    team_size: "12 students",
    expected_outcome: "3 fully functional community gardens serving 200+ families",
    potential_risks: "Weather conditions, land permissions, volunteer coordination",
    target_start_date: "2025-10-01",
    tags: ["SDG2", "Environment", "Sustainability", "Community"],
    created_at: "2025-09-15",
  },
  {
    id: "3",
    title: "Mental Health Awareness Campaign",
    description: "A comprehensive mental health awareness program including workshops, counseling sessions, and resource materials for students dealing with stress, anxiety, and depression.",
    target_funds: 35000,
    current_funds: 8750,
    proposer_id: "u3",
    proposer_name: "Dr. Lisa Reyes",
    sector: "Health",
    status: "approved",
    team_size: "5 students, 3 counselors",
    expected_outcome: "Reach 1000+ students with mental health support and awareness",
    potential_risks: "Stigma around mental health, student participation rates",
    target_start_date: "2025-11-01",
    tags: ["SDG3", "Health", "Wellness", "Youth"],
    created_at: "2025-09-25",
  },
  {
    id: "4",
    title: "Youth Coding Bootcamp",
    description: "Free coding bootcamp for underprivileged youth aged 13-18, teaching web development, Python, and computer science fundamentals to prepare them for tech careers.",
    target_funds: 40000,
    current_funds: 5000,
    proposer_id: "u4",
    proposer_name: "Alex Torres",
    sector: "Technology",
    status: "pending",
    team_size: "6 instructors",
    expected_outcome: "Train 50 students in programming and help 20+ get internships",
    potential_risks: "Access to computers, student retention, instructor availability",
    target_start_date: "2025-12-01",
    tags: ["SDG4", "Technology", "Education", "Career Development"],
    created_at: "2025-10-05",
  },
  {
    id: "5",
    title: "Art Therapy for Special Needs Children",
    description: "Monthly art therapy sessions designed specifically for children with special needs, helping them express emotions, develop motor skills, and build confidence through creative activities.",
    target_funds: 20000,
    current_funds: 2500,
    proposer_id: "u5",
    proposer_name: "Carmen Garcia",
    sector: "Arts & Culture",
    status: "pending",
    team_size: "4 art therapists, 6 volunteers",
    expected_outcome: "Provide therapeutic support to 30+ special needs children",
    potential_risks: "Material costs, therapist scheduling, parental engagement",
    target_start_date: "2025-11-20",
    tags: ["SDG3", "Arts", "Health", "Inclusion"],
    created_at: "2025-10-08",
  },
  {
    id: "6",
    title: "Clean Water Access for Remote Communities",
    description: "Installing water filtration systems in 3 remote barangays that currently lack access to clean drinking water, reducing waterborne diseases and improving quality of life.",
    target_funds: 75000,
    current_funds: 15000,
    proposer_id: "u2",
    proposer_name: "Juan Dela Cruz",
    sector: "Health",
    status: "approved",
    team_size: "10 students, 2 engineers",
    expected_outcome: "Provide clean water access to 800+ residents",
    potential_risks: "Transportation to remote areas, installation complexity, maintenance",
    target_start_date: "2025-12-15",
    tags: ["SDG6", "Health", "Community", "Infrastructure"],
    created_at: "2025-09-30",
  },
];

export const dummyUsers: User[] = [
  {
    id: "u1",
    name: "Maria Santos",
    email: "maria.santos@school.edu",
    role: "student",
    projects_contributed: 2,
  },
  {
    id: "u2",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@school.edu",
    role: "student",
    projects_contributed: 3,
  },
  {
    id: "u3",
    name: "Dr. Lisa Reyes",
    email: "lisa.reyes@school.edu",
    role: "teacher",
    projects_contributed: 1,
  },
  {
    id: "u4",
    name: "Alex Torres",
    email: "alex.torres@school.edu",
    role: "student",
    projects_contributed: 1,
  },
  {
    id: "u5",
    name: "Carmen Garcia",
    email: "carmen.garcia@school.edu",
    role: "teacher",
    projects_contributed: 1,
  },
  {
    id: "admin",
    name: "Admin Demo",
    email: "admin@school.edu",
    role: "admin",
    projects_contributed: 0,
  },
];

export const developers: Developer[] = [
  {
    name: "Sofia Martinez",
    role: "Researcher",
    avatar: "SM",
    bio: "Led the research phase, analyzing user needs and platform requirements for the charity system.",
  },
  {
    name: "Carlos Bautista",
    role: "UI Designer",
    avatar: "CB",
    bio: "Designed the futuristic interface with glassmorphism effects and created the blue-yellow visual identity.",
  },
  {
    name: "Isabella Ramos",
    role: "Frontend Developer",
    avatar: "IR",
    bio: "Built the React frontend with TypeScript, implementing responsive designs and smooth animations.",
  },
  {
    name: "Miguel Hernandez",
    role: "Backend Developer",
    avatar: "MH",
    bio: "Architected the backend system design for database schemas, authentication, and API endpoints.",
  },
];

export const fundingReceipts: FundingReceipt[] = [
  {
    id: "f1",
    project_id: "1",
    project_title: "Digital Library for Rural Schools",
    donor_name: "Anonymous Donor",
    donor_email: "donor1@email.com",
    amount: 15000,
    receipt_url: "/receipts/receipt1.pdf",
    status: "approved",
    submitted_at: "2025-10-01",
    reviewed_at: "2025-10-02",
  },
  {
    id: "f2",
    project_id: "1",
    project_title: "Digital Library for Rural Schools",
    donor_name: "John Smith",
    donor_email: "john.smith@email.com",
    amount: 10000,
    receipt_url: "/receipts/receipt2.pdf",
    status: "pending",
    submitted_at: "2025-10-15",
  },
  {
    id: "f3",
    project_id: "2",
    project_title: "Community Garden Initiative",
    donor_name: "Maria Garcia",
    donor_email: "maria.g@email.com",
    amount: 8000,
    receipt_url: "/receipts/receipt3.pdf",
    status: "approved",
    submitted_at: "2025-10-05",
    reviewed_at: "2025-10-06",
  },
  {
    id: "f4",
    project_id: "3",
    project_title: "Mental Health Awareness Campaign",
    donor_name: "Tech Company Inc",
    donor_email: "donations@techco.com",
    amount: 5000,
    receipt_url: "/receipts/receipt4.pdf",
    status: "pending",
    submitted_at: "2025-10-18",
  },
];

export const projectRatings: ProjectRating[] = [
  {
    id: "r1",
    project_id: "1",
    user_id: "u1",
    user_name: "Maria Santos",
    rating: 5,
    comment: "Excellent project with great impact!",
    created_at: "2025-10-10",
  },
  {
    id: "r2",
    project_id: "1",
    user_id: "u2",
    user_name: "Juan Dela Cruz",
    rating: 4,
    comment: "Very helpful initiative for rural communities.",
    created_at: "2025-10-12",
  },
  {
    id: "r3",
    project_id: "2",
    user_id: "u3",
    user_name: "Dr. Lisa Reyes",
    rating: 5,
    created_at: "2025-10-08",
  },
  {
    id: "r4",
    project_id: "3",
    user_id: "u4",
    user_name: "Alex Torres",
    rating: 4,
    comment: "Important work for mental health awareness.",
    created_at: "2025-10-15",
  },
];

export const dummyNotifications: Notification[] = [
  {
    id: "n1",
    user_id: "u1",
    type: "donation",
    title: "New Donation Received",
    message: "Your project 'Digital Library' received ₱5,000 from John Doe",
    timestamp: "2025-10-20T10:30:00",
    read: false,
    projectId: "1",
  },
  {
    id: "n2",
    user_id: "u1",
    type: "approval",
    title: "Project Approved",
    message: "Your project 'Digital Library' has been approved by admin",
    timestamp: "2025-10-19T14:20:00",
    read: true,
    projectId: "1",
  },
  {
    id: "n3",
    user_id: "u2",
    type: "comment",
    title: "New Comment",
    message: "Maria Santos commented on your project",
    timestamp: "2025-10-18T16:45:00",
    read: false,
    projectId: "2",
  },
  {
    id: "n4",
    user_id: "u4",
    type: "rejection",
    title: "Funding Receipt Rejected",
    message: "Your funding receipt needs additional documentation",
    timestamp: "2025-10-17T09:15:00",
    read: false,
  },
  {
    id: "n5",
    user_id: "u1",
    type: "update",
    title: "Project Milestone",
    message: "Your project reached 50% funding milestone!",
    timestamp: "2025-10-16T12:00:00",
    read: true,
    projectId: "1",
  },
];
