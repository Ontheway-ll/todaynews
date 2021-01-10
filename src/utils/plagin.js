// 封装一些小的函数和过滤器等
// 在main.j注册引入
// 导出一个默认对象
export default {
  install (Vue) {
    // vue.use()会调用install方法
    // 执行这个代码时vue.prototype.$notify已经挂载完成
    Vue.prototype.$llnotify = (params) => {
      Vue.prototype.$notify({ duration: 800, ...params })
    }
  }
}
