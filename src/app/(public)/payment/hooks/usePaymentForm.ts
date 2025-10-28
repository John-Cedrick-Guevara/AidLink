import { useState, useCallback } from "react";
import { UserInfo, CardDetails } from "../types";
import { formatCardNumber, formatPhoneNumber } from "../utils/validation";

export const usePaymentForm = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    phone: "",
  });

  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });

  const updateUserInfo = useCallback((field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: field === "phone" ? formatPhoneNumber(value) : value,
    }));
  }, []);

  const updateCardDetails = useCallback(
    (field: keyof CardDetails, value: string) => {
      setCardDetails((prev) => ({
        ...prev,
        [field]: field === "cardNumber" ? formatCardNumber(value) : value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setUserInfo({ name: "", email: "", phone: "" });
    setCardDetails({ cardNumber: "", expMonth: "", expYear: "", cvc: "" });
  }, []);

  return {
    userInfo,
    cardDetails,
    updateUserInfo,
    updateCardDetails,
    resetForm,
  };
};
