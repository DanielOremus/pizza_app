<template>
  <nav>
    <v-container class="bg-grey-darken-4 mx-0 py-5" fluid>
      <v-row class="text-center align-center">
        <v-col class="text-h3 py-0">
          <span
            class="cursor-pointer main-title"
            @click="$router.push({ name: 'HomePage' })"
          >
            Charlestown
          </span>
        </v-col>
        <v-col cols="6">
          <div class="header d-flex ga-16 justify-center text-h5">
            <span
              :class="{
                'active-link': isActiveRoute('HomePage'),
                'cursor-pointer': true,
              }"
              @click="$router.push({ name: 'HomePage' })"
              >Home</span
            >

            <span
              :class="{
                'active-link': isActiveRoute('MenuPage'),
                'cursor-pointer': true,
              }"
              @click="$router.push({ name: 'MenuPage' })"
              >Menu</span
            >
            <span
              :class="{
                'active-link': isActiveRoute('AboutPage'),
                'cursor-pointer': true,
              }"
              @click="$router.push({ name: 'AboutPage' })"
              >About Us</span
            >
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
  computed: {
    activeRouteName() {
      return this.$route.name
    },
  },
  methods: {
    isActiveRoute(routeName) {
      return this.activeRouteName === routeName
    },
  },
}
</script>
<style lang="scss" scoped>
.v-col > div > *,
.v-col > span {
  font-family: $arima;
}
.main-title {
  font-weight: 700;
  line-height: 0;
  background: linear-gradient(
    90deg,
    rgba(251, 91, 0, 1) 0%,
    rgba(236, 221, 0, 1) 88%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header > span {
  transition: color 0.1s ease;
  &:hover {
    color: $amber;
  }
}
nav > .v-container {
  box-shadow: 0 10px 15px 2px rgba(0, 0, 0, 0.704);
}
.active-link {
  color: $amber;
}
</style>
