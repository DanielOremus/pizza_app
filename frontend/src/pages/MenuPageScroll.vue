<template>
  <MainMasterPage background="/menu-bg.png">
    <div class="flex-grow-1 w-100">
      <v-row class="justify-center h-100">
        <v-col cols="3">
          <QueryPanel
            :category-items="categoryList"
            @panel-event="onApplyFilters"
        /></v-col>
        <v-col cols="8"> <ProductListScroll ref="ProductListScroll" /></v-col>
      </v-row>
    </div>
  </MainMasterPage>
</template>
<script>
import ProductListScroll from "@/components/product/productList/scroll.vue"
import QueryPanel from "@/components/product/QueryPanel.vue"
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "MenuPageScroll",
  components: {
    ProductListScroll,
    MainMasterPage,
    QueryPanel,
  },
  computed: {
    ...mapGetters("categories", ["categoryList"]),
  },
  methods: {
    ...mapActions({ loadCategoryList: "categories/loadList" }),
    ...mapActions({ loadProductList: "productsScroll/loadScrollList" }),
    ...mapActions("productsScroll", ["setProductList"]),

    async onApplyFilters(query) {
      this.setProductList([])

      await this.loadProductList(query)
      console.log("From Menu")
      console.log(this.$refs.ProductListScroll.doneFunc)

      this.$refs.ProductListScroll.onScroll(
        {
          done: this.$refs.ProductListScroll.doneFunc,
        },
        query
      )

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
