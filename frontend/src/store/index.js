import { createStore } from "vuex"
import products from "./products/index.js"
import categories from "./categories/index.js"
import pagination from "./pagination/index.js"
// import reviews from "./reviews/index.js"

const store = createStore({
  modules: {
    products,
    categories,
    pagination,
    // reviews,
  },
})

export default store
