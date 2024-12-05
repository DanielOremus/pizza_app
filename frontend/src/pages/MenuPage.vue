<template>
  <MainMasterPage background="/menu-bg.png">
    <div class="flex-grow-1 w-100">
      <v-row class="justify-center h-100">
        <v-col cols="3">
          <QueryPanel
            :category-items="categoryList"
            @panel-event="onApplyFilters"
        /></v-col>
        <v-col cols="8"> <ProductList /></v-col>
      </v-row>
    </div>
  </MainMasterPage>
</template>
<script>
import ProductList from "@/components/product/productList/index.vue"
import QueryPanel from "@/components/product/QueryPanel.vue"
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "MenuPage",
  components: {
    ProductList,
    MainMasterPage,
    QueryPanel,
  },
  computed: {
    ...mapGetters("categories", ["categoryList"]),
  },
  methods: {
    ...mapActions({ loadCategoryList: "categories/loadList" }),
    ...mapActions({ loadProductList: "products/loadList" }),

    onApplyFilters(query) {
      this.loadProductList(query)

      this.$router.push({
        path: this.$route.path,
        query,
      })
    },
  },
  mounted() {
    this.loadCategoryList()
  },
}
</script>
<style lang=""></style>
