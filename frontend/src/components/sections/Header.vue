<template>
  <nav>
    <v-container class="bg-grey-darken-4 mx-0" fluid>
      <v-row class="text-center align-center">
        <v-col class="text-h4">Charlestown</v-col>
        <v-col cols="6">
          <div class="d-flex ga-16 justify-center">
            <v-btn
              variant="text"
              :ripple="false"
              class="text-h6"
              @click="$router.push({ name: 'HomePage' })"
              >Home</v-btn
            >

            <v-btn
              variant="text"
              :ripple="false"
              class="text-h6"
              @click="$router.push({ name: 'MenuPage' })"
              >Menu</v-btn
            >
            <v-btn
              variant="text"
              :ripple="false"
              class="text-h6"
              @click="$router.push({ name: 'AboutPage' })"
              >About Us</v-btn
            >
            <v-icon
              class="cursor-pointer"
              icon="fas fa-cart-shopping"
              size="x-large"
              color="warning"
            ></v-icon>
          </div>
        </v-col>
        <v-col>
          <v-btn color="warning" size="large" class="px-10" rounded="xl">
            <span class="text-center text-h6"> Become our guest </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </nav>
</template>
<script>
export default {
  name: "Header",
}
</script>
<style scoped></style>
