<template>
  <v-responsive class="fill-height">
    <div v-if="loading">
      <Loader />
    </div>
    <UserList v-else />
  </v-responsive>
  <TodoList v-if="selectedUser" />
  <UserDetails v-if="selectedUser" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import UserList from "./UserList.vue";
import TodoList from "@/components/Todo/TodoList.vue";
import UserDetails from "./UserDetails.vue";
import Loader from "@/components/Loader.vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
export default defineComponent({
  components: {
    UserList,
    TodoList,
    UserDetails,
    Loader,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    onMounted(() => store.dispatch(ActionTypes.GetUsers));
    const selectedUser = computed(() => store.state.selectedUser);
    return { loading, selectedUser };
  },
});
</script>
