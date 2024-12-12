<template>
  <MainMasterPage background="/menu-bg.png">
    <div class="my-15">
      <CartList />
    </div>
  </MainMasterPage>
</template>

<script>
import MainMasterPage from "@/layouts/MainMasterPage.vue"
import CartList from "@/components/cart/list.vue"
export default {
  name: "CartPage",
  components: {
    MainMasterPage,
    CartList,
  },
}
</script>

<style lang="scss" scoped></style>
