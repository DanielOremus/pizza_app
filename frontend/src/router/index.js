import { createWebHistory, createRouter } from "vue-router"
import AuthPage from "@/pages/AuthPage.vue"
import mainRoutes from "./main.js"
import menuRoutes from "./menu.js"
import authRoutes from "./auth.js"

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from) => {
//   if (to.meta.requriesAuth) {
//     return {
//       path: "",
//     }
//   }
// })

export default router
