<template>
  <nav>
    <v-container class="bg-grey-darken-4 mx-0 py-5" fluid>
      <v-row class="text-center justify-center align-center">
        <v-col cols="3" class="text-h3 py-1">
          <span
            class="cursor-pointer main-title"
            @click="$router.push({ name: 'HomePage' })"
          >
            Charlestown
          </span>
        </v-col>
        <v-col cols="6">
          <div class="header d-flex justify-center ga-13 text-h5">
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
                'active-link': isActiveRoute('MenuPageScroll'),
                'cursor-pointer': true,
              }"
              @click="$router.push({ name: 'MenuPageScroll' })"
              >Menu (Scroll)</span
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
        <v-col cols="3">
          <v-btn
            v-if="!isAuthenticated"
            size="large"
            class="px-10 py-3 fill-height guest-btn"
            rounded="xl"
            @click="onBecomeGuest"
          >
            <span class="text-center"> Become our guest </span>
          </v-btn>
          <div
            v-else
            class="d-flex profile-section align-center justify-center ga-5"
          >
            <span class="text-h5 cursor-pointer">{{ userFullName }}</span>
            <v-hover v-slot:default="{ isHovering }">
              <v-icon
                class="logout-icon"
                icon="fas fa-right-from-bracket"
                size="x-large"
                @click="onLogout"
              ></v-icon>
            </v-hover>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Header",
  computed: {
    ...mapGetters("user", ["isAuthenticated", "userFullName"]),
    activeRouteName() {
      return this.$route.name
    },
  },
  methods: {
    ...mapActions("user", ["loadUserData", "logout"]),
    isActiveRoute(routeName) {
      return this.activeRouteName === routeName
    },
    onLogout() {
      this.logout()
      this.$router.push({ name: "LoginPage" })
    },
    onBecomeGuest() {
      this.$router.push({ name: "LoginPage" })
    },
  },
  mounted() {
    this.loadUserData({ isShort: true })
  },
}
</script>
<style lang="scss" scoped>
.v-col > div > *:not(.v-icon),
.v-col > span {
  font-family: $arima;
}
.guest-btn {
  // background: linear-gradient(
  //   90deg,
  //   rgba(251, 91, 0, 1) 0%,
  //   rgb(255, 238, 0) 88%
  // );

  font-family: $arima;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25rem;
  text-transform: none;
}
.profile-section {
  min-height: 44px;
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
  box-shadow: 0 10px 15px 1px rgba(0, 0, 0, 0.704);
}

.active-link {
  color: $amber;
}
.logout-icon {
  color: rgb(171, 0, 0);
  transition: all 0.2s ease;
  &:hover {
    color: rgb(106, 0, 0);
    transform: translateX(3px);
  }
}
</style>
