import { createWebHistory, createRouter } from "vue-router"
import AuthPage from "@/pages/AuthPage.vue"
import mainRoutes from "./main.js"
import menuRoutes from "./menu.js"
import authRoutes from "./auth.js"
import cartRoutes from "./cart.js"
import store from "../store/index.js"
import CartPage from "../pages/CartPage.vue"

const routes = [
  {
    path: "/",
    children: [...mainRoutes],
  },
  {
    path: "/menu",
    // component: MenuPage,
    children: [...menuRoutes],
  },
  {
    path: "/auth",
    component: AuthPage,
    children: [...authRoutes],
  },

  { path: "/cart", children: [...cartRoutes], meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = store.getters["user/isAuthenticated"]
    if (!isAuthenticated) {
      console.warn("You are not authenticated!")
      router.push({ name: "LoginPage" })
      return false
    }
  }
})

export default router
