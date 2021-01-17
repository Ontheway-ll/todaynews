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
    Vue.prototype.$sleep = sleep
  }
}
// 封装一个休眠函数,返回一个promise,默认是500，如果有传入的时间值就用传入的，
function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    // 肯定成功执行，有一个延迟
    setTimeout(() => resolve(), time)
  })
}
