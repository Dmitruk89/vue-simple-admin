import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import users from "@/data/users.json";
import payments from "@/data/payments.json";
export enum ActionTypes {
  GetPayments = "GET_PAYMENTS",
  GetUsers = "GET_USERS",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.GetPayments](context: ActionAugments): void;
  [ActionTypes.GetUsers](context: ActionAugments): void;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetUsers]({ commit }) {
    commit(MutationType.SetLoading, true);
    await sleep(500);
    commit(MutationType.SetLoading, false);
    commit(MutationType.SetUsers, users);
  },
  async [ActionTypes.GetPayments]({ commit }) {
    commit(MutationType.SetLoading, true);
    await sleep(500);
    commit(MutationType.SetLoading, false);
    commit(MutationType.SetPayments, payments);
  },
};
