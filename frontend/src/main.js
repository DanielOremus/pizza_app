import { createApp } from "vue"
import store from "@/store/index.js"

//Icons
import "@fortawesome/fontawesome-free/css/all.css"
import { aliases, fa } from "vuetify/iconsets/fa4"

//Router
import router from "@/router/index.js"

// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

// Components
import App from "./App.vue"

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
})

createApp(App).use(vuetify).use(router).use(store).mount("#app")
