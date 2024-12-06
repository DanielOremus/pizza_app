import SpecificProductPage from "@/pages/SpecificProductPage.vue"
import ProductFormPage from "@/pages/ProductFormPage.vue"
import MenuPage from "@/pages/MenuPage.vue"
import MenuPageScroll from "@/pages/MenuPageScroll.vue"

export default [
  {
    path: "",
    component: MenuPage,
    name: "MenuPage",
  },
  {
    path: "scroll",
    component: MenuPageScroll,
    name: "MenuPageScroll",
  },
  {
    path: ":id",
    component: SpecificProductPage,
    name: "SpecificProductPage",
  },
  {
    path: "create",
    component: ProductFormPage,
    name: "ProductCreate",
    meta: { requiresAuth: true, requiredRole: "Manager" },
  },
  {
    path: "update/:id",
    component: ProductFormPage,
    name: "ProductUpdate",
    meta: { requiresAuth: true, requiredRole: "Manager" },
  },
]
