export type Payment = {
  userId: string;
  id: string;
  date: string;
  amount: number;
  currency: string;
  receiver: string;
};

export type State = {
  loading: boolean;
  payments: Payment[];
  selectedPayment: Payment | null;
  isPaymentDetailsOpen: boolean;
};

export const state: State = {
  loading: false,
  payments: [],
  selectedPayment: null,
  isPaymentDetailsOpen: false,
};
