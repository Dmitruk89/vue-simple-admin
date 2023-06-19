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
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed } from "vue";
import { Payment } from "@/store/state";
import { MutationType } from "@/store/mutations";
export default {
  setup() {
    const store = useStore();
    const payments = computed(() => store.state.payments);
    return { payments, store };
  },
  methods: {
    onShowPaymentDetailsClick(payment: Payment) {
      this.store.commit(MutationType.SetIsPaymentDetails, true);
      this.store.commit(MutationType.SelectPayment, payment);
    },
  },
};
</script>
