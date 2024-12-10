import { createStore } from "vuex"
import products from "./products/index.js"
import categories from "./categories/index.js"
import productsScroll from "./products/scroll.js"
import user from "./user/index.js"
// import reviews from "./reviews/index.js"

const store = createStore({
  modules: {
    products,
    categories,
    productsScroll,
    // reviews,
    user,
  },
})

export default store
