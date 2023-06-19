<template>
  <v-card class="mx-auto">
    <v-card-title>Users List</v-card-title>

    <v-divider></v-divider>

    <v-virtual-scroll :items="users" item-height="48">
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-list-item-title
                  >{{ item.username }}, {{ item.email }}</v-list-item-title
                >
                <v-list-item-subtitle
                  >phone: {{ item.phone }}</v-list-item-subtitle
                >
              </v-col>
              <v-col cols="12" md="6" class="hidden-sm-and-down">
                <div v-if="item.todo[0]">
                  currently working on:
                  <v-chip :color="item.todo[0].completed ? 'green' : 'grey'">{{
                    item.todo[0].text
                  }}</v-chip>
                </div>
              </v-col>
            </v-row>
          </v-container>

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
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { MutationType } from "@/store/mutations";
import { User } from "@/store/state";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();
    const users = computed(() => store.state.users);
    return { users, store };
  },
  methods: {
    onEditUserClick(user: User) {
      this.store.commit(MutationType.SelectUser, user);
      this.store.commit(MutationType.SetIsUserDetails, true);
    },
    onShowTodoClick(user: User) {
      this.store.commit(MutationType.SelectUser, user);
      this.store.commit(MutationType.SetIsTodoList, true);
    },
  },
});
</script>
