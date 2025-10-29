export type PaymentMethod = "card" | "gcash" | "paymaya";

export type PaymentStatus =
  | "loading"
  | "ready"
  | "processing"
  | "success"
  | "error";

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
}

export interface CardDetails {
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
}

export interface PaymentFormData {
  userInfo: UserInfo;
  cardDetails: CardDetails;
}

export interface PaymentParams {
  clientKey: string | null;
  amount: string | null;
  projectId: string | null;
}

export interface PaymentMethodResponse {
  success: boolean;
  paymentMethodId: string;
}

export interface AttachPaymentResponse {
  success: boolean;
  status: string;
  next_action?: {
    redirect?: {
      url: string;
    };
  };
}
