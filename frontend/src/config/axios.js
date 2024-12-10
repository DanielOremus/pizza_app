import axios from "axios"

const axiosPrivate = axios.create()

axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt_token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

const axiosPublic = axios.create()

export { axiosPrivate, axiosPublic }
