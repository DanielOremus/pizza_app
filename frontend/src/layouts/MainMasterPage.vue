<template>
  <div class="main-layout d-flex flex-column">
    <header>
      <Header></Header>
    </header>
    <main class="flex-grow-1">
      <slot />
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
import Header from "@/components/sections/Header.vue"
import Footer from "@/components/sections/Footer.vue"
export default {
  name: "MainMasterPage",
  components: {
    Header,
    Footer,
  },
}
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: 100vh;
}
* {
  box-sizing: border-box;
}
</style>
