import { createWebHistory, createRouter } from "vue-router"

import HomePage from "@/pages/HomePage.vue"
import AboutPage from "@/pages/AboutPage.vue"
import MenuPage from "@/pages/MenuPage.vue"

const routes = [
  { path: "/", component: HomePage, name: "HomePage" },
  {
    path: "/about",
    component: AboutPage,
    name: "AboutPage",
  },
  {
    path: "/menu",
    component: MenuPage,
    name: "MenuPage",
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
