<template lang="">
  <Header />
  Menu Page
  <ProductList />
</template>
<script>
import Header from "@/components/sections/Header.vue"
import ProductList from "@/components/product/productList/index.vue"
export default {
  name: "MenuPage",
  components: {
    Header,
    ProductList,
  },
}
</script>
<style lang=""></style>
