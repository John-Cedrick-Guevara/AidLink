// Test cards for PayMongo test mode
export const TEST_CARDS = {
  VISA_NO_3DS: "4343434343434345",
  VISA_WITH_3DS: "4571736000000075",
  MASTERCARD_NO_3DS: "5455590000000009",
  MASTERCARD_WITH_3DS: "5339080000000003",
} as const;

// Payment method types
export const PAYMENT_METHODS = {
  CARD: "card",
  GCASH: "gcash",
  PAYMAYA: "paymaya",
} as const;

// Payment status types
export const PAYMENT_STATUS = {
  LOADING: "loading",
  READY: "ready",
  PROCESSING: "processing",
  SUCCESS: "success",
  ERROR: "error",
} as const;

// API endpoints
export const API_ENDPOINTS = {
  CREATE_METHOD: "/api/payments/create-method",
  ATTACH: "/api/payments/attach",
  PROJECTS: "/api/projects",
} as const;

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHILIPPINE_PHONE: /^(09|\+639)\d{9}$/,
} as const;

// Form field limits
export const FIELD_LIMITS = {
  CARD_NUMBER_MIN: 15,
  CARD_NUMBER_MAX: 16,
  CVC_MIN: 3,
  CVC_MAX: 4,
  PHONE_MAX: 15,
  EXP_MONTH_MIN: 1,
  EXP_MONTH_MAX: 12,
} as const;
