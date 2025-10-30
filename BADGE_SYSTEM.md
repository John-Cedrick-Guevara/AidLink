# Badge System Documentation

## Overview

A universal, reusable badge system that provides consistent styling across the entire application. The system follows best practices for component design, type safety, and maintainability.

## Architecture

### 1. **Base Badge Component** (`/components/ui/badge.tsx`)

The foundational badge component built with `class-variance-authority` (CVA) for flexible variant management.

**Available Variants:**

- `default` - Primary brand color
- `secondary` - Subtle secondary style
- `destructive` - Red, for errors/rejections
- `outline` - Outlined style
- `success` - Green, for approved/successful states
- `warning` - Yellow/orange, for pending states
- `info` - Blue, for informational states

### 2. **Badge Utilities** (`/lib/badge-utils.ts`)

Helper functions that map status values to appropriate badge variants.

**Type Definitions:**

```typescript
type ProjectStatus = "pending" | "approved" | "rejected" | "completed";
type ReceiptStatus = "pending" | "approved" | "rejected";
type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
type UserStatus = "normal" | "restricted";
```

**Available Functions:**

- `getProjectStatusBadgeVariant(status)` - Returns variant for project statuses
- `getReceiptStatusBadgeVariant(status)` - Returns variant for receipt statuses
- `getPaymentStatusBadgeVariant(status)` - Returns variant for payment statuses
- `getUserStatusBadgeVariant(status)` - Returns variant for user statuses
- `capitalizeStatus(status)` - Capitalizes the first letter of a status string

### 3. **StatusBadge Component** (`/components/shared/StatusBadge.tsx`)

A high-level component that combines the badge with automatic variant selection based on status type.

## Usage Examples

### Using the Base Badge Component

```tsx
import { Badge } from "@/components/ui/badge";

// Simple badge
<Badge>Default</Badge>

// With variants
<Badge variant="success">Approved</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
<Badge variant="outline">Sector Tag</Badge>

// With custom classes
<Badge variant="secondary" className="text-xs font-normal">
  Custom Tag
</Badge>
```

### Using Badge Utilities (Manual Approach)

```tsx
import { Badge } from "@/components/ui/badge";
import {
  getProjectStatusBadgeVariant,
  capitalizeStatus,
} from "@/lib/badge-utils";

function ProjectStatusCell({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant={getProjectStatusBadgeVariant(status)}>
      {capitalizeStatus(status)}
    </Badge>
  );
}
```

### Using StatusBadge Component (Recommended)

```tsx
import { StatusBadge } from "@/components/shared/StatusBadge";

// For project statuses
<StatusBadge type="project" status={project.status} />

// For receipt statuses
<StatusBadge type="receipt" status={receipt.status} />

// For payment statuses
<StatusBadge type="payment" status={payment.status} />

// For user statuses
<StatusBadge type="user" status={user.status} />

// With custom className
<StatusBadge
  type="project"
  status="pending"
  className="ml-2"
/>
```

## Status-to-Variant Mapping

### Project Statuses

| Status    | Variant     | Color         |
| --------- | ----------- | ------------- |
| pending   | warning     | Yellow/Orange |
| approved  | success     | Green         |
| rejected  | destructive | Red           |
| completed | info        | Blue          |

### Receipt/Funding Statuses

| Status   | Variant     | Color         |
| -------- | ----------- | ------------- |
| pending  | warning     | Yellow/Orange |
| approved | success     | Green         |
| rejected | destructive | Red           |

### Payment Statuses

| Status   | Variant     | Color         |
| -------- | ----------- | ------------- |
| pending  | warning     | Yellow/Orange |
| paid     | success     | Green         |
| failed   | destructive | Red           |
| refunded | info        | Blue          |

### User Statuses

| Status     | Variant     | Color |
| ---------- | ----------- | ----- |
| normal     | success     | Green |
| restricted | destructive | Red   |

## Adding New Status Types

### 1. Define the Status Type

```typescript
// In /lib/badge-utils.ts
export type NewStatusType = "status1" | "status2" | "status3";
```

### 2. Create a Badge Variant Function

```typescript
export function getNewStatusBadgeVariant(
  status: NewStatusType
): VariantProps<typeof badgeVariants>["variant"] {
  const statusMap: Record<
    NewStatusType,
    VariantProps<typeof badgeVariants>["variant"]
  > = {
    status1: "success",
    status2: "warning",
    status3: "destructive",
  };
  return statusMap[status] || "default";
}
```

### 3. Update StatusBadge Component

```typescript
// In /components/shared/StatusBadge.tsx
type StatusBadgeProps =
  | { type: "project"; status: ProjectStatus; className?: string }
  | { type: "receipt"; status: ReceiptStatus; className?: string }
  | { type: "payment"; status: PaymentStatus; className?: string }
  | { type: "newType"; status: NewStatusType; className?: string }; // Add this

// Update the getVariant function
const getVariant = () => {
  switch (type) {
    case "project":
      return getProjectStatusBadgeVariant(status as ProjectStatus);
    case "receipt":
      return getReceiptStatusBadgeVariant(status as ReceiptStatus);
    case "payment":
      return getPaymentStatusBadgeVariant(status as PaymentStatus);
    case "newType":
      return getNewStatusBadgeVariant(status as NewStatusType);
    default:
      return "default";
  }
};
```

## Best Practices

### ✅ DO:

- Use `StatusBadge` component for status displays (simplest and most consistent)
- Use utility functions when you need custom logic
- Use base `Badge` component for non-status badges (tags, labels, etc.)
- Keep status types centralized in `badge-utils.ts`
- Use TypeScript types for type safety

### ❌ DON'T:

- Hardcode className conditions like `className={status === "pending" ? "..." : "..."}`
- Duplicate badge styling logic across components
- Create inline badge components with custom colors
- Mix different badge styling approaches in the same component

## Migration Guide

**Before (Old Approach):**

```tsx
<Badge
  className={
    project.status === "pending"
      ? "bg-warning/10 text-warning"
      : project.status === "approved"
      ? "bg-success/10 text-success"
      : project.status === "rejected"
      ? "bg-destructive/10 text-destructive"
      : "bg-primary/10 text-primary"
  }
>
  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
</Badge>
```

**After (New Approach):**

```tsx
<StatusBadge type="project" status={project.status} />
```

## Benefits

1. **Consistency** - All badges follow the same design system
2. **Type Safety** - TypeScript prevents invalid status values
3. **Maintainability** - Changes in one place affect all badges
4. **Readability** - Clean, self-documenting code
5. **Scalability** - Easy to add new status types
6. **Performance** - No runtime class concatenation
7. **Accessibility** - Consistent contrast ratios and colors

## Color Reference

Colors are defined in `/app/globals.css` and use CSS variables:

- `--success` - Green for approved/successful states
- `--warning` - Yellow/Orange for pending states
- `--destructive` - Red for rejected/failed states
- `--primary` - Brand blue for informational states
- `--secondary` - Subtle gray for tags/labels
