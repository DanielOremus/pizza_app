import HomePage from "@/pages/main/HomePage.vue"
import AboutPage from "@/pages/main/AboutPage.vue"

export default [
  { path: "", component: HomePage, name: "HomePage" },
  {
    path: "about",
    component: AboutPage,
    name: "AboutPage",
  },
]
