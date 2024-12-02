<template>
  <v-container class="list-container d-flex flex-column h-100">
    <div
      class="text-white d-flex flex-grow-1 min-h-100 align-center justify-center"
      v-if="isLoading"
    >
      <v-sheet class="d-inline-flex pa-2" color="grey-darken-4" rounded="lg">
        <v-progress-circular indeterminate></v-progress-circular>
      </v-sheet>
    </div>
    <v-container v-else class="list py-10 flex-grow-1 min-h-100">
      <ProductCard
        v-for="product in currentProducts"
        :key="product._id"
        :product="product"
      ></ProductCard>
    </v-container>

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
import Pagination from "@/components/pagination/Pagination.vue"

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
  grid-template-columns: repeat(4, 250px);
  justify-content: start;
  align-items: baseline;
  row-gap: 8%;
  column-gap: 5%;
}
</style>
