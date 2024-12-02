import axios from "axios"
import apiEndpoints from "@/api/apiEndpoints.js"
import FormDataHelper from "@/utils/FormDataHelper.js"

export default {
  namespaced: true,
  state: {
    currentPageProducts: [],
    isLoading: false,
    totalProductsNumber: 0,
    productsPerPage: 8,
    currentPage: 0,
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    // getById: (state) => (id) => {
    //   return state.productList.find((el) => el._id === id)
    // },
    currentProducts(state) {
      return state.currentPageProducts
    },
    currentPage(state) {
      return state.currentPage
    },
    productsPerPage(state) {
      return state.productsPerPage
    },
    totalProductsNumber(state) {
      return state.totalProductsNumber
    },
  },
  mutations: {
    setLoading(state, status) {
      state.isLoading = status
    },
    setCurrentProducts(state, payload) {
      state.currentPageProducts = payload.items
      state.totalProductsNumber = payload.totalItems
      state.productsPerPage = payload.perPage
      state.currentPage = payload.currentPage
    },
    addProduct(state, payload) {
      state.productList.push(payload.product)
    },
    updateProduct(state, payload) {
      const productIndex = state.currentPageProducts.findIndex(
        (el) => el._id === payload.productId
      )
      if (productIndex === -1) return
      let product = state.currentPageProducts[productIndex]
      product = { ...product, ...payload.newData }
      state.currentPageProducts.splice(productIndex, 1, product)
    },
    deleteProduct(state, id) {
      state.currentPageProducts = state.currentPageProducts.filter(
        (el) => el._id !== id
      )
    },
  },
  actions: {
    async loadList({ commit, getters, rootGetters }, payload = {}) {
      try {
        console.log(payload)

        commit("setLoading", true)
        const response = await axios.get(apiEndpoints.products.getAll, {
          params: {
            perPage: payload.perPage ?? rootGetters["pagination/itemsPerPage"],
            page: payload.page ?? rootGetters["pagination/startPage"],
          },
        })
        const resData = response.data
        console.log(resData)

        commit("setCurrentProducts", resData.data)
      } catch (error) {
        console.log(error)
      } finally {
        commit("setLoading", false)
      }
    },
    async loadById({ commit }, id) {
      try {
        commit("setLoading", true)
        const response = await axios.get(apiEndpoints.products.getById(id))

        const resData = response.data

        return { meal: resData.data.meal, reviews: resData.data.reviews }
      } catch (error) {
        console.log(error)
      } finally {
        commit("setLoading", false)
      }
    },
    async deleteById({ commit }, id) {
      try {
        await axios.delete(apiEndpoints.products.deleteById, { data: { id } })
        commit("deleteProduct", id)
      } catch (error) {
        console.log(error)
      }
    },
    async addProduct({ commit }, data) {
      const formData = FormDataHelper.parseToFormData(data)
      try {
        const response = await axios.post(
          apiEndpoints.products.create,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        const resData = response.data
        if (resData.success) {
          commit("addProduct", resData.data)
        } else {
          console.log(resData)
        }
      } catch (error) {
        console.log(error)
      }
    },
    async updateProduct({ commit }, data) {
      const formData = FormDataHelper.parseToFormData(data.newData)
      try {
        const response = await axios.post(
          apiEndpoints.products.updateById(data.productId),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        const resData = response.data
        if (resData.success) {
          commit("updateProduct", resData.data)
        } else {
          console.log(resData)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
