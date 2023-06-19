<template>
  <v-dialog
    v-model="dialogValue"
    @click:outside="closeDialog"
    width="auto"
    min-width="300px"
  >
    <v-card>
      <v-card-title>Payment {{ payment?.id }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="heigh: 100%">
        <v-col class="text-h3">
          {{ payment?.amount }} {{ payment?.currency }}
        </v-col>
        <div class="mx-3 text-subtitle-1">Payer: {{ payment?.userId }}</div>
        <div class="mx-3 text-subtitle-1">
          Reciever: {{ payment?.receiver }}
        </div>
        <v-chip class="ml-2 mt-8"> {{ payment?.date }}</v-chip>
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

export default defineComponent({
  setup() {
    const store = useStore();
    const payment = computed(() => store.state.selectedPayment);
    return { payment, store };
  },
  computed: {
    dialogValue: {
      get(): boolean | undefined {
        return this.store.state.isPaymentDetailsOpen;
      },
      set(value: boolean) {
        this.store.commit(MutationType.SetIsPaymentDetails, value);
      },
    },
  },
  methods: {
    closeDialog() {
      this.store.commit(MutationType.SetIsPaymentDetails, false);
      this.store.commit(MutationType.SelectPayment, null);
    },
  },
});
</script>
