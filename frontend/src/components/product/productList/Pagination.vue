<template>
  <v-pagination
    :length="totalPages"
    size="large"
    color="grey-darken-4"
    elevation="24"
    variant="elevated"
    rounded="4"
    v-model="currentPage"
    @update:model-value="
      $emit('pagination-changed', { page: currentPage - 1, perPage })
    "
  ></v-pagination>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Pagination",
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: (parseInt(this.$route.query.page) || 0) + 1,
      perPage: parseInt(this.$route.query.perPage) || 3,
    }
  },
  computed: {
    ...mapGetters("pagination", ["startPage", "itemsPerPage"]),
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage)
    },
  },
  watch: {
    "$route.query.page": function (newPage) {
      this.currentPage = (parseInt(newPage) || this.startPage) + 1
    },
    "$route.query.perPage": function (newPerPage) {
      this.perPage = parseInt(newPerPage) || this.itemsPerPage
    },
  },
}
</script>

<style lang="scss" scoped></style>
