import axios from "axios"
import apiEndpoints from "@/api/apiEndpoints.js"
import FormDataHelper from "@/utils/FormDataHelper.js"

export default {
  namespaced: true,
  state: {
    currentProducts: [],
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
      return state.currentProducts
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
    setCurrentPage(state, pageNum) {
      state.currentPage = pageNum
    },
    setLoading(state, status) {
      state.isLoading = status
    },
    setProductList(state, payload) {
      state.currentProducts = payload.items
    },
    pushProducts(state, payload) {
      state.currentProducts.push(...payload.items)
      state.totalProductsNumber = payload.totalItems
      state.productsPerPage = payload.perPage
      state.currentPage = payload.currentPage
    },

    addProduct(state, payload) {
      state.productList.push(payload.product)
    },
    updateProduct(state, payload) {
      const productIndex = state.currentProducts.findIndex(
        (el) => el._id === payload.productId
      )
      if (productIndex === -1) return
      let product = state.currentProducts[productIndex]
      product = { ...product, ...payload.newData }
      state.currentProducts.splice(productIndex, 1, product)
    },
    deleteProduct(state, id) {
      state.currentProducts = state.currentProducts.filter(
        (el) => el._id !== id
      )
    },
  },
  actions: {
    setCurrentPage({ commit }, value) {
      commit("setCurrentPage", parseInt(value))
    },
    setProductList({ commit }, list) {
      commit("setProductList", { items: list })
    },
    async loadList({ commit }, payload = {}) {
      try {
        commit("setLoading", true)

        const response = await axios.get(apiEndpoints.products.getAll, {
          params: {
            ...payload,
          },
        })
        const resData = response.data
        console.log(resData)

        commit("pushProducts", resData.data)
      } catch (error) {
        console.log(error)
        throw error
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
