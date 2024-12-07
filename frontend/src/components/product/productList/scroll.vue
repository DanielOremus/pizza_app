<template>
  <v-container class="list-container d-flex flex-column h-100">
    <v-container
      v-if="currentProducts.length > 0 || !isLoading"
      class="list flex-grow-1 py-10 min-h-100"
    >
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

    <div class="spinner-container d-flex justify-center" v-if="isLoading">
      <v-sheet
        class="text-white d-inline-flex pa-2"
        color="grey-darken-4"
        rounded="lg"
      >
        <v-progress-circular indeterminate></v-progress-circular>
      </v-sheet>
    </div>
  </v-container>
</template>

<script>
import ProductCard from "../productCard/index.vue"

import { mapActions, mapGetters } from "vuex"
export default {
  name: "ProductListScroll",
  components: { ProductCard },

  computed: {
    ...mapGetters("productsScroll", [
      "currentProducts",
      "totalProductsNumber",
      "productsPerPage",
      "currentPage",
      "isLoading",
    ]),
  },
  methods: {
    ...mapActions("productsScroll", ["loadList", "setProductList"]),
    async onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (this.isLoading) return
        if (this.totalProductsNumber <= this.currentProducts.length) return
        this.loadList({ ...this.$route.query, page: this.currentPage + 1 })
      }
    },
  },

  mounted() {
    this.setProductList([])
    this.loadList({ ...this.$route.query, page: 0 })
    window.addEventListener("scroll", this.onScroll)
  },
  unmounted() {
    window.removeEventListener("scroll", this.onScroll)
  },
}
</script>

<style scoped lang="scss">
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
