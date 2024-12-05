<template>
  <v-container class="query-panel py-10 position-sticky">
    <v-card color="grey-darken-4 pa-5" rounded="xl">
      <v-text-field
        clearable
        ref="titleField"
        label="I'm searching..."
        variant="outlined"
        v-model="title.value"
        :rules="title.rules"
        validate-on="none"
      ></v-text-field>
      <v-btn
        block
        color="grey-darken-1 mt-1"
        class="font-weight-bold"
        @click="onSearch"
        >Search</v-btn
      >

      <v-divider class="border-opacity-25 my-6"></v-divider>

      <v-select
        :items="sortItems"
        item-title="title"
        item-value="value"
        v-model="sortBy"
        label="Sort"
        variant="outlined"
      ></v-select>

      <v-range-slider
        strict
        class="mx-0"
        :min="slider.min"
        :max="slider.max"
        :step="slider.step"
        color="grey-darken-1"
        v-model="priceRange"
      >
        <template v-slot:prepend>
          <v-text-field
            v-model="priceRange[0]"
            variant="outlined"
            width="70"
            density="compact"
            hide-details
            single-line
          ></v-text-field>
        </template>
        <template v-slot:append>
          <v-text-field
            v-model="priceRange[1]"
            variant="outlined"
            width="70"
            density="compact"
            hide-details
            single-line
          ></v-text-field>
        </template>
      </v-range-slider>

      <v-list
        class="pt-0 bg-grey-darken-4 mb-6"
        rounded="lg"
        border="surface-light opacity-50 sm"
      >
        <v-list-subheader
          class="text-body-1 font-weight-bold text-grey-lighten-1"
          >Category:</v-list-subheader
        >
        <v-list-item
          variant="text"
          density="compact"
          v-for="category in categoryItems"
        >
          <v-checkbox
            density="comfortable"
            hide-details
            :label="category.title"
            v-model="selectedCategories"
            :value="category._id"
          ></v-checkbox>
        </v-list-item>
      </v-list>
      <v-row>
        <v-col cols="12">
          <v-btn color="blue-darken-4" block class="font-weight-bold"
            >Apply Filters</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn color="orange-accent-4" block class="font-weight-bold"
            >Clear Filters</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "QueryPanel",
  data() {
    return {
      slider: {
        min: 0,
        max: 5000,
        step: 50,
      },
      priceRange: [],
      title: {
        value: null,
        rules: [
          (value) => {
            if (!value || !value.length) return "Title is required"
            return true
          },
        ],
      },
      selectedCategories: [],
      sortBy: "name:asc",
      sortItems: [
        {
          title: "Title: A - Z",
          value: "name:asc",
        },
        {
          title: "Title: Z - A",
          value: "name:desc",
        },
        {
          title: "Price: Low - High",
          value: "price:asc",
        },
        {
          title: "Price: High - Low",
          value: "price:desc",
        },
      ],
    }
  },
  props: {
    categoryItems: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async onSearch() {
      const errors = await this.$refs.titleField.validate()
      console.log(errors)

      if (errors.length > 0) return

      this.$emit("panel-event", {
        title: this.title.value.trim(),
      })
    },
    onApplyFilters() {},
  },
  created() {
    this.priceRange = [this.slider.min, this.slider.max]
  },
}
</script>

<style lang="scss" scoped>
.query-panel {
  top: 70px;
}
</style>
