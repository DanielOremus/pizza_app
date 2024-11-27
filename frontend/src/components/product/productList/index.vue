<template>
  <v-container class="list">
    <template v-for="product in productList" :key="product.id">
      <ProductCard :product="product"></ProductCard>
    </template>
  </v-container>
</template>

<script>
import ProductCard from "../productCard/index.vue"
import { mapActions, mapGetters } from "vuex"
export default {
  name: "ProductList",
  components: { ProductCard },
  computed: {
    ...mapGetters("products", ["products"]),
  },
  methods: {
    ...mapActions("products", ["loadList"]),
  },
  async mounted() {
    try {
      await this.loadList()
    } catch (error) {
      console.log(error)
    }
  },
}
</script>

<style scoped>
.list {
  display: grid;
  grid-template-columns: repeat(3, 250px);
  justify-content: center;
  gap: 5%;
}
</style>
