<template>
  <v-dialog v-model="dialogValue" scrollable width="auto" min-width="500px">
    <v-card>
      <v-card-title>Manage user info</v-card-title>
      <v-divider></v-divider>
      <v-card-text class="heigh: 100%">
        <v-form v-if="user" v-model="valid">
          <v-container>
            <v-row>
              <v-text-field
                v-model="usernameText"
                variant="solo"
                label="Username"
                prepend-icon="mdi-account-outline"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="useremailText"
                variant="solo"
                label="Email"
                prepend-icon="mdi-email-outline"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="userphoneText"
                variant="solo"
                label="Phone number"
                prepend-icon="mdi-phone-outline"
                required
              ></v-text-field>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
          Close
        </v-btn>
        <v-btn color="success" variant="text" @click="saveDialog"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { User } from "@/store/state";
export default defineComponent({
  setup() {
    const store = useStore();

    const user = computed(() => store.state.selectedUser);

    const usernameText = ref(user.value?.username);
    const useremailText = ref(user.value?.email);
    const userphoneText = ref(user.value?.phone);
    const updateUser = () => {
      if (
        usernameText.value === "" ||
        useremailText.value === "" ||
        userphoneText.value === ""
      )
        return;

      const updatedUser: Partial<User> = {
        id: user.value?.id,
        username: usernameText.value,
        email: useremailText.value,
        phone: userphoneText.value,
      };
      store.commit(MutationType.UpdateUser, updatedUser);
      usernameText.value = "";
    };
    return { user, usernameText, useremailText, userphoneText, updateUser };
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
  data() {
    return {
      valid: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("update:dialog", false);
    },
    saveDialog() {
      this.updateUser();
      this.$emit("update:dialog", false);
    },
  },
});
</script>
