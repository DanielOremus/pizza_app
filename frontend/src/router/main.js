import HomePage from "@/pages/HomePage.vue"
import AboutPage from "@/pages/AboutPage.vue"

export default [
  { path: "", component: HomePage, name: "HomePage" },
  {
    path: "about",
    component: AboutPage,
    name: "AboutPage",
  },
]
