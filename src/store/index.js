import Vue from 'vue'
import Vuex from 'vuex'
import SearchMovie from './modules/SearchMovie'
import axios from 'axios'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

Vue.use({
  install (Vue) {
    Vue.prototype.$http = axios.create({
      baseURL: 'http://www.omdbapi.com/'
    })
  }
})

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      SearchMovie
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
