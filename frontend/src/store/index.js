import { createStore } from "vuex"
import products from "./products/index.js"
// import reviews from "./reviews/index.js"

const store = createStore({
  modules: {
    products,
    // reviews,
  },
})

export default store
