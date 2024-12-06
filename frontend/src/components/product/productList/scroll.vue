<template>
  <v-container class="list-container d-flex flex-column h-100">
    <v-container class="scroll-container flex-grow-1 py-10 min-h-100">
      <v-infinite-scroll
        color="white"
        :items="currentProducts"
        @load="onScroll"
      >
        <v-container class="list">
          <ProductCard
            v-for="product in currentProducts"
            :key="product._id"
            :product="product"
          ></ProductCard>
        </v-container>
        <template v-slot:empty class="empty-message-container">
          <v-alert type="warning" class="text-h6"
            >Sorry, we couldn't find more dishes!</v-alert
          >
        </template>
      </v-infinite-scroll>
    </v-container>
  </v-container>
</template>

<script>
import ProductCard from "../productCard/index.vue"

import { mapActions, mapGetters } from "vuex"
export default {
  name: "ProductListScroll",
  components: { ProductCard },
  data() {
    return {
      doneFunc: null,
    }
  },
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
    ...mapActions("productsScroll", [
      "loadScrollList",
      "setCurrentPage",
      "setProductList",
    ]),

    async onScroll({ done }, query = this.$route.query) {
      console.log(this.isLoading)
      this.doneFunc = done
      if (this.isLoading) {
        return done("ok")
      }
      console.log(this.currentProducts)

      if (this.totalProductsNumber <= this.currentProducts.length) {
        console.log("Second")

        return done("empty")
      }
      try {
        await this.loadScrollList({
          ...query,
          page: this.currentPage + 1,
        })

        // this.setCurrentPage(this.currentPage + 1)
        console.log(this.currentPage)

        done("ok")
      } catch (error) {
        done("error")
      }
    },
  },
  // watch: {
  //   "$route.query": {
  //     handler() {
  //       this.onScroll()
  //     },
  //   },
  // },
  // unmounted() {
  //   this.setProductList([])
  // },
  async mounted() {
    this.setProductList([])
    await this.loadScrollList({ ...this.$route.query, page: 0 })
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
.not-found-container,
.empty-message-container {
  grid-column: 2 / span 2;
  align-self: center;
}
</style>
