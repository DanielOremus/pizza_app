<template>
  <MainMasterPage background="/menu-bg.png">
    <div class="flex-grow-1 w-100">
      <v-row class="justify-center h-100">
        <v-col cols="3">
          <QueryPanel
            :category-items="categoryList"
            @panel-event="onApplyFilters"
        /></v-col>
        <v-col cols="8"> <ProductListScroll /></v-col>
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
    ...mapActions({ loadProductList: "productsScroll/loadList" }),
    ...mapActions("productsScroll", ["setProductList"]),

    async onApplyFilters(query) {
      this.setProductList([])
      window.scrollTo({ top: 0, behavior: "smooth" })
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
