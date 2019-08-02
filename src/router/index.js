import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'

import Welcome from '@/views/welcome'
Vue.use(VueRouter)
const router = new VueRouter({
  // 路由规则配置
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/welcome', name: 'welcome', component: Welcome }
  ]
})
export default router
