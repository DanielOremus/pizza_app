import { axiosPrivate } from "../../config/axios"
import apiEndpoints from "@/api/apiEndpoints.js"

export default {
  namespaced: true,
  state: {
    mealsList: [],
    isLoading: false,
  },
  getters: {
    mealsList(state) {
      return state.mealsList
    },
    isLoading(state) {
      return state.isLoading
    },
    totalPrice(state) {
      return state.mealsList.reduce(
        (acc, item) => acc + item.meal.price * item.amount,
        0
      )
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload.status
    },
    setMealsList(state, payload) {
      state.mealsList = payload.list
    },
    // addMeal(state, payload) {
    //   const { mealId } = payload
    //   const mealIndex = state.mealsList.findIndex(
    //     (obj) => obj.meal._id === mealId.toString()
    //   )
    //   if (mealIndex > -1) {
    //     state.mealsList[mealIndex].amount += 1
    //   } else {
    //     state.mealsList.push({ meal: mealId, amount: 1 })
    //   }
    // },
    deleteMeal(state, payload) {
      const { mealId } = payload
      state.mealsList = state.mealsList.filter(
        (obj) => obj.meal._id !== mealId.toString()
      )
    },
    updateAmount(state, payload) {
      const { mealId, amount } = payload
      const mealIndex = state.mealsList.findIndex(
        (obj) => obj.meal._id === mealId.toString()
      )
      if (mealIndex > -1) state.mealsList[mealIndex].amount = amount
    },
  },
  actions: {
    async loadList({ commit }) {
      try {
        commit("setLoading", { status: true })
        const response = await axiosPrivate.get(
          apiEndpoints.cart.getCartDetails
        )
        const resData = response.data

        if (!resData.success) {
          console.log(resData?.msg)
          console.log(resData?.errors)
          return
        }
        const list = resData.data.cartDetails.mealsList

        commit("setMealsList", { list })
      } catch (error) {
        console.log(error)
      } finally {
        commit("setLoading", { status: false })
      }
    },

    async addMealToCart({ commit }, mealId) {
      try {
        commit("setLoading", { status: true })
        const response = await axiosPrivate.post(
          apiEndpoints.cart.addMealToCart,
          { mealId }
        )
        const resData = response.data

        if (!resData.success) {
          console.log(resData?.msg)
          console.log(resData?.errors)
          return
        }

        const list = resData.data.cartDetails.mealsList

        commit("setMealsList", { list })
      } catch (error) {
        console.log(error)
      } finally {
        commit("setLoading", { status: false })
      }
    },
    async deleteMealFromCart({ commit }, mealId) {
      try {
        const response = await axiosPrivate.delete(
          apiEndpoints.cart.deleteMealFromCart,
          { data: { mealId } }
        )
        const resData = response.data

        if (!resData.success) {
          console.log(resData?.msg)
          console.log(resData?.errors)
          return
        }
        commit("deleteMeal", { mealId })
      } catch (error) {
        console.log(error)
      }
    },
    async updateMealAmount({ commit }, payload) {
      const { mealId, amount } = payload
      console.log(mealId)

      try {
        const response = await axiosPrivate.put(
          apiEndpoints.cart.updateMealAmount,
          { mealId, amount }
        )
        const resData = response.data

        if (!resData.success) {
          console.log(resData?.msg)
          console.log(resData?.errors)
          return
        }
        commit("updateAmount", { mealId, amount })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
