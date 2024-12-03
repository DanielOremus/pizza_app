<template>
  <v-container class="query-panel py-6">
    <v-card color="grey-darken-4 pa-5 h-100" rounded="xl">
      <v-text-field
        name="title"
        clearable
        label="I'm searching..."
        variant="outlined"
      ></v-text-field>
      <v-btn block color="grey-darken-1">Search</v-btn>

      <v-divider class="border-opacity-25 my-6" role="presentation"></v-divider>

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
        :min="0"
        :max="500"
        :step="1"
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

      <v-list bg-color="grey-darken-4" class="pt-0">
        <v-list-subheader class="text-body-1 text-grey-darken-1"
          >Category:</v-list-subheader
        >
        <v-list-item v-for="category in categoryItems">
          <v-checkbox
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
      priceRange: [0, 200],
      selectedCategories: [],
      sortBy: "name:asc",
      sortItems: [
        {
          title: "Title: A-Z",
          value: "name:asc",
        },
        {
          title: "Title: Z-A",
          value: "name:desc",
        },
        {
          title: "Price: from low to high",
          value: "price:asc",
        },
        {
          title: "Price: from high to low",
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
}
</script>

<style lang="scss" scoped></style>
