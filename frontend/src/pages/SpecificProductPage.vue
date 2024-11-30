<template lang="">
  <MainMasterPage>
    <v-list v-if="!isLoading">
      <v-list-item>
        <v-img :src="product.image" aspect-ratio="1/1" :width="250" />
      </v-list-item>
      <v-list-item> Title: {{ product.title }} </v-list-item>
      <v-list-item> Price: {{ product.price }}₴ </v-list-item>
      <v-list-item> Description: {{ product.description }} </v-list-item>
      <v-list-item> Category: {{ product.category?.title }} </v-list-item>
      <v-list-item>
        <v-list>
          Reviews:
          <v-list-item v-for="review in reviews" :key="review._id">
            User: {{ review.user.fullName }} Rate: {{ review.rate }} Comment:
            {{ review.text }}
          </v-list-item>
        </v-list>
      </v-list-item>
    </v-list>
    <div v-else>Content is loading</div>
  </MainMasterPage>
</template>
<script>
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import { mapActions, mapGetters } from "vuex"

export default {
  name: "SpecificProductPage",
  components: {
    MainMasterPage,
  },
  computed: {
    ...mapGetters("products", ["isLoading"]),
  },
  data() {
    return {
      product: {},
      reviews: [],
    }
  },
  async mounted() {
    const id = this.$route.params.id
    console.log(id)

    try {
      const data = await this.loadById(id)
      console.log(data)

      this.product = data.meal
      this.reviews = data.reviews
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    ...mapActions("products", ["loadById"]),
  },
}
</script>
<style lang=""></style>
