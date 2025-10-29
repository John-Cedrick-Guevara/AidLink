# Payment Module

A modular, clean architecture implementation for PayMongo payment integration in Next.js 14.

## 📁 Structure

```
payment/
├── components/           # UI Components
│   ├── UserInfoForm.tsx       # User information input form
│   ├── CardDetailsForm.tsx    # Card details input form
│   ├── ProjectBankInfo.tsx    # Display project bank account
│   ├── PaymentMethodButtons.tsx # Payment method selection buttons
│   ├── PaymentForm.tsx        # Main payment form container
│   ├── PaymentStates.tsx      # Loading, Error, Success states
│   └── index.ts               # Component exports
│
├── hooks/                # Custom React Hooks
│   ├── usePaymentProcessor.ts # Payment processing logic
│   ├── usePaymentForm.ts      # Form state management
│   ├── useProjectData.ts      # Project data fetching
│   └── index.ts               # Hook exports
│
├── services/             # API Service Layer
│   └── paymentService.ts      # PayMongo API calls
│
├── types/                # TypeScript Type Definitions
│   └── index.ts               # All payment-related types
│
├── utils/                # Utility Functions
│   └── validation.ts          # Form validation & formatting
│
├── constants/            # Constants & Configuration
│   └── index.ts               # Test cards, endpoints, patterns
│
└── page.tsx              # Main payment page (clean & simple)
```

## 🎯 Key Features

### Clean Architecture

- **Separation of Concerns**: UI, business logic, and data fetching are separated
- **Single Responsibility**: Each component/hook does one thing well
- **Dependency Injection**: Components receive data via props, no tight coupling

### Type Safety

- Full TypeScript support
- Strict type definitions for all interfaces
- Type-safe API responses

### Validation

- Luhn algorithm for card number validation
- Email format validation
- Philippine phone number validation
- Real-time input formatting

### Reusability

- All components are reusable
- Hooks can be used in other pages
- Service layer can be shared across the app

## 🧩 Component Breakdown

### UserInfoForm

**Purpose**: Collect user's name, email, and phone number  
**Props**:

- `userInfo`: Current user information
- `onUpdate`: Callback to update fields
- `disabled`: Disable inputs during processing
- `selectedMethod`: Current payment method (to show phone requirement)

### CardDetailsForm

**Purpose**: Collect card payment details  
**Features**:

- Auto-formats card number with spaces
- Only allows numeric input for security fields
- Shows test card hint

### ProjectBankInfo

**Purpose**: Display where donation is going  
**Features**:

- Shows account name, bank name, account number
- Only renders if bank details exist

### PaymentMethodButtons

**Purpose**: Payment method selection  
**Features**:

- Visual feedback for selected method
- Loading states for each method
- Disabled states during processing

### PaymentForm

**Purpose**: Main container that composes all sub-components  
**Props**: All necessary data and callbacks

### PaymentStates

**Purpose**: Loading, Error, and Success screens  
**Components**:

- `LoadingState`: Shows spinner with message
- `ErrorState`: Shows error with return button
- `SuccessState`: Shows success message and redirect info

## 🪝 Custom Hooks

### usePaymentProcessor

**Purpose**: Handle all payment processing logic  
**Returns**:

- `status`: Current payment status
- `selectedMethod`: Selected payment method
- `processCardPayment()`: Process card payment
- `processEWalletPayment()`: Process GCash/PayMaya payment
- Error handling and success callbacks

### usePaymentForm

**Purpose**: Manage form state with auto-formatting  
**Returns**:

- `userInfo`: User information state
- `cardDetails`: Card details state
- `updateUserInfo()`: Update user info with formatting
- `updateCardDetails()`: Update card details with formatting
- `resetForm()`: Clear all fields

### useProjectData

**Purpose**: Fetch and manage project data  
**Returns**:

- `project`: Project data with bank details
- `loading`: Loading state
- `error`: Error message if fetch fails

## 🔧 Services

### PaymentService

**Purpose**: Centralize all PayMongo API calls  
**Methods**:

- `createCardPaymentMethod()`: Create card payment
- `createEWalletPaymentMethod()`: Create GCash/PayMaya payment
- `attachPaymentMethod()`: Attach payment to intent
- `handleResponse()`: Generic error handling

## ✅ Validation Utils

### validateUserInfo()

- Checks name, email, phone presence
- Validates email format
- Validates Philippine phone format (optional)

### validateCardDetails()

- Validates card number with Luhn algorithm
- Checks expiry date validity
- Validates CVC length
- Checks if card is expired

### Formatting Functions

- `formatCardNumber()`: Adds spaces every 4 digits
- `formatPhoneNumber()`: Formats as "0912 345 6789"

## 📝 Usage Example

```tsx
// The main page.tsx is now clean and simple:
export default function PaymentPage() {
  const { clientKey, amount, projectId } = useSearchParams();

  const { project } = useProjectData(projectId);
  const { status, processCardPayment, processEWalletPayment } =
    usePaymentProcessor({ clientKey, projectId });
  const { userInfo, cardDetails, updateUserInfo, updateCardDetails } =
    usePaymentForm();

  // Simple event handlers
  const handleCardPayment = () => processCardPayment(userInfo, cardDetails);
  const handleGCashPayment = () => processEWalletPayment("gcash", userInfo);

  // Render based on status
  if (status === "loading") return <LoadingState />;
  if (status === "error") return <ErrorState />;
  if (status === "success") return <SuccessState />;

  return (
    <PaymentForm
      project={project}
      userInfo={userInfo}
      onSelectCard={handleCardPayment}
      onSelectGCash={handleGCashPayment}
      // ... other props
    />
  );
}
```

## 🎨 Best Practices Applied

1. **Component Composition**: Small, focused components
2. **Custom Hooks**: Reusable business logic
3. **Service Layer**: Centralized API calls
4. **Type Safety**: Full TypeScript coverage
5. **Error Handling**: Consistent error management
6. **Loading States**: Clear feedback to users
7. **Validation**: Client-side validation before API calls
8. **Auto-formatting**: Improved UX with input formatting
9. **Accessibility**: Proper labels and autocomplete
10. **Constants**: No magic strings or numbers

## 🧪 Testing Checklist

- [ ] Card payment with valid details
- [ ] Card payment with invalid card number
- [ ] Card payment with expired card
- [ ] GCash payment without phone number (should error)
- [ ] GCash payment with phone number (should redirect)
- [ ] PayMaya payment flow
- [ ] Cancel button returns to project
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Success state and redirect

## 🚀 Future Enhancements

- [ ] Add unit tests for validation functions
- [ ] Add integration tests for payment flow
- [ ] Implement card type detection (Visa, Mastercard)
- [ ] Add installment options
- [ ] Support for more payment methods
- [ ] Save payment methods for logged-in users
- [ ] Payment history tracking
- [ ] Receipt generation

## 📚 Related Documentation

- `PAYMENT_FLOW_GUIDE.md` - User guide for payment flow
- `PAYMENT_IMPLEMENTATION_SUMMARY.md` - Implementation details
- `PAYMONGO_INTEGRATION.md` - PayMongo API integration guide
