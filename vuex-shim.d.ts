import { Store } from "vuex";

export interface User {
  id: string;
  email: string;
  username: string;
  phone: number;
  todo: string[];
}

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    count: number;
    users: User[];
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
