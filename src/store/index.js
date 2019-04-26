import Vue from 'vue'
import Vuex from 'vuex'
import './server.js'
Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      activeType: null
   }
  })
}
