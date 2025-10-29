# DonationDialog - Modularization Documentation

## Overview

The `DonationDialog` component has been refactored from a **558-line monolithic component** into a **clean, modular architecture** following best practices.

## 📁 New Structure

```
src/components/shared/donation-dialog/
├── index.ts                    # Clean exports
├── types.ts                    # TypeScript interfaces
├── constants.ts                # Reusable constants
├── services.ts                 # Payment processing logic
├── useDonationForm.ts          # Custom hook for form state
├── DonationDialog.tsx          # Main orchestrator (100 lines)
├── AmountInput.tsx             # Amount input with presets
├── EmailInput.tsx              # Email input with validation
├── BankAccountList.tsx         # Bank account display
├── PaymentMethodTabs.tsx       # Tab navigation
└── DialogActions.tsx           # Action buttons
```

## ✅ Improvements

### 1. **Eliminated Code Duplication**

**Before:** Duplicate validation functions in multiple places

- `validateEmail` duplicated in DonationDialog and payment module
- `validateAmount` duplicated in DonationDialog and payment module
- Email regex pattern defined 3+ times

**After:** Centralized validation utilities

- All validation moved to `@/lib/validations.ts`
- Single source of truth
- Reusable across entire application

```typescript
// Now shared across app
import { validateEmailWithError, validateAmount } from "@/lib/validations";
```

### 2. **Component Breakdown**

| Component                 | Lines | Responsibility                     |
| ------------------------- | ----- | ---------------------------------- |
| **DonationDialog.tsx**    | ~100  | Orchestrates sub-components        |
| **AmountInput.tsx**       | ~50   | Amount input + preset buttons      |
| **EmailInput.tsx**        | ~45   | Email input + security notice      |
| **BankAccountList.tsx**   | ~120  | Bank accounts + copy functionality |
| **PaymentMethodTabs.tsx** | ~55   | Tab switching logic                |
| **DialogActions.tsx**     | ~40   | Cancel + submit buttons            |

**Total:** 6 focused components instead of 1 giant component

### 3. **Custom Hook for Business Logic**

**`useDonationForm.ts`** extracts all form management:

- State management (amount, email, paymentMethod, isProcessing)
- Validation logic
- Form submission
- Reset functionality
- Preset amount handling

**Benefits:**

- Business logic separated from UI
- Testable in isolation
- Reusable for future forms

### 4. **Service Layer**

**`services.ts`** handles payment processing:

- `processDirectPayment()` - PayMongo integration
- `processBankTransfer()` - Bank transfer logic

**Benefits:**

- Easy to mock for testing
- Can be swapped for different payment providers
- Clear API contracts

### 5. **Type Safety**

**`types.ts`** centralizes all TypeScript definitions:

```typescript
export interface BankAccount { ... }
export type PaymentMethod = "direct" | "manual";
export interface DonationFormData { ... }
export interface DonationDialogProps { ... }
```

## 🔄 Migration Guide

### For Existing Code

**No changes required!** The old import path still works:

```typescript
// Still works (backward compatible)
import DonationDialog from "@/components/shared/DonationDialog";
```

### For New Code

**Use the modular exports:**

```typescript
// Import the main component
import { DonationDialog } from "@/components/shared/donation-dialog";

// Or import sub-components for custom layouts
import {
  AmountInput,
  EmailInput,
  useDonationForm,
} from "@/components/shared/donation-dialog";
```

## 📊 Before vs. After Comparison

### Before (558 lines)

```tsx
// DonationDialog.tsx - Monolithic
export default function DonationDialog() {
  // 7 useState hooks
  // 6 useCallback functions
  // 2 validation functions (DUPLICATED!)
  // 2 payment processing functions
  // 300+ lines of JSX
}
```

### After (100 lines main + 6 sub-components)

```tsx
// DonationDialog.tsx - Orchestrator
export const DonationDialog = () => {
  const formState = useDonationForm(); // Hook handles state
  return (
    <Dialog>
      <AmountInput {...} />
      <PaymentMethodTabs {...} />
      <DialogActions {...} />
    </Dialog>
  );
};
```

## 🧪 Testing Benefits

Each component can now be tested independently:

```typescript
// Example: Test amount validation in isolation
import { useDonationForm } from "./useDonationForm";

test("validates minimum donation amount", () => {
  const { handleSubmit } = renderHook(() => useDonationForm(...));
  // Test validation logic
});
```

## 🎯 Key Principles Applied

1. **Single Responsibility Principle**

   - Each component has ONE clear purpose
   - Easy to understand and maintain

2. **DRY (Don't Repeat Yourself)**

   - Shared validation utilities
   - No duplicate code

3. **Separation of Concerns**

   - UI components (presentational)
   - Business logic (custom hooks)
   - API calls (services)

4. **Composition over Inheritance**
   - Small, composable components
   - Flexible and reusable

## 📝 Shared Validation Utilities

Added to `@/lib/validations.ts`:

```typescript
// Email validation
export const validateEmail(email: string): boolean
export const validateEmailWithError(email: string): { valid, error? }

// Amount validation
export const validateAmount(amount: string | number, options?): { valid, error? }

// Phone validation
export const validatePhoneNumber(phone: string, required?): { valid, error? }

// Name validation
export const validateName(name: string): { valid, error? }
```

**Options for amount validation:**

```typescript
interface AmountValidationOptions {
  minAmount?: number;
  maxAmount?: number;
  customMinError?: string;
  customMaxError?: string;
}
```

## 🔍 Code Duplication Eliminated

### Email Validation

**Before:** 3 locations

1. `DonationDialog.tsx` (line 67)
2. `payment/utils/validation.ts` (line 14)
3. Regex defined separately in constants

**After:** 1 location

- `@/lib/validations.ts` - single source of truth

### Amount Validation

**Before:** 2 locations with different implementations

1. `DonationDialog.tsx` - simple validation
2. `payment/utils/validation.ts` - card-specific validation

**After:** 1 flexible function

- Configurable min/max amounts
- Custom error messages
- Works for donations, payments, etc.

## 🚀 Usage Examples

### Basic Usage

```tsx
<DonationDialog
  projectId="uuid"
  projectTitle="Save the Whales"
  sectorId="uuid"
  bankAccounts={accounts}
/>
```

### Custom Trigger Button

```tsx
<DonationDialog {...props}>
  <Button variant="outline">Custom Donate Button</Button>
</DonationDialog>
```

### Using Sub-Components

```tsx
function CustomDonationForm() {
  const form = useDonationForm({ projectId, sectorId });

  return (
    <Card>
      <AmountInput
        amount={form.amount}
        onAmountChange={form.setAmount}
        onPresetSelect={form.handlePresetAmount}
      />
      <EmailInput email={form.email} onEmailChange={form.setEmail} />
      <Button onClick={form.handleSubmit}>Donate</Button>
    </Card>
  );
}
```

## 📦 File Size Breakdown

| File                    | Lines   | Purpose                              |
| ----------------------- | ------- | ------------------------------------ |
| `index.ts`              | 20      | Clean exports                        |
| `types.ts`              | 25      | TypeScript definitions               |
| `constants.ts`          | 5       | Preset amounts, minimums             |
| `services.ts`           | 65      | Payment processing                   |
| `useDonationForm.ts`    | 115     | Form state management                |
| `DonationDialog.tsx`    | 100     | Main orchestrator                    |
| `AmountInput.tsx`       | 50      | Amount input UI                      |
| `EmailInput.tsx`        | 45      | Email input UI                       |
| `BankAccountList.tsx`   | 120     | Bank accounts UI                     |
| `PaymentMethodTabs.tsx` | 55      | Tab navigation                       |
| `DialogActions.tsx`     | 40      | Action buttons                       |
| **Total**               | **640** | **(+82 lines for better structure)** |

**Note:** While total lines increased slightly, code quality improved dramatically:

- No duplication
- Better testability
- Easier maintenance
- Reusable components

## 🎉 Summary

✅ **Eliminated code duplication** - Centralized validation utilities  
✅ **Modular architecture** - 6 focused components instead of 1 monolith  
✅ **Custom hooks** - Business logic extracted and testable  
✅ **Service layer** - Payment processing separated  
✅ **Type safety** - Centralized TypeScript definitions  
✅ **Backward compatible** - No breaking changes  
✅ **Better testability** - Each component testable in isolation  
✅ **Improved maintainability** - Clear separation of concerns

**From 558 lines of tangled code to a clean, professional architecture!** 🚀
