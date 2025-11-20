<div align="center">
  <h1>🌟 AidLink</h1>
  <p><strong>Empowering Communities Through Transparent Charitable Giving</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-Realtime-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
  [![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Design System](#-design-system)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌍 Overview

**AidLink** is a modern, full-stack charitable donation platform that bridges the gap between project proposers and supporters. Built with transparency and user experience at its core, AidLink enables communities to fund meaningful projects while maintaining complete visibility into project progress and fund allocation.

### 🎯 Problem Statement

Traditional charity platforms often lack transparency, making it difficult for donors to:

- Track how their contributions are being used
- Engage with project creators
- Verify project legitimacy
- See real-time progress updates

### 💡 Solution

AidLink provides a comprehensive ecosystem featuring:

- **Real-time project tracking** with progress updates
- **Transparent fund management** with receipt verification
- **Community engagement** through comments and ratings
- **Admin oversight** with comprehensive management tools
- **Secure payment processing** with multiple payment methods

---

## ✨ Key Features

### 👥 For Donors

- 🎯 **Browse & Discover** - Explore projects by sector, progress, and impact
- 💳 **Multiple Payment Methods** - Credit card, bank transfer, and e-wallet support
- 📊 **Real-time Progress Tracking** - Monitor project milestones and fund allocation
- ⭐ **Rate & Review** - Provide feedback and ratings for completed projects
- 💬 **Community Engagement** - Comment and interact with project creators
- 🔔 **Smart Notifications** - Stay updated on project developments

### 🚀 For Project Proposers

- 📝 **Easy Project Submission** - Streamlined proposal process with rich text support
- 📈 **Progress Updates** - Share milestones and updates with supporters
- 💰 **Fund Management** - Track donations and manage bank account details
- 📊 **Analytics Dashboard** - Monitor project performance and donor engagement
- 📧 **Direct Communication** - Respond to comments and engage with supporters

### 🛡️ For Administrators

- 📋 **Project Approval Workflow** - Review and approve/reject project proposals
- 👤 **User Management** - Monitor users, restrict accounts, send notifications
- 💵 **Receipt Verification** - Validate donation receipts and fund transfers
- 📊 **Sector Management** - Organize projects by categories and sectors
- 📈 **Comprehensive Analytics** - Platform-wide statistics and insights
- 🔒 **Security Oversight** - Monitor platform health and user activities

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- **Animations**: [Motion](https://motion.dev/) - Production-ready animations
- **State Management**: [SWR](https://swr.vercel.app/) - Data fetching and caching
- **Form Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation

### Backend

- **Database**: [Supabase](https://supabase.com/) - PostgreSQL with real-time capabilities
- **Authentication**: Supabase Auth - Secure user authentication and authorization
- **Storage**: Supabase Storage - File and receipt management
- **Email Service**: [Brevo](https://www.brevo.com/) - Transactional email delivery

### Payment Processing

- **Provider**: [PayMongo](https://www.paymongo.com/) - Philippine payment gateway
- **Methods**: Credit/Debit cards, bank transfers, e-wallets
- **Webhooks**: Real-time payment status updates

### DevOps & Tools

- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Code Quality**: TypeScript strict mode
- **Version Control**: Git + GitHub

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Public     │  │    User      │  │    Admin     │     │
│  │   Routes     │  │  Dashboard   │  │  Dashboard   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Server Components │ Server Actions │ API Routes     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │ Supabase │  │ PayMongo │  │  Brevo   │  │  Storage │  │
│  │    DB    │  │ Payments │  │  Email   │  │  Files   │  │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Patterns

- **Server-Side Rendering (SSR)**: Improved SEO and initial page load
- **Server Actions**: Type-safe mutations without API routes
- **Component Composition**: Reusable UI components with Radix UI
- **Atomic Design**: Organized component hierarchy (atoms, molecules, organisms)
- **Custom Hooks**: Encapsulated business logic and state management
- **Type Safety**: End-to-end TypeScript coverage
- **Real-time Updates**: Supabase subscriptions for live data

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Supabase Account**: [Sign up](https://supabase.com/)
- **PayMongo Account**: [Sign up](https://www.paymongo.com/) (for payments)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/John-Cedrick-Guevara/AidLink.git
   cd AidLink
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   cp .env.example .env.local
   ```

   Update the following variables:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # PayMongo Configuration
   PAYMONGO_PUBLIC_KEY=your_paymongo_public_key
   PAYMONGO_SECRET_KEY=your_paymongo_secret_key

   # Application Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000

   # Email Service (Brevo)
   BREVO_API_KEY=your_brevo_api_key
   ```

4. **Set up Supabase database**

   Run the SQL migrations in your Supabase dashboard:

   ```bash
   # Navigate to SQL Editor in Supabase Dashboard
   # Execute the migration files in order
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
charity-web-app/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Public routes
│   │   │   ├── (auth)/              # Authentication pages
│   │   │   │   ├── sign-in/
│   │   │   │   └── sign-up/
│   │   │   ├── (landing page)/      # Landing page
│   │   │   └── projects/            # Public project pages
│   │   │       ├── [id]/           # Project detail page
│   │   │       ├── components/     # Project components
│   │   │       ├── hooks/          # Custom hooks
│   │   │       └── server/         # Server actions
│   │   │
│   │   ├── (private)/               # Protected routes
│   │   │   └── dashboard/
│   │   │       ├── (admin)/        # Admin dashboard
│   │   │       │   ├── components/
│   │   │       │   ├── hooks/
│   │   │       │   └── server/
│   │   │       └── (user)/         # User dashboard
│   │   │           ├── components/
│   │   │           ├── hooks/
│   │   │           └── server/
│   │   │
│   │   ├── api/                     # API routes
│   │   │   ├── notifications/
│   │   │   ├── payments/
│   │   │   └── projects/
│   │   │
│   │   ├── globals.css             # Global styles
│   │   └── layout.tsx              # Root layout
│   │
│   ├── components/                  # Shared components
│   │   ├── layout/                 # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── providers/              # Context providers
│   │   │   ├── UserProvider.tsx
│   │   │   └── SWRProvider.tsx
│   │   ├── shared/                 # Shared components
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── UpdateDialog.tsx
│   │   │   └── donation-dialog/
│   │   └── ui/                     # UI primitives
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       └── ...
│   │
│   ├── lib/                         # Utility libraries
│   │   ├── supabase/               # Supabase clients
│   │   │   ├── supabaseClient.ts
│   │   │   ├── supabaseServer.ts
│   │   │   └── middleware.ts
│   │   ├── badge-utils.ts          # Badge utilities
│   │   ├── utils.ts                # General utilities
│   │   └── validations.ts          # Zod schemas
│   │
│   ├── types/                       # TypeScript definitions
│   │   └── index.ts
│   │
│   └── middleware.ts                # Next.js middleware
│
├── public/                          # Static assets
├── supabase/                        # Supabase configuration
├── .env.local                       # Environment variables
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts              # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Sign Up

```typescript
POST /sign-up
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe"
}

Response: 201 Created
{
  "success": true,
  "user": { ... }
}
```

#### Sign In

```typescript
POST /sign-in
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

Response: 200 OK
{
  "success": true,
  "session": { ... }
}
```

### Projects API

#### Get All Projects

```typescript
GET /api/projects
Query Parameters:
  - sector?: string
  - status?: 'pending' | 'approved' | 'rejected'
  - limit?: number

Response: 200 OK
{
  "projects": [...],
  "total": 42
}
```

#### Get Project Details

```typescript
GET /api/projects/[id]

Response: 200 OK
{
  "project": {
    "id": "uuid",
    "title": "Project Title",
    "description": "...",
    "target_funds": 100000,
    "funds": [...],
    "comments": [...],
    "ratings": [...],
    "updates": [...]
  }
}
```

### Payments API

#### Create Payment Intent

```typescript
POST /api/payments/create
Content-Type: application/json

{
  "amount": 1000,
  "projectId": "uuid",
  "method": "card"
}

Response: 200 OK
{
  "clientKey": "...",
  "paymentIntentId": "..."
}
```

#### Payment Webhook

```typescript
POST /api/payments/webhooks
Content-Type: application/json

{
  "data": {
    "attributes": { ... }
  }
}

Response: 200 OK
```

### Notifications API

#### Get User Notifications

```typescript
GET /api/notifications/[userId]

Response: 200 OK
{
  "notifications": [
    {
      "id": "uuid",
      "type": "donation" | "approval" | "update",
      "title": "...",
      "message": "...",
      "read": false,
      "created_at": "..."
    }
  ]
}
```

---

## 🎨 Design System

### Badge System

AidLink implements a universal badge system for consistent status displays across the platform:

```typescript
import { StatusBadge } from '@/components/shared/StatusBadge';

// Project status
<StatusBadge type="project" status="approved" />

// User status
<StatusBadge type="user" status="normal" />

// Payment status
<StatusBadge type="payment" status="paid" />

// Receipt status
<StatusBadge type="receipt" status="pending" />
```

**Available Variants:**

- `success` - Green (approved, paid, normal)
- `warning` - Yellow/Orange (pending)
- `destructive` - Red (rejected, failed, restricted)
- `info` - Blue (completed, refunded)

For detailed documentation, see [BADGE_SYSTEM.md](BADGE_SYSTEM.md)

### Color Palette

```css
/* Primary Colors */
--primary: 217 91% 60%; /* Ocean Blue */
--accent: 45 93% 58%; /* Vibrant Yellow */

/* Status Colors */
--success: Green shades; /* Approvals, Success */
--warning: Yellow shades; /* Pending states */
--destructive: Red shades; /* Errors, Rejections */

/* Neutral Colors */
--background: 210 40% 98%; /* Light Background */
--foreground: 215 25% 15%; /* Dark Text */
--muted: 210 50% 96%; /* Subtle Elements */
```

### Typography

- **Font Family**: Geist Sans (Primary), Geist Mono (Code)
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Scale**: Fluid typography using `clamp()` for responsive sizing

---

## 🔒 Security

### Authentication & Authorization

- **Row Level Security (RLS)**: Supabase policies enforce data access rules
- **JWT Tokens**: Secure session management with automatic refresh
- **Role-Based Access Control**: Admin, User, and Guest permissions
- **Protected Routes**: Middleware-based route protection

### Data Protection

- **Environment Variables**: Sensitive keys stored securely
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **XSS Protection**: React's built-in escaping + sanitization
- **CSRF Protection**: Next.js CSRF tokens for mutations

### Payment Security

- **PCI Compliance**: PayMongo handles card data securely
- **Webhook Verification**: Signature validation for payment events
- **Receipt Verification**: Admin approval required for manual transfers
- **Audit Logs**: All transactions logged with timestamps

### Best Practices Implemented

✅ HTTPS enforcement in production  
✅ Content Security Policy (CSP) headers  
✅ Input validation with Zod schemas  
✅ Rate limiting on sensitive endpoints  
✅ Secure password hashing (Supabase bcrypt)  
✅ SQL injection prevention  
✅ XSS protection  
✅ CSRF token validation

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Workflow

1. **Fork the repository**

   ```bash
   git clone https://github.com/your-username/AidLink.git
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**

   - Follow the existing code style
   - Add TypeScript types for new code
   - Write clear commit messages
   - Update documentation as needed

4. **Test your changes**

   ```bash
   npm run dev
   # Manual testing
   ```

5. **Commit your changes**

   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**

   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Wait for code review

### Code Style Guidelines

- Use **TypeScript** for all new code
- Follow **ESLint** rules (run `npm run lint`)
- Use **functional components** with hooks
- Write **descriptive variable names**
- Add **JSDoc comments** for complex functions
- Keep components **small and focused**
- Use **server components** when possible

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 John Cedrick Guevara

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 👨‍💻 Author

**John Cedrick Guevara**

- GitHub: [@John-Cedrick-Guevara](https://github.com/John-Cedrick-Guevara)
- Email: guevarajohncedrick0610@gmail.com
- Repository: [AidLink](https://github.com/John-Cedrick-Guevara/AidLink)

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Supabase** - For the backend infrastructure
- **Radix UI** - For accessible component primitives
- **Tailwind CSS** - For the utility-first CSS framework
- **Open Source Community** - For the incredible tools and libraries

---

## 📊 Project Status

🚀 **Status**: Active Development  
📅 **Last Updated**: November 2025  
🔄 **Version**: 0.1.0

### Roadmap

- [x] Core platform features
- [x] Payment integration
- [x] Admin dashboard
- [x] Notification system
- [x] Project updates feature
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] AI-powered project recommendations
- [ ] Multi-language support
- [ ] Social media integration

---

<div align="center">
  <p>Made with ❤️ for a better world</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# AidLink

#
