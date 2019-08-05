import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'

import Home from '@/views/home'
import Welcome from '@/views/welcome/index.vue'
import Content from '@/views/content/content.vue'
import Picture from '@/views/picture'
import notFound from '@/views/404'
import store from '@/store'
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
    },
    { path: '*', name: 'notfound', component: notFound }
  ]
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(store.getUser().token)
  // 判断路由是否为/login 或有没有登录成功信息
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
