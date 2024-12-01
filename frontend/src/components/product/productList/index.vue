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
      :total-items="totalProducts"
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
      "totalProducts",
      "isLoading",
    ]),
  },
  methods: {
    ...mapActions("products", ["loadList"]),
    onPageChange({ page, perPage }) {
      console.log({ page, perPage })
      this.$router.push({
        query: { page, perPage },
      })
    },
  },
  watch: {
    "$route.query": {
      immediate: true,
      handler({ page, perPage }) {
        this.loadList({ page: page, perPage: perPage })
      },
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log(111)

    // this.loadList({ page: to.query.page, perPage: to.query.perPage })
    next()
  },
  mounted() {},
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
