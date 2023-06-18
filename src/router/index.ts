// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "users",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "users",
        name: "Users",
        component: () => import("@/views/Users.vue"),
      },
      {
        path: "payments",
        name: "Payments",
        component: () => import("@/views/Payments.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
