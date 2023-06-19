<template>
  <v-dialog
    v-model="dialogValue"
    scrollable
    width="auto"
    min-width="500px"
    @click:outside="closeDialog"
  >
    <v-card>
      <v-form v-if="user" ref="form" @submit.prevent="saveDialog">
        <v-card-title>Manage user info</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="heigh: 100%">
          <v-container>
            <v-row>
              <v-text-field
                v-model="usernameText"
                :rules="usernameNameRules"
                variant="solo"
                label="Username"
                prepend-icon="mdi-account-outline"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="useremailText"
                :rules="emailRules"
                variant="solo"
                label="Email"
                prepend-icon="mdi-email-outline"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="userphoneText"
                :rules="phoneNumberRules"
                variant="solo"
                label="Phone number"
                prepend-icon="mdi-phone-outline"
                required
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue-darken-1" variant="text" @click="closeDialog">
            Close
          </v-btn>
          <v-btn type="submit" color="success" variant="text"> Save </v-btn>
        </v-card-actions>
      </v-form>
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
    };
    return {
      user,
      store,
      usernameText,
      useremailText,
      userphoneText,
      updateUser,
    };
  },
  computed: {
    dialogValue: {
      get(): boolean | undefined {
        return this.store.state.isUserDetailsOpen;
      },
      set(value: boolean) {
        this.store.commit(MutationType.SetIsUserDetails, value);
      },
    },
  },
  data() {
    return {
      usernameNameRules: [(v: string) => !!v || "Username is required"],
      emailRules: [
        (v: string) => !!v || "Email is required",
        (v: string) => /.+@.+\..+/.test(v) || "Email must be valid",
      ],
      phoneNumberRules: [
        (v: string) => !!v || "Phone number is required",
        (v: string) =>
          /^\d{9,}$/.test(v) ||
          "Phone number must be at least 9 symbols digits only",
      ],
    };
  },
  methods: {
    closeDialog() {
      this.store.commit(MutationType.SetIsUserDetails, false);
      this.store.commit(MutationType.SelectUser, null);
    },
    async saveDialog() {
      const form = this.$refs.form as any;
      const validation = await form.validate();
      const isValid = validation.valid;

      if (isValid) {
        this.updateUser();
        this.store.commit(MutationType.SetIsUserDetails, false);
        this.store.commit(MutationType.SelectUser, null);
      }
    },
  },
});
</script>
