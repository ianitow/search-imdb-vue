export default {
  state: {
    movieimdb: ''
  },
  mutations: {
    updateNameInStore (state, value) {
      this.movieimdb = value
    }
  }
}
