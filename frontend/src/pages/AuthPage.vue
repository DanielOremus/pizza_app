<template>
  <MainMasterPage>
    <router-view></router-view>
  </MainMasterPage>
</template>

<script>
import MainMasterPage from "@/layouts/MainMasterPage.vue"
// import LoginForm from "@/components/auth/Login.vue"
export default {
  name: "AuthPage",
  components: {
    MainMasterPage,
  },
}
</script>

<style lang="scss" scoped></style>
