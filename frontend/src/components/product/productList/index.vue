<template>
  <v-container class="list-container">
    <v-container class="list py-10 flex-grow-1 min-h-100" v-if="!isLoading">
      <ProductCard
        v-for="product in currentProducts"
        :key="product._id"
        :product="product"
      ></ProductCard>
    </v-container>
    <div v-else class="text-white">Products are loading</div>
    <Pagination
      :total-items-number="totalProductsNumber"
      :current-page="currentPage"
      :items-per-page="productsPerPage"
      @pagination-changed="onPageChange"
    />
  </v-container>
</template>

<script>
import ProductCard from "../productCard/index.vue"
import Pagination from "@/components/product/productList/Pagination.vue"

import { mapActions, mapGetters } from "vuex"
export default {
  name: "ProductList",
  components: { ProductCard, Pagination },
  computed: {
    ...mapGetters("products", [
      "currentProducts",
      "totalProductsNumber",
      "productsPerPage",
      "currentPage",
      "isLoading",
    ]),
  },
  methods: {
    ...mapActions("products", ["loadList"]),
    async onPageChange(newPageNumber, perPageNumber = null) {
      await this.loadList({ page: newPageNumber, perPage: perPageNumber })
      this.$router.push({
        path: this.$route.path,
        query: { page: this.currentPage, perPage: this.productsPerPage },
      })
    },
  },
  mounted() {
    this.loadList({
      page: this.$route.query.page,
      perPage: this.$route.query.perPage,
    })
  },
}
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(3, 250px);
  justify-content: center;
  align-items: center;
  row-gap: 8%;
  column-gap: 5%;
}
</style>
