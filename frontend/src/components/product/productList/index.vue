<template>
  <v-container class="list-container d-flex flex-column h-100">
    <div
      class="spinner-container d-flex flex-grow-1 min-h-100 align-center justify-center"
      v-if="isLoading"
    >
      <v-sheet
        class="text-white d-inline-flex pa-2"
        color="grey-darken-4"
        rounded="lg"
      >
        <v-progress-circular indeterminate></v-progress-circular>
      </v-sheet>
    </div>

    <v-container v-if="!isLoading" class="list py-10 flex-grow-1 min-h-100">
      <ProductCard
        v-for="product in currentProducts"
        :key="product._id"
        :product="product"
      ></ProductCard>
      <div
        class="not-found-container d-flex flex-grow-1 min-h-100 align-center justify-center"
        v-if="!totalProductsNumber"
      >
        <v-sheet
          class="text-white pa-2"
          color="grey-darken-4 px-6 text-h6"
          rounded="lg"
        >
          Sorry, we couldn't find any dishes
        </v-sheet>
      </div>
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
      const reqQuery = {
        ...this.$route.query,
        page: newPageNumber,
        perPage: perPageNumber,
      }
      this.loadList(reqQuery)
      this.$router.push({
        path: this.$route.path,
        query: reqQuery,
      })
    },
  },
  mounted() {
    this.loadList(this.$route.query)
  },
}
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: baseline;
  row-gap: 2rem;
  column-gap: 5%;
}
.not-found-container {
  grid-column: 2 / span 2;
  align-self: center;
}
</style>
