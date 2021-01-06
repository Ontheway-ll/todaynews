// 处理权限问题，导航守卫
import router from '@/router'// 引入路由实例
import store from '@/store'// 引入，在这里获取token，vuex
// 前置守卫,每当路由发生变化，前置守卫就会执行,next必须执行的函数
router.beforeEach(function (to, from, next) {
// 根据请求地址，和你的token
  if (to.path.startsWith('/user') && !store.state.user.token) {
    // 没有token，以user开头
    next({
      // next也可以放对象
      path: '/login',
      query: { // query参数,redirectUrl和request.js一致
        // fullPath会带？后面的参数，是一个完整的路径
        redirectUrl: to.fullPath
      }
    })
  } else {
    //   如果不是以user开头放过，还有就是以user开头有token也放过
    next()
  }
})
