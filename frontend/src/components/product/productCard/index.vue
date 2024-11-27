<template lang="">
  <v-card class="card">
    <v-img :src="product.image" height="200px"> </v-img>
    <v-card-title primary-title>
      {{ product.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ product.price }}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn flat color="primary">text</v-btn>
      <v-btn flat color="primary">text</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "ProductCard",

  props: {
    product: {
      type: Object,
      default: () => ({
        title: "Pizza",
        price: 25,
        image: "",
      }),
      required: true,
    },
  },
}
</script>
<style scoped></style>
