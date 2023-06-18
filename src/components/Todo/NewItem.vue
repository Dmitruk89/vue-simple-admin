<template>
  <form @submit.prevent="createTask">
    <v-text-field
      label="Add todo"
      variant="solo"
      v-model="todoText"
      class="mx-4 my-4"
      append-inner-icon="mdi-plus"
      @click:append-inner="createTask"
    ></v-text-field>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { useStore } from "@/store";
import { TodoItem } from "@/store/state";
import { MutationType } from "@/store/mutations";
export default defineComponent({
  setup() {
    const todoText = ref("");
    const store = useStore();
    const createTask = () => {
      if (todoText.value === "") return;

      const item: TodoItem = {
        id: Date.now(),
        text: todoText.value,
        completed: false,
      };
      store.commit(MutationType.CreateItem, item);
      todoText.value = "";
    };
    return { createTask, todoText };
  },
});
</script>
