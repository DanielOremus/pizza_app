import { createStore } from "vuex"
import products from "./products/index.js"
import categories from "./categories/index.js"
import productsScroll from "./products/scroll.js"
// import reviews from "./reviews/index.js"

const store = createStore({
  modules: {
    products,
    categories,
    productsScroll,
    // reviews,
  },
})

export default store
