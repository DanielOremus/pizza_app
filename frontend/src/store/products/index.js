import axios from "axios"
import apiEndPoints from "@/../apiEndPoints/index.js"
export default {
  namespaced: true,
  state: {
    productList: [],
  },
  getters: {
    productList(state) {
      return state.productList
    },
    getProductById(state, id) {
      return state.productList.find((el) => el._id === id)
    },
  },
  mutations: {
    setProductList(state, products) {
      state.productList = products
    },
    addProduct(state, payload) {
      state.push(payload.product)
    },
    updateProduct(state, payload) {
      const productIndex = state.productList.findIndex(
        (el) => el._id === payload.productId
      )
      if (productIndex === -1) return
      let product = state.productList[productIndex]
      product = { ...product, ...payload.newData }
      state.productList.splice(productIndex, 1, product)
    },
    deleteProduct(state, payload) {
      state.productList = state.productList.filter(
        (el) => el._id !== payload.productId
      )
    },
  },
  actions: {
    async loadList({ commit }) {
      try {
        const response = await axios.get(apiEndPoints.products.getAll)
        commit("setProductList", response.data)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
