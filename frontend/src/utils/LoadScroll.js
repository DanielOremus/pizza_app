import axios from "axios"

class LoadScroll {
  constructor(baseUrl, perPage, containerSelector) {
    this.baseUrl = baseUrl
    this.perPage = perPage
    this.currentPage = 0
    this.container = document.querySelector(containerSelector)
  }
  async init() {
    try {
    } catch (error) {}
  }

  async loadList() {
    try {
      const response = await axios.get(this.baseUrl, {
        params: { page: this.page, perPage: this.perPage },
      })
      const resData = response.data
    } catch (error) {
      console.log(err)
    }
  }
}
