import SpecificProductPage from "@/pages/SpecificProductPage.vue"
import ProductFormPage from "@/pages/ProductFormPage.vue"
import MenuPage from "@/pages/MenuPage.vue"

export default [
  {
    path: "",
    component: MenuPage,
    name: "MenuPage",
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
  },
  {
    path: "update/:id",
    component: ProductFormPage,
    name: "ProductUpdate",
  },
]
