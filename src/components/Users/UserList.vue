<template>
  <div v-if="loading">
    <Loader />
  </div>
  <v-card class="mx-auto" v-else>
    <v-card-title> Users List </v-card-title>

    <v-divider></v-divider>

    <v-virtual-scroll :items="users" item-height="48">
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-title
            >{{ item.username }}, {{ item.email }}</v-list-item-title
          >
          <v-list-item-subtitle>phone: {{ item.phone }}</v-list-item-subtitle>
          <template v-slot:prepend>
            <v-icon class="bg-primary">mdi-account</v-icon>
          </template>

          <template v-slot:append>
            <v-btn
              class="mr-2"
              icon
              size="small"
              variant="tonal"
              color="blue-grey"
              @click="onEditUserClick(item)"
            >
              <v-icon>mdi-pencil</v-icon>
              <v-tooltip activator="parent" location="top">Edit User</v-tooltip>
            </v-btn>
            <v-btn
              icon
              size="small"
              variant="tonal"
              color="primary"
              @click="onShowTodoClick(item)"
            >
              <v-icon>mdi-clipboard-list</v-icon>
              <v-tooltip activator="parent" location="top">Edit Todo</v-tooltip>
            </v-btn>
          </template>
        </v-list-item>
        <v-divider inset></v-divider>
      </template>
    </v-virtual-scroll>
  </v-card>
  <UserDetails
    v-if="selectedUser"
    :dialog="showUserDialog"
    @update:dialog="updateUserDialog"
  />
  <TodoList
    v-if="selectedUser"
    :dialog="showTodoDialog"
    @update:dialog="updateTodoDialog"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
import TodoList from "../Todo/TodoList.vue";
import UserDetails from "./UserDetails.vue";
import Loader from "../Loader.vue";
import { ActionTypes } from "@/store/actions";
import { MutationType } from "@/store/mutations";
import { User } from "@/store/state";
export default defineComponent({
  components: {
    TodoList,
    UserDetails,
    Loader,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    onMounted(() => store.dispatch(ActionTypes.GetUsers));
    const users = computed(() => store.state.users);
    const selectedUser = computed(() => store.state.selectedUser);
    return { users, loading, selectedUser, store };
  },
  data() {
    return {
      showUserDialog: false,
      showTodoDialog: false,
    };
  },
  methods: {
    onEditUserClick(user: User) {
      this.showUserDialog = true;
      this.store.commit(MutationType.SelectUser, user);
    },
    onShowTodoClick(user: User) {
      this.showTodoDialog = true;
      this.store.commit(MutationType.SelectUser, user);
    },
    updateUserDialog(value: boolean) {
      this.showUserDialog = value;
      if (value === false) {
        this.store.commit(MutationType.SelectUser, null);
      }
    },
    updateTodoDialog(value: boolean) {
      this.showTodoDialog = value;
      if (value === false) {
        this.store.commit(MutationType.SelectUser, null);
      }
    },
  },
});
</script>
