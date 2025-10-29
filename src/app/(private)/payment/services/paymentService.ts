import {
  UserInfo,
  CardDetails,
  PaymentMethod,
  PaymentMethodResponse,
  AttachPaymentResponse,
} from "../types";

export class PaymentService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  }

  static async createCardPaymentMethod(
    cardDetails: CardDetails,
    userInfo: UserInfo
  ): Promise<PaymentMethodResponse> {
    const cleanCardNumber = cardDetails.cardNumber.replace(/\s/g, "");

    const response = await fetch("/api/payments/create-method", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "card",
        details: {
          card_number: cleanCardNumber,
          exp_month: parseInt(cardDetails.expMonth),
          exp_year: parseInt(cardDetails.expYear),
          cvc: cardDetails.cvc,
        },
        billing: {
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone || undefined,
        },
      }),
    });

    return this.handleResponse<PaymentMethodResponse>(response);
  }

  static async createEWalletPaymentMethod(
    type: "gcash" | "paymaya",
    userInfo: UserInfo
  ): Promise<PaymentMethodResponse> {
    const response = await fetch("/api/payments/create-method", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        billing: {
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
        },
      }),
    });

    return this.handleResponse<PaymentMethodResponse>(response);
  }

  static async attachPaymentMethod(
    clientKey: string,
    paymentMethodId: string,
    returnUrl: string
  ): Promise<AttachPaymentResponse> {
    const response = await fetch("/api/payments/attach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientKey,
        paymentMethodId,
        returnUrl,
      }),
    });

    return this.handleResponse<AttachPaymentResponse>(response);
  }
}
