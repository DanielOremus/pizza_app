<template>
  <MainMasterPage>
    <ProductForm />
  </MainMasterPage>
</template>

<script>
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import ProductForm from "@/components/product/productForm/index.vue"

export default {
  name: "ProductFormPage",
  components: {
    MainMasterPage,
    ProductForm,
  },
}
</script>

<style lang="scss" scoped>
.v-sheet {
  box-sizing: border-box;
}
</style>
