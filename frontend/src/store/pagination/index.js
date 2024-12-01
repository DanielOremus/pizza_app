export default {
  namespaced: true,
  state: {
    itemsPerPage: 3,
    startPage: 0,
  },
  getters: {
    startPage(state) {
      return state.startPage
    },
    itemsPerPage(state) {
      return state.itemsPerPage
    },
  },
}
