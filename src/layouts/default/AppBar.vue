<template>
  <v-app-bar>
    <v-app-bar-title>Title</v-app-bar-title>

    <template v-slot:append>
      <v-btn to="users" class="mr-2">
        <v-icon class="mr-2">mdi-folder-account</v-icon>
        <p class="hidden-xs">Users</p>
      </v-btn>
      <v-btn to="payments">
        <v-icon class="mr-2">mdi-account-credit-card-outline</v-icon>
        <p class="hidden-xs">Payments</p>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup></script>
