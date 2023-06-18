import { MutationTree } from "vuex";
import { Payment, State } from "./state";

export enum MutationType {
  SetLoading = "SET_LOADING",
  SetPayments = "SET_PAYMENTS",
  SelectPayment = "SELECT_PAYMENT",
  SetPaymentDetails = "SET_PAYMENT_DETAILS",
}

export type Mutations = {
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetPayments](state: State, payments: Payment[]): void;
  [MutationType.SelectPayment](state: State, payment: Payment | null): void;
  [MutationType.SetPaymentDetails](state: State, isOpen: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.SetPayments](state, payments) {
    state.payments = payments;
  },
  [MutationType.SelectPayment](state, payment) {
    state.selectedPayment = payment;
  },
  [MutationType.SetPaymentDetails](state, isOpen) {
    state.isPaymentDetailsOpen = isOpen;
  },
};
