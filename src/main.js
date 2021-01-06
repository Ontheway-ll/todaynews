import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'
import Vant from 'vant'// 引入vant组件库
import 'vant/lib/index.css'// 引入vant的样式
import 'amfe-flexible'
// import { Button } from 'vant' 在项目优化的时候可以这样按需引入，需要哪个组件用哪个
// Vue.use(Button)
import '@/styles/index.less' // 引用自定义的全局样式，覆盖vant样式
Vue.config.productionTip = false
Vue.use(Vant)// 全局注册vant组件，一旦注册全局使用，相当于调用了vant的install方法
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
