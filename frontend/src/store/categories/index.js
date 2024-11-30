import axios from "axios"
import apiEndpoints from "@/api/apiEndpoints.js"
export default {
  namespaced: true,
  state: {
    categoryList: [],
    isLoading: false,
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },

    categoryList(state) {
      return state.categoryList
    },
  },
  mutations: {
    setLoading(state, status) {
      state.isLoading = status
    },
    setCategoryList(state, list) {
      state.categoryList = list
    },
  },
  actions: {
    async loadList({ commit }) {
      try {
        commit("setLoading", true)
        const response = await axios.get(apiEndpoints.categories.getAll)
        const resData = response.data
        console.log(resData)

        commit("setCategoryList", resData.data)
      } catch (error) {
        console.log(error)
      } finally {
        commit("setLoading", false)
      }
    },
  },
}
