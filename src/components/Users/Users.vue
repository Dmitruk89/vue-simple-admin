<template>
  <v-responsive class="fill-height">
    <UserList />
  </v-responsive>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserList from "./UserList.vue";

export default defineComponent({
  components: {
    UserList,
  },
});
</script>
