import { createWebHistory, createRouter } from "vue-router"
import mainRoutes from "./main.js"
import menuRoutes from "./menu.js"
import MenuPage from "@/pages/MenuPage.vue"
// import authRoutes from "./auth.js"

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
  // {
  //   path: "/auth",
  //   children: [...authRoutes],
  // },
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
