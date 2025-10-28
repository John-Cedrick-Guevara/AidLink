import { UserInfo, CardDetails } from "../types";

export const validateUserInfo = (
  userInfo: UserInfo,
  requirePhone = false
): string | null => {
  if (!userInfo.name.trim()) {
    return "Please enter your full name";
  }

  if (!userInfo.email.trim()) {
    return "Please enter your email address";
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userInfo.email)) {
    return "Please enter a valid email address";
  }

  if (requirePhone && !userInfo.phone.trim()) {
    return "Phone number is required for this payment method";
  }

  // Basic phone validation for Philippine numbers
  if (requirePhone && userInfo.phone.trim()) {
    const phoneRegex = /^(09|\+639)\d{9}$/;
    if (!phoneRegex.test(userInfo.phone.replace(/\s/g, ""))) {
      return "Please enter a valid Philippine phone number (09XXXXXXXXX)";
    }
  }

  return null;
};

export const validateCardDetails = (
  cardDetails: CardDetails
): string | null => {
  const cleanCardNumber = cardDetails.cardNumber.replace(/\s/g, "");

  if (!cleanCardNumber) {
    return "Please enter your card number";
  }

  if (cleanCardNumber.length < 15 || cleanCardNumber.length > 16) {
    return "Please enter a valid card number (15-16 digits)";
  }

  // Luhn algorithm for card validation
  if (!isValidCardNumber(cleanCardNumber)) {
    return "Invalid card number";
  }

  if (!cardDetails.expMonth) {
    return "Please enter card expiry month";
  }

  const month = parseInt(cardDetails.expMonth);
  if (month < 1 || month > 12) {
    return "Invalid expiry month (must be 01-12)";
  }

  if (!cardDetails.expYear) {
    return "Please enter card expiry year";
  }

  const year = parseInt(cardDetails.expYear);
  const currentYear = new Date().getFullYear() % 100;
  if (year < currentYear) {
    return "Card has expired";
  }

  if (!cardDetails.cvc) {
    return "Please enter card CVC";
  }

  if (cardDetails.cvc.length < 3 || cardDetails.cvc.length > 4) {
    return "Invalid CVC (must be 3-4 digits)";
  }

  return null;
};

// Luhn algorithm implementation
const isValidCardNumber = (cardNumber: string): boolean => {
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const formatCardNumber = (value: string): string => {
  const cleaned = value.replace(/\s/g, "");
  const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
  return formatted;
};

export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, "");

  // Format as: 0912 345 6789
  if (cleaned.length <= 4) {
    return cleaned;
  } else if (cleaned.length <= 7) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  } else {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(
      7,
      11
    )}`;
  }
};
