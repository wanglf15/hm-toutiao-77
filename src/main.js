import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'

import '@/style/index.less'

import MyBread from '@/components'
import axios from '@/api'
Vue.prototype.$http = axios
// 设置为开发环境或者生产环境
Vue.config.productionTip = false // 设置为开发环境
Vue.use(ElementUI)
Vue.use(MyBread)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
