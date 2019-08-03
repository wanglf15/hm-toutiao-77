import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'

import Home from '@/views/home'
import Welcome from '@/views/welcome/index.vue'
import Content from '@/views/content/content.vue'
import Picture from '@/views/picture'
Vue.use(VueRouter)
const router = new VueRouter({
  // 路由规则配置
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/content', name: 'content', component: Content },
        { path: '/picture', name: 'picture', component: Picture }
      ]
    }

  ]
})
export default router
