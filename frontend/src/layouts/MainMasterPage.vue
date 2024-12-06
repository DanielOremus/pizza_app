<template>
  <div class="main-layout d-flex flex-column">
    <header class="position-sticky top-0">
      <Header></Header>
    </header>
    <main class="flex-grow-1 d-flex">
      <div
        class="background flex-grow-1 min-h-100 d-flex flex-column align-center justify-center"
        :style="{ backgroundImage: `url(${background})` }"
      >
        <slot />
      </div>
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
  props: {
    background: {
      type: String,
      default: "/main-bg.jpg",
    },
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
.background {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}
header {
  z-index: 10;
}
</style>
