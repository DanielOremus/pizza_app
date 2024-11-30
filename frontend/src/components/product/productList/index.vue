<template>
  <v-container class="list py-10">
    <template
      v-if="!isLoading"
      v-for="product in productList"
      :key="product._id"
    >
      <ProductCard :product="product"></ProductCard>
    </template>
    <div v-else>Products are loading</div>
  </v-container>
</template>

<script>
import ProductCard from "../productCard/index.vue"
import { mapActions, mapGetters } from "vuex"
export default {
  name: "ProductList",
  components: { ProductCard },
  computed: {
    ...mapGetters("products", ["productList", "isLoading"]),
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
  align-items: center;
  gap: 5%;
}
</style>
