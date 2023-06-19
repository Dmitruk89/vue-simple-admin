import { MutationTree } from "vuex";
import { Payment, State, TodoItem, User } from "./state";

export enum MutationType {
  SetUsers = "SET_USERS",
  SelectUser = "SELECT_USER",
  UpdateUser = "UPDATE_USER",
  CreateItem = "CREATE_ITEM",
  DeleteItem = "DELETE_ITEM",
  CompleteItem = "COMPLETE_ITEM",
  SetLoading = "SET_LOADING",
  SetPayments = "SET_PAYMENTS",
  SelectPayment = "SELECT_PAYMENT",
  SetIsPaymentDetails = "SET_IS_PAYMENT_DETAILS",
  SetIsUserDetails = "SET_IS_USER_DETAILS",
  SetIsTodoList = "SET_IS_TODO_LIST",
}

export type Mutations = {
  [MutationType.SetUsers](state: State, users: User[]): void;
  [MutationType.SelectUser](state: State, user: User | null): void;
  [MutationType.UpdateUser](state: State, user: Partial<User>): void;
  [MutationType.CreateItem](state: State, item: TodoItem): void;
  [MutationType.DeleteItem](state: State, id: number): void;
  [MutationType.CompleteItem](
    state: State,
    item: Partial<TodoItem> & { id: number }
  ): void;
  [MutationType.SetLoading](state: State, value: boolean): void;
  [MutationType.SetPayments](state: State, payments: Payment[]): void;
  [MutationType.SelectPayment](state: State, payment: Payment | null): void;
  [MutationType.SetIsPaymentDetails](state: State, isOpen: boolean): void;
  [MutationType.SetIsUserDetails](state: State, isOpen: boolean): void;
  [MutationType.SetIsTodoList](state: State, isOpen: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetUsers](state, users) {
    state.users = users;
  },
  [MutationType.SelectUser](state, user) {
    state.selectedUser = user;
  },
  [MutationType.UpdateUser](state, updatedUser) {
    const index = state.users.findIndex((user) => user.id === updatedUser.id);
    if (index === -1) return;
    state.users[index] = { ...state.users[index], ...updatedUser };
  },
  [MutationType.CreateItem](state, item) {
    state.selectedUser?.todo.unshift(item);
  },
  [MutationType.DeleteItem](state, itemId) {
    if (!state.selectedUser) return;
    const filtered = state.selectedUser.todo.filter(
      (item) => item.id !== itemId
    );
    state.selectedUser.todo = [...filtered];
  },
  [MutationType.CompleteItem](state, newItem) {
    if (!state.selectedUser) return;
    const index = state.selectedUser.todo.findIndex(
      (todo) => todo.id === newItem.id
    );
    if (index === -1) return;
    state.selectedUser.todo[index] = {
      ...state.selectedUser.todo[index],
      ...newItem,
    };
  },
  [MutationType.SetLoading](state, value) {
    state.loading = value;
  },
  [MutationType.SetPayments](state, payments) {
    state.payments = payments;
  },
  [MutationType.SelectPayment](state, payment) {
    state.selectedPayment = payment;
  },
  [MutationType.SetIsPaymentDetails](state, isOpen) {
    state.isPaymentDetailsOpen = isOpen;
  },
  [MutationType.SetIsUserDetails](state, isOpen) {
    state.isUserDetailsOpen = isOpen;
  },
  [MutationType.SetIsTodoList](state, isOpen) {
    state.isTodoListOpen = isOpen;
  },
};
