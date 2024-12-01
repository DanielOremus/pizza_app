<template lang="">
  <MainMasterPage background="/menu-bg.png">
    <ProductList />
  </MainMasterPage>
</template>
<script>
import ProductList from "@/components/product/productList/index.vue"
import MainMasterPage from "@/layouts/MainMasterPage.vue"

export default {
  name: "MenuPage",
  components: {
    ProductList,
    MainMasterPage,
  },
}
</script>
<style lang=""></style>
