import { axiosPublic, axiosPrivate } from "@/config/axios.js"
import { jwtDecode } from "jwt-decode"
import apiEndpoints from "@/api/apiEndpoints.js"
import ErrorParser from "@/utils/ErrorParser.js"
export default {
  namespaced: true,
  state: {
    fullName: null,
    role: null,
  },
  getters: {
    userShortInfo(state) {
      const user = JSON.parse(localStorage.getItem("user"))
      const fullName = state.fullName || user?.fullName
      const role = state.role || user?.role
      return { fullName, role }
    },
    userPermissions(state) {
      return state.role?.permissions
    },
    userFullName(state) {
      return state.fullName
    },
    isAuthenticated() {
      return Boolean(localStorage.getItem("jwt_token"))
    },
  },
  mutations: {
    setUserData(state, payload) {
      console.log(payload)

      const { fullName, role } = payload
      state.fullName = fullName
      state.role = role

      if (role && fullName)
        localStorage.setItem("user", JSON.stringify({ fullName, role }))
    },
  },
  actions: {
    async loadUserData({ commit, getters, dispatch }, payload) {
      const { fullName, role } = getters.userShortInfo

      if (fullName && role) {
        commit("setUserData", { fullName, role })
        return
      }
      const token = localStorage.getItem("jwt_token")
      if (!token) return
      try {
        const decoded = jwtDecode(token)

        const response = await axiosPrivate.get(
          apiEndpoints.user.profile(decoded._id, payload.isShort)
        )
        const resData = response.data
        console.log(resData)

        if (!resData.success) {
          dispatch("logout")
          return console.log(resData)
        }
        commit("setUserData", resData.data.user)
      } catch (error) {
        dispatch("logout")

        console.log(error)
      }
    },
    async login({ commit, dispatch }, data) {
      try {
        const response = await axiosPublic.post(apiEndpoints.auth.login, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        const resData = response.data

        if (!resData.success) {
          console.log(resData)
          //TODO: add resErr handler
          return false
        }
        const token = resData.data.token
        localStorage.setItem("jwt_token", token)

        await dispatch("loadUserData", { token, isShort: true })
        return []
      } catch (error) {
        console.log(error)
      }
    },
    async signup({ commit, dispatch }, payload) {
      try {
        const response = await axiosPublic.post(
          apiEndpoints.auth.signup,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
            validateStatus: (status) =>
              (status >= 200 && status < 300) || status === 400,
          }
        )
        const resData = response.data

        if (!resData.success) {
          return ErrorParser.parseErrors(resData.errors)
        }

        const token = resData.data.token
        localStorage.setItem("jwt_token", token)

        await dispatch("loadUserData", { token, isShort: true })

        return []
      } catch (error) {
        console.log(error)
      }
    },
    logout({ commit }) {
      localStorage.removeItem("user")
      localStorage.removeItem("jwt_token")
      commit("setUserData", { fullName: null, role: null })
    },
  },
}
