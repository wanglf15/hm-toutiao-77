// 配置axios的默认配置项
import axios from 'axios'
import store from '@/store'
// 配置基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 配置每次请求携带的token信息
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 请求拦截器
axios.interceptors.request.use((config) => {
  // 修改config
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  // 错误处理
  return Promise.reject(error)
})
axios.interceptors.response.use((res) => {
  // 成功的时候
  return res
}, (err) => {
  if (err.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(err)
})
// 导出配置项
export default axios
