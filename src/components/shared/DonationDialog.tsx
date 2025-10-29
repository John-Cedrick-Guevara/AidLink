/**
 * DonationDialog - Legacy Import Adapter
 *
 * This file maintains backward compatibility by re-exporting
 * the modularized DonationDialog component.
 *
 * The new modular structure is located at:
 * @/components/shared/donation-dialog/
 *
 * Components:
 * - AmountInput: Handles donation amount input with presets
 * - EmailInput: Email input for direct payments
 * - BankAccountList: Displays bank accounts for manual transfers
 * - PaymentMethodTabs: Tabs for switching between payment methods
 * - DialogActions: Cancel and submit buttons
 *
 * Hooks:
 * - useDonationForm: Form state and validation logic
 *
 * Services:
 * - processDirectPayment: PayMongo integration
 * - processBankTransfer: Bank transfer handling
 *
 * Shared Utilities:
 * - Email validation moved to @/lib/validations
 * - Amount validation moved to @/lib/validations
 * - No more duplicated validation logic!
 */
