export type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

export type User = {
  id: string;
  email: string;
  username: string;
  phone: string;
  todo: TodoItem[];
};

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
  users: User[];
  selectedUser: User | null;
  payments: Payment[];
  selectedPayment: Payment | null;
  isPaymentDetailsOpen: boolean;
};

export const state: State = {
  loading: false,
  users: [],
  selectedUser: null,
  payments: [],
  selectedPayment: null,
  isPaymentDetailsOpen: false,
};
