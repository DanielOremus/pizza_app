<template lang="">
  <v-card
    class="card py-6 text-center bg-grey-darken-4"
    align="center"
    rounded="xl"
  >
    <v-img
      :src="product.image ? product.image : '/no-image.jpg'"
      height="200px"
    >
    </v-img>
    <v-card-title primary-title>
      {{ product.title }}
    </v-card-title>
    <v-card-subtitle class="card-subtitle text-subtitle-1">
      {{ product.category?.title }}
      <v-spacer />
      {{ product.price }}₴
    </v-card-subtitle>
    <div class="d-flex flex-column ga-3 mt-3 align-center">
      <v-btn
        color="warning"
        class="action-btn w-75"
        rounded="lg"
        @click="onView(product._id)"
        >View</v-btn
      >
      <v-btn
        v-if="isAuthenticated"
        color="warning"
        class="action-btn w-75"
        rounded="lg"
        @click="onAddToCart(product._id)"
        >Add to Cart</v-btn
      >
      <v-btn
        v-if="isAuthenticated && userPermissions?.menu?.edit"
        color="info"
        class="action-btn w-75"
        rounded="lg"
        @click="onEdit(product._id)"
        >Edit</v-btn
      >
      <v-btn
        v-if="isAuthenticated && userPermissions?.menu?.delete"
        color="error"
        class="action-btn w-75"
        rounded="lg"
        @click="onDelete(product._id)"
        >Delete</v-btn
      >
    </div>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "ProductCard",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters("user", ["userPermissions", "isAuthenticated"]),
  },
  methods: {
    ...mapActions("products", ["deleteById"]),
    ...mapActions("cart", ["addMealToCart"]),
    async onDelete(id) {
      try {
        await this.deleteById(id)
      } catch (error) {
        console.log(error)
      }
    },
    onEdit(id) {
      this.$router.push({
        name: "ProductUpdate",
        params: { id },
      })
    },
    onView(id) {
      this.$router.push({
        name: "SpecificProductPage",
        params: { id },
      })
    },
    onAddToCart(mealId) {
      this.addMealToCart(mealId)
    },
  },
}
</script>
<style scoped lang="scss">
.card * {
  font-family: $arima;
}
.card {
  box-shadow: 0px 0px 15px 4px rgb(0, 0, 0);
}
.action-btn {
  font-weight: 600;
}
</style>
