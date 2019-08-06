// 导入要封装的组件
import Mybread from '@/components/my-bread'
import MyTest from '@/components/my-test'
// 暴露一个对象
export default {
  install (Vue) {
    Vue.component('Bread', Mybread)
    Vue.component('Test', MyTest)
  }
}
