<template>
  <v-responsive class="fill-height">
    <div v-if="loading">
      <Loader />
    </div>
    <PaymentsList />
  </v-responsive>
</template>

<script lang="ts">
import { useStore } from "@/store";
import PaymentsList from "./PaymentsList.vue";
import { computed, onMounted } from "vue";
import { ActionTypes } from "@/store/actions";
import Loader from "../Loader.vue";
export default {
  components: {
    PaymentsList,
    Loader,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    onMounted(() => store.dispatch(ActionTypes.GetPayments));
    return { loading, store };
  },
};
</script>
