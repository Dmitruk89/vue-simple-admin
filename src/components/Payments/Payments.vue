<template>
  <v-responsive class="fill-height">
    <div v-if="loading">
      <Loader />
    </div>
    <PaymentsList v-else />
    <PaymentDetails v-if="selectedPayment" />
  </v-responsive>
</template>

<script lang="ts">
import { useStore } from "@/store";
import PaymentsList from "./PaymentsList.vue";
import PaymentDetails from "./PaymentDetails.vue";
import { computed, onMounted } from "vue";
import { ActionTypes } from "@/store/actions";
import Loader from "../Loader.vue";
export default {
  components: {
    PaymentsList,
    PaymentDetails,
    Loader,
  },
  setup() {
    const store = useStore();
    const loading = computed(() => store.state.loading);
    onMounted(() => store.dispatch(ActionTypes.GetPayments));
    const selectedPayment = computed(() => store.state.selectedPayment);
    return { loading, selectedPayment };
  },
};
</script>
