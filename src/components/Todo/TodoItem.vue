<template>
  <v-list-item>
    <v-list-item-title>
      <div :class="completed ? 'text-decoration-line-through' : 'none'">
        {{ text }}
      </div></v-list-item-title
    >
    <template v-slot:prepend>
      <v-checkbox
        v-model="checkboxState"
        @change="toggleCompletion"
        color="success"
        hide-details
      ></v-checkbox>
    </template>

    <template v-slot:append>
      <v-btn
        v-if="checkboxState"
        icon
        size="small"
        variant="tonal"
        color="red"
        @click="onDeleteClick(id)"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
        <v-tooltip activator="parent" location="top">Delete Todo</v-tooltip>
      </v-btn>
    </template>
  </v-list-item>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
export default defineComponent({
  props: {
    id: { type: Number, required: true },
    text: { type: String, requred: true },
    completed: { type: Boolean, required: true },
  },
  setup(props) {
    const store = useStore();
    const task = computed(
      () =>
        store.state.selectedUser?.todo.filter((todo) => todo.id === props.id)[0]
    );
    const checkboxState = ref(task.value?.completed);
    const toggleCompletion = () => {
      store.commit(MutationType.CompleteItem, {
        id: props.id,
        completed: !props.completed,
      });
    };

    return { toggleCompletion, checkboxState, store };
  },
  methods: {
    onDeleteClick(id: number) {
      this.store.commit(MutationType.DeleteItem, id);
    },
  },
});
</script>
