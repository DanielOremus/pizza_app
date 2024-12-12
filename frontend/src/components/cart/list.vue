<template>
  <v-card class="px-10 py-5 bg-grey-darken-4" rounded="xl">
    <v-table class="bg-transparent">
      <tr>
        <th>Image</th>
        <th>Title</th>
        <th>Category</th>
        <th>Price</th>

        <th>Amount</th>

        <th>Action</th>
      </tr>
      <template v-for="obj in mealsList" :key="obj.meal._id">
        <Card :meal="obj.meal" :amount="obj.amount" />
      </template>
      <tr class="text-h6">
        <td colspan="5" class="text-right">Total:&nbsp;</td>
        <td>{{ totalPrice }}₴</td>
      </tr>
    </v-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Card from "./card.vue"
export default {
  name: " CartList",
  components: {
    Card,
  },
  computed: {
    ...mapGetters("cart", ["mealsList", "totalPrice"]),
  },
  methods: {
    ...mapActions("cart", ["loadList"]),
  },
  async mounted() {
    console.log(1)

    await this.loadList()
  },
}
</script>

<style lang="scss" scoped>
.v-table > * {
  border-radius: 0;
}
</style>
