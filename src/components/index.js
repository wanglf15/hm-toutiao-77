// 导入要封装的组件
import Mybread from '@/components/my-bread'
// import MyTest from '@/components/my-test'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'
// 暴露一个对象
export default {
  install (Vue) {
    Vue.component('Bread', Mybread)
    // Vue.component('Test', MyTest)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
  }
}
