import { createApp } from "vue"
import store from "@/store/index.js"

//Icons
import "@mdi/font/css/materialdesignicons.css"
import "@fortawesome/fontawesome-free/css/all.css"
import { aliases as faAliases, fa } from "vuetify/iconsets/fa"
import { aliases as mdiAliases, mdi } from "vuetify/iconsets/mdi"

//Router
import router from "@/router/index.js"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

// Components
import App from "./App.vue"

const myDarkTheme = {
  dark: true,
  colors: {
    error: "#B00020",
  },
}

const vuetify = createVuetify({
  components,
  directives,
  // theme: {
  //   defaultTheme: "myDarkTheme",
  //   themes: {
  //     myDarkTheme,
  //   },
  // },
  icons: {
    defaultSet: "fa",
    aliases: {
      ...mdiAliases,
      ...faAliases,
    },
    sets: {
      mdi,
      fa,
    },
  },
})

createApp(App).use(vuetify).use(router).use(store).mount("#app")
