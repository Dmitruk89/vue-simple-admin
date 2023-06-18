<template>
  <v-dialog v-model="dialogValue" scrollable width="auto" min-width="500px">
    <v-card>
      <v-card-title>Manage {{ user?.username }} todo</v-card-title>
      <v-divider></v-divider>
      <new-item />
      <v-card-text style="height: 300px; padding: 0">
        <!-- <div v-if="loading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div> -->

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
import TodoItem from "./TodoItem.vue";
import NewItem from "./NewItem.vue";
export default defineComponent({
  components: { NewItem, TodoItem },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    const user = computed(() => store.state.selectedUser);
    return { user, loading };
  },
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    dialogValue: {
      get(): boolean | undefined {
        return this.dialog === undefined ? undefined : Boolean(this.dialog);
      },
      set(value: boolean | undefined) {
        this.$emit("update:dialog", value);
      },
    },
  },

  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },
  },
});
</script>
