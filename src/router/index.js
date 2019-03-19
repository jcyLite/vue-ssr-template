import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '', component: ()=>import('../page/hello.vue')},
      {
      	path:'/add',
      	component:()=>import('../page/add.vue')
      }
    ]
  })
}
