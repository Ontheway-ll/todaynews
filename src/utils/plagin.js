// 封装一些小的函数和过滤器等
// 在main.j注册引入
// 导出一个默认对象
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'// 引入相对时间插件
import 'dayjs/locale/zh-cn'// 引入中文包
dayjs.extend(relativeTime)// 相当于dayjs扩展了相对时间的方法，这个方法写完之后dayjs有了form方法，就是相对时间
export default {
  install (Vue) {
    // vue.use()会调用install方法
    // 执行这个代码时vue.prototype.$notify已经挂载完成
    Vue.prototype.$llnotify = (params) => {
      Vue.prototype.$notify({ duration: 800, ...params })
    }
    Vue.prototype.$sleep = sleep
    // 过滤器名称，函数,value传入一个值，必须return，必须有返回值
    // Vue.filter('relTime', function relTime (date) {
    //   return dayjs().from(date)// dayjs()是当前时间，距离传入的date的时间的相对时间，如果date替换dayjs()也可以
    // })
    Vue.filter('relTime', relTime)// 一旦注册，全局使用
  }
}
// 封装一个休眠函数,返回一个promise,默认是500，如果有传入的时间值就用传入的，
// promise就是一个对象
function sleep (time = 500) {
  return new Promise(function (resolve, reject) {
    // 肯定成功执行，有一个延迟
    setTimeout(() => resolve(), time)
  })
}
// 封装一个相对时间,传入一个date,local()本地的语言包转化
function relTime (date) {
  return dayjs().locale('zh-cn').from(date)// dayjs()是当前时间，距离传入的date的时间的相对时间，如果date替换dayjs()也可以
}
