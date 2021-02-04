import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'
import Vant, { Lazyload } from 'vant'// 引入vant组件库，大括号解构的方式
import 'vant/lib/index.less'// 引入vant的样式,引入less修改某些变量，原来引入的是css
import 'amfe-flexible'
import plagin from '@/utils/plagin'// 引入plagin.js,在vant后面注册
// import { Button } from 'vant' 在项目优化的时候可以这样按需引入，需要哪个组件用哪个
// Vue.use(Button)
import '@/styles/index.less' // 引用自定义的全局样式，覆盖vant样式
Vue.config.productionTip = false
Vue.use(Vant)// 全局注册vant组件，一旦注册全局使用，相当于调用了vant的install方法
Vue.use(plagin)// 全局注册组件，放在vant之后，这是plagin用vant里的内置函数，
Vue.use(Lazyload)// 注册懒加载指令，图片可以搭载这个进行懒加载
// vue.use会调用导出对象里的install方法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// export default Vant导出默认对象，
// export const lazy-load={}导出平常对象
