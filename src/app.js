import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import CreateAPI from 'vue-create-api'
Vue.use(CreateAPI)

import changeName from './components/changeName.vue'
import add from './components/add.vue'
import filter from './components/fiter.vue'
import poperDetail from './components/poperDetail.vue'
Vue.createAPI(changeName,true)
Vue.createAPI(add,true)
Vue.createAPI(filter,true)
Vue.createAPI(poperDetail,true)


export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);
  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    mounted(){},
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
