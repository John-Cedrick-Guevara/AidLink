# Payment Module - Architecture Documentation

## 🏗️ Architecture Overview

This payment module follows **Clean Architecture** principles with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   page.tsx   │→ │  Components  │→ │  UI Library  │  │
│  │ (Container)  │  │   (Dumb UI)  │  │  (shadcn/ui) │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                     Business Logic Layer                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Custom Hooks │→ │  Validation  │→ │  Constants   │  │
│  │  (Logic)     │  │   (Utils)    │  │    (Config)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                      Data Access Layer                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Services   │→ │  API Routes  │→ │   PayMongo   │  │
│  │ (API Calls)  │  │   (Backend)  │  │     API      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### 1. User Interaction Flow

```
User fills form
    ↓
Components emit events (onUpdate, onClick)
    ↓
Page container receives events
    ↓
Calls custom hooks (usePaymentProcessor)
    ↓
Hooks validate data (validation utils)
    ↓
Hooks call service layer (PaymentService)
    ↓
Service makes API request
    ↓
API route processes request
    ↓
PayMongo processes payment
    ↓
Response flows back up the chain
    ↓
UI updates based on status
```

### 2. State Management Flow

```
usePaymentForm Hook
    ↓
Manages: userInfo, cardDetails
    ↓
Auto-formats inputs (formatCardNumber, formatPhoneNumber)
    ↓
Passes to components via props
    ↓
Components render with current state
    ↓
User changes input
    ↓
updateUserInfo / updateCardDetails called
    ↓
State updates with formatting
    ↓
Component re-renders
```

## 🎯 Design Principles

### 1. Single Responsibility Principle (SRP)

Each module has one reason to change:

- **Components**: Only change if UI needs to change
- **Hooks**: Only change if business logic changes
- **Services**: Only change if API integration changes
- **Validation**: Only change if validation rules change

### 2. Open/Closed Principle (OCP)

Open for extension, closed for modification:

- Add new payment methods by extending `PaymentService`
- Add new validation rules without changing existing ones
- Add new components without modifying existing ones

### 3. Dependency Inversion Principle (DIP)

Depend on abstractions, not concretions:

- Components depend on props (interfaces), not implementation
- Hooks depend on service interfaces
- Services depend on API contracts

### 4. Don't Repeat Yourself (DRY)

- Validation logic centralized in `validation.ts`
- API calls centralized in `paymentService.ts`
- Formatting logic reused across components
- Type definitions shared via `types/index.ts`

### 5. Separation of Concerns (SoC)

Clear boundaries between:

- **UI Layer**: What users see (components)
- **Logic Layer**: How it works (hooks, validation)
- **Data Layer**: Where data comes from (services)

## 🔄 Component Communication

### Parent → Child (Props Down)

```tsx
<PaymentForm
  userInfo={userInfo} // Data
  onUpdateUserInfo={updateUserInfo} // Callbacks
  status={status} // State
  disabled={isProcessing} // Computed state
/>
```

### Child → Parent (Events Up)

```tsx
// In Component:
<Input onChange={(e) => onUpdate("name", e.target.value)} />;

// In Parent:
const updateUserInfo = (field, value) => {
  setUserInfo((prev) => ({ ...prev, [field]: value }));
};
```

## 🪝 Hook Composition

Hooks are composed to separate concerns:

```tsx
// page.tsx
const { project } = useProjectData(projectId);
const { status, processCardPayment } = usePaymentProcessor({
  clientKey,
  projectId,
});
const { userInfo, updateUserInfo } = usePaymentForm();

// Each hook manages its own domain:
// - useProjectData: Project fetching
// - usePaymentProcessor: Payment logic
// - usePaymentForm: Form state
```

## 🔐 Type Safety Strategy

### 1. Strict Type Definitions

```typescript
// types/index.ts
export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}
```

### 2. Type Inference

```typescript
// Let TypeScript infer return types
const updateUserInfo = (field: keyof UserInfo, value: string) => {
  // TypeScript knows field can only be "name" | "email" | "phone"
};
```

### 3. Generic Types

```typescript
private static async handleResponse<T>(response: Response): Promise<T> {
  // Type-safe response handling
}
```

## 🧪 Testing Strategy

### Unit Tests (Validation)

```typescript
describe("validateCardDetails", () => {
  it("should validate card number length", () => {
    const result = validateCardDetails({
      cardNumber: "1234",
      expMonth: "12",
      expYear: "25",
      cvc: "123",
    });
    expect(result).toBe("Invalid card number");
  });
});
```

### Integration Tests (Hooks)

```typescript
describe("usePaymentProcessor", () => {
  it("should process card payment successfully", async () => {
    const { result } = renderHook(() =>
      usePaymentProcessor({ clientKey: "test", projectId: "1" })
    );
    await act(() =>
      result.current.processCardPayment(mockUserInfo, mockCardDetails)
    );
    expect(result.current.status).toBe("success");
  });
});
```

### E2E Tests (Full Flow)

```typescript
describe("Payment Flow", () => {
  it("should complete payment from start to finish", async () => {
    // Render page
    // Fill form
    // Click pay
    // Assert success
  });
});
```

## 📦 Module Dependencies

```
page.tsx
  ↓
  ├── components/
  │     ├── ui/ (shadcn)
  │     └── (no external deps)
  │
  ├── hooks/
  │     ├── services/
  │     ├── utils/
  │     └── types/
  │
  ├── services/
  │     └── types/
  │
  └── utils/
        └── types/
```

**Dependency Rules**:

1. Components never import from services or utils directly
2. Hooks can import from services and utils
3. Services can import from utils
4. Types can be imported anywhere
5. Constants can be imported anywhere

## 🚀 Performance Optimizations

### 1. Memoization

```typescript
const updateUserInfo = useCallback((field, value) => {
  // Prevents unnecessary re-renders
}, []);
```

### 2. Lazy Loading

```typescript
// Components are already code-split by Next.js
// Services only loaded when needed
```

### 3. Conditional Rendering

```tsx
{
  selectedMethod === "card" && <CardDetailsForm />;
}
// Only renders card form when needed
```

### 4. Debouncing (Future)

```typescript
const debouncedValidation = useMemo(
  () => debounce(validateCardDetails, 300),
  []
);
```

## 🛡️ Error Handling Strategy

### 1. Validation Errors

```typescript
// Return error messages
const error = validateUserInfo(userInfo);
if (error) {
  toast.error(error);
  return;
}
```

### 2. API Errors

```typescript
// Centralized in service layer
try {
  const response = await fetch(...);
  if (!response.ok) throw new Error('API error');
} catch (error) {
  handlePaymentError(error);
}
```

### 3. UI Error States

```tsx
if (status === "error") {
  return <ErrorState errorMessage={errorMessage} />;
}
```

## 📝 Code Style Guidelines

### 1. File Naming

- Components: PascalCase (e.g., `UserInfoForm.tsx`)
- Hooks: camelCase with 'use' prefix (e.g., `usePaymentForm.ts`)
- Utils: camelCase (e.g., `validation.ts`)
- Types: PascalCase interfaces (e.g., `UserInfo`)

### 2. Function Naming

- Event handlers: `handle` prefix (e.g., `handleCardPayment`)
- Validation: `validate` prefix (e.g., `validateUserInfo`)
- Formatting: `format` prefix (e.g., `formatCardNumber`)
- Updates: `update` prefix (e.g., `updateUserInfo`)

### 3. Prop Naming

- Boolean props: `is` or `has` prefix (e.g., `isProcessing`)
- Callbacks: `on` prefix (e.g., `onUpdate`)
- Data: descriptive nouns (e.g., `userInfo`, `cardDetails`)

## 🎓 Learning Resources

This architecture is based on:

- **Clean Architecture** by Robert C. Martin
- **React Hooks Best Practices**
- **TypeScript Best Practices**
- **Next.js App Router Patterns**
- **SOLID Principles**

## 🔧 Extending the Module

### Adding a New Payment Method

1. **Add type definition**:

```typescript
// types/index.ts
export type PaymentMethod = "card" | "gcash" | "paymaya" | "grabpay";
```

2. **Add service method**:

```typescript
// services/paymentService.ts
static async createGrabPayMethod(userInfo: UserInfo) {
  // Implementation
}
```

3. **Add component button**:

```tsx
// components/PaymentMethodButtons.tsx
<Button onClick={onGrabPayClick}>Pay with GrabPay</Button>
```

4. **Add handler in hook**:

```typescript
// hooks/usePaymentProcessor.ts
const processGrabPayPayment = async (userInfo: UserInfo) => {
  // Implementation
};
```

5. **Wire up in page**:

```tsx
// page.tsx
const handleGrabPayPayment = () => {
  processEWalletPayment("grabpay", userInfo);
};
```

## ✅ Checklist Before Deployment

- [ ] All TypeScript errors resolved
- [ ] All validation tests passing
- [ ] Error boundaries implemented
- [ ] Loading states working
- [ ] Success states working
- [ ] Cancel flow working
- [ ] Test payments successful
- [ ] Production API keys configured
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Performance monitoring enabled

---

**Status**: ✅ Production-ready, modular architecture implemented
**Version**: 1.0.0
**Last Updated**: 2025-10-28
