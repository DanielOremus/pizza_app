<template>
  <v-pagination
    :length="totalPagesNumber"
    size="large"
    color="grey-darken-4"
    elevation="24"
    variant="elevated"
    rounded="4"
    :model-value="currentPage + 1"
    @update:model-value="emitChangeEvent"
  ></v-pagination>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    totalItemsNumber: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPagesNumber() {
      return Math.ceil(this.totalItemsNumber / this.itemsPerPage)
    },
  },
  methods: {
    emitChangeEvent(newPageNumber) {
      this.$emit("pagination-changed", newPageNumber - 1, this.itemsPerPage)
    },
  },
}
</script>

<style lang="scss" scoped></style>
