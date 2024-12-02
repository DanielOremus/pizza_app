<template>
  <v-container class="query-panel py-6">
    <v-card color="grey-darken-4 pa-5 h-100" rounded="xl">
      <v-row>
        <v-col>
          <v-text-field
            name="title"
            label="I'm searching..."
            variant="outlined"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn color="blue-darken-4" class="w-100 font-weight-bold"
            >Apply Filters</v-btn
          >
        </v-col>
        <v-col cols="12">
          <v-btn color="orange-accent-4" class="w-100 font-weight-bold"
            >Clear Filters</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
