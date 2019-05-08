import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/bjsj', component: ()=>import('../page/bjsj.vue')},
      {
      	path:'/sjsj',
      	component:()=>import('../page/sjsj.vue')
      }
    ]
  })
}
