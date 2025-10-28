# PayMongo Payment Flow Guide

## Overview

This guide explains how the payment system works, where money goes, and what users need to input.

---

## Payment Flow

### 1. User Experience

#### **Card Payment:**

```
1. User fills in: Name, Email, Phone (optional)
2. User selects "Pay with Card"
3. Card input form appears
4. User enters: Card Number, Expiry (MM/YY), CVC
5. Click "Confirm Card Payment"
6. May redirect to 3D Secure authentication
7. Payment processed → Success page
```

#### **GCash Payment:**

```
1. User fills in: Name, Email, Phone (REQUIRED)
2. User clicks "Pay with GCash"
3. Redirected to GCash app/website
4. User logs into their GCash account
5. User authorizes the payment
6. Redirected back to success page
```

#### **PayMaya Payment:**

```
1. User fills in: Name, Email, Phone (REQUIRED)
2. User clicks "Pay with PayMaya"
3. Redirected to PayMaya app/website
4. User logs into their PayMaya account
5. User authorizes the payment
6. Redirected back to success page
```

---

## Where Does the Money Go?

### Important: Receiving Account Configuration

**The money is sent to YOUR organization's bank account configured in PayMongo Dashboard.**

### How to Configure Receiving Account:

1. **Login to PayMongo Dashboard**

   - Go to: https://dashboard.paymongo.com
   - Use your PayMongo account credentials

2. **Navigate to Bank Accounts**

   - Click on **Settings** in the sidebar
   - Select **Bank Accounts**

3. **Add Your Bank Account**

   - Click "Add Bank Account"
   - Fill in:
     - Bank Name (e.g., BDO, BPI, Metrobank)
     - Account Number
     - Account Name (must match registered business name)

4. **Verify Your Account**
   - PayMongo will make a small deposit
   - Verify the amount to confirm ownership
   - Once verified, this account will receive all payments

### Settlement Schedule:

- **Test Mode**: No actual money transfer
- **Live Mode**:
  - Card payments: 2-7 business days
  - E-wallet payments (GCash/PayMaya): 2-7 business days
  - PayMongo charges a small transaction fee

---

## User Input Requirements

### What Users MUST Input:

#### **For ALL Payment Methods:**

- ✅ Full Name
- ✅ Email Address

#### **For Card Payments:**

- ✅ Card Number (15-16 digits)
- ✅ Expiry Month (MM)
- ✅ Expiry Year (YY)
- ✅ CVC/CVV (3-4 digits)
- ⚠️ Phone Number (optional)

#### **For GCash/PayMaya:**

- ✅ Phone Number (REQUIRED)
- ✅ Their GCash/PayMaya account credentials (on redirect)

---

## Project Bank Details Display

In the payment page (`/payment`), the system displays the project's bank account information:

```tsx
{
  project?.bank_details && project.bank_details.length > 0 && (
    <div className="mb-6 p-4 bg-muted/50 rounded-lg">
      <p className="text-xs font-semibold mb-2">Payment will be sent to:</p>
      <p className="text-sm font-medium">
        {project.bank_details[0].account_name}
      </p>
      <p className="text-xs text-muted-foreground">
        {project.bank_details[0].bank_name}
      </p>
      <p className="text-xs text-muted-foreground">
        Account: {project.bank_details[0].account_number}
      </p>
    </div>
  );
}
```

**Note:** This is for **display purposes only** to show donors where their money is going. The actual receiving account must be configured in **PayMongo Dashboard**.

---

## Important Clarifications

### ❓ "Do users need to input their card/account numbers?"

**YES** - Users input their OWN payment details:

- **Card**: Their card number, expiry, CVC
- **GCash**: They login to their own GCash account
- **PayMaya**: They login to their own PayMaya account

### ❓ "Where do I define the receiving point?"

**In PayMongo Dashboard** - Not in code:

1. Go to https://dashboard.paymongo.com
2. Add your organization's bank account
3. All payments automatically go to that account

### ❓ "What is `billing` information for?"

**Transaction records only** - Used for:

- Receipts and invoices
- PayMongo's fraud detection
- Transaction history
- NOT where money is sent

### ❓ "Can I have different receiving accounts per project?"

**No** - PayMongo account = One bank account for all payments. If you need this:

- Create separate PayMongo accounts per project
- Use different API keys for each project

---

## Test Cards (Development Only)

When in **test mode**, use these test cards:

| Card Number      | Brand      | 3D Secure |
| ---------------- | ---------- | --------- |
| 4343434343434345 | Visa       | No        |
| 4571736000000075 | Visa       | Yes       |
| 5455590000000009 | Mastercard | No        |
| 5339080000000003 | Mastercard | Yes       |

**Test Card Details:**

- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)

---

## Going Live (Production)

### Before Going Live:

1. **Switch to Live Keys**

   - Update `.env.local`:
     ```env
     NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY=pk_live_xxxxx
     PAYMONGO_SECRET_KEY=sk_live_xxxxx
     ```

2. **Verify Bank Account**

   - Ensure bank account is verified in dashboard
   - Test a small payment to confirm settlement

3. **Set Up Webhooks** (Optional but recommended)

   - Create webhook endpoint: `/api/payments/webhooks`
   - Configure in PayMongo Dashboard
   - Listen for `payment.paid` events

4. **Enable Payment Methods**
   - Enable GCash/PayMaya in dashboard
   - May require business verification

---

## Troubleshooting

### Common Issues:

**"Payment failed" error:**

- Check if user filled all required fields
- Verify API keys are correct
- Check PayMongo dashboard for payment status

**"No redirect URL received" (GCash/PayMaya):**

- User must fill in phone number
- Check if payment methods are enabled in dashboard

**Money not received:**

- Check PayMongo dashboard for settlement status
- Verify bank account is verified
- Wait for settlement period (2-7 days)

---

## Related Files

- `/src/app/(public)/payment/page.tsx` - Payment form UI
- `/src/app/api/payments/create/route.ts` - Create payment intent
- `/src/app/api/payments/create-method/route.ts` - Create payment method
- `/src/app/api/payments/attach/route.ts` - Attach method to intent
- `/src/types/index.ts` - Project and BankAccount types
- `PAYMONGO_INTEGRATION.md` - Technical integration guide
