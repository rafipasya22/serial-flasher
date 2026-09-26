import { createRouter, createWebHistory } from "vue-router";

import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import { useAuth } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/",
      component: Main,
    },
  ],
});

router.beforeEach((to) => {
  const { session } = useAuth();

  if (to.meta.requiresAuth && !session.value) {
    return "/login";
  }

  if ((to.path === "/login" || to.path === "/register") && session.value) {
    return "/";
  }
});

export default router;
