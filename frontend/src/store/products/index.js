import axios from "axios"
import apiEndpoints from "@/api/apiEndpoints.js"
import FormDataHelper from "@/utils/FormDataHelper.js"

export default {
  namespaced: true,
  state: {
    productList: [],
    isLoading: false,
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    // getById: (state) => (id) => {
    //   return state.productList.find((el) => el._id === id)
    // },
    productList(state) {
      return state.productList
    },
  },
  mutations: {
    setLoading(state, status) {
      state.isLoading = status
    },
    setProductList(state, products) {
      state.productList = products
    },
    addProduct(state, payload) {
      state.productList.push(payload.product)
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
    deleteProduct(state, id) {
      state.productList = state.productList.filter((el) => el._id !== id)
    },
  },
  actions: {
    async loadList({ commit }) {
      try {
        commit("setLoading", true)
        const response = await axios.get(apiEndpoints.products.getAll)
        const resData = response.data

        commit("setProductList", resData.data)
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
