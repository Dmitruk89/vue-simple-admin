<template>
  <v-card class="mx-auto">
    <v-card-title> Payments List </v-card-title>

    <v-divider></v-divider>

    <v-virtual-scroll :items="payments" item-height="48">
      <template v-slot:default="{ item }">
        <v-list-item>
          <v-list-item-title
            >{{ item.amount }} {{ item.currency }}</v-list-item-title
          >
          <v-list-item-subtitle>date: {{ item.date }}</v-list-item-subtitle>
          <template v-slot:prepend>
            <v-icon>mdi-credit-card-check-outline</v-icon>
          </template>

          <template v-slot:append>
            <v-btn
              icon
              size="small"
              variant="tonal"
              @click="onShowPaymentDetailsClick(item)"
            >
              <v-icon>mdi-clipboard-text-outline</v-icon>
              <v-tooltip activator="parent" location="top"
                >Payment details</v-tooltip
              >
            </v-btn>
          </template>
        </v-list-item>
        <v-divider inset></v-divider>
      </template>
    </v-virtual-scroll>
  </v-card>
  <!-- <PaymentDetails :dialog="showPaymentDetails" @update:dialog="updateDialog" /> -->
  <PaymentDetails @update:dialog="updateDialog" />
</template>

<script lang="ts">
import { useStore } from "@/store";
import PaymentDetails from "./PaymentDetails.vue";
import { computed, ref } from "vue";
import { Payment } from "@/store/state";
import { MutationType } from "@/store/mutations";
export default {
  components: {
    PaymentDetails,
  },
  setup() {
    const store = useStore();
    const payments = computed(() => store.state.payments);
    //const showPaymentDetails = computed(() => store.state.isPaymentDetailsOpen);
    const showPaymentDetails = ref(store.state.isPaymentDetailsOpen);
    return { payments, store, showPaymentDetails };
  },
  methods: {
    onShowPaymentDetailsClick(payment: Payment) {
      //this.showPaymentDetails = true;
      this.store.commit(MutationType.SetPaymentDetails, true);
      this.store.commit(MutationType.SelectPayment, payment);
    },
    updateDialog(value: boolean) {
      this.showPaymentDetails = value;
      if (value === false) {
        this.store.commit(MutationType.SelectPayment, null);
      }
    },
  },
};
</script>
