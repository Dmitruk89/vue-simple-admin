<template>
  <v-dialog
    v-model="dialogValue"
    scrollable
    width="auto"
    min-width="500px"
    @click:outside="closeDialog"
  >
    <v-card>
      <v-card-title>Manage {{ user?.username }} todo</v-card-title>
      <v-divider></v-divider>
      <new-item />
      <v-card-text style="height: 300px; padding: 0">
        <div class="ml-6" v-if="user?.todo.length === 0">No active tasks</div>
        <todo-item v-for="item in user?.todo" :key="item.id" v-bind="item" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import TodoItem from "./TodoItem.vue";
import NewItem from "./NewItem.vue";
export default defineComponent({
  components: { NewItem, TodoItem },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.selectedUser);
    return { user, store };
  },
  computed: {
    dialogValue: {
      get(): boolean | undefined {
        return this.store.state.isTodoListOpen;
      },
      set(value: boolean) {
        this.store.commit(MutationType.SetIsTodoList, value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.store.commit(MutationType.SetIsTodoList, false);
    },
  },
});
</script>
