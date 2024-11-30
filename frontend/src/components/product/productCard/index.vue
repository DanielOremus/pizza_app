<template lang="">
  <v-card
    class="card py-6 text-center bg-grey-darken-4"
    align="center"
    elevation="10"
    rounded="xl"
  >
    <v-img :src="product.image" height="200px"> </v-img>
    <v-card-title primary-title>
      {{ product.title }}
    </v-card-title>
    <v-card-subtitle class="card-subtitle text-subtitle-1">
      {{ product.category.title }}
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
        color="info"
        class="action-btn w-75"
        rounded="lg"
        @click="onEdit(product._id)"
        >Edit</v-btn
      >
      <v-btn
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
import { mapActions } from "vuex"
export default {
  name: "ProductCard",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("products", ["deleteById"]),
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
  },
}
</script>
<style scoped lang="scss">
.card * {
  font-family: $arima;
}
.action-btn {
  font-weight: 600;
  // font-variant: ;
}
</style>
