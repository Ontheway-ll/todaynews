import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'// 引入vuex的实例对象store，相当于组件的this.$store
import router from '@/router'// 引入router对象
// axios.defaults是对axios原有基础上改造,在默认值进行修改
// axios.create()//相当于new了一个新的axios实例
// 相当于创建了一个新的axios实例
const instance = axios.create({
  // 构造参数，和defaults一样可以传入一些配置
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  // transformRespone是一个数组，此函数是后台响应回来，还没进入到axios响应拦截器里执行，数组里可以写多个处理函数
  transformResponse: [function (data) {
    //   data就是后端请求回来的字符串
    // 原来是用JSON.pase处理从后台请求回来的字符串变成对象,如果data为空变成{},return把结果返回
    return data ? JSONBig.parse(data) : {}
  }]
})
// -----------------------------------------------------------------------------------------
// token的注入，在请求之前注入，也就是请求拦截器
// 原来是axios.interceptors.request.use(),这是对axios默认进行设置，现在是创建了一个新的axios，就是instance
// 里面有两个参数,一个成功一个失败
instance.interceptors.request.use(function (config) {
  // 成功的时候读取配置信息，注入token,headers.Authorization是接口文档的headers下的authorization，里面是token
  //   if (store.state.user.token) {
  //     config.headers.Authorization = `Bearer ${store.state.user.token}`
  //   }
  //   第二种写法
  //    如果config.headers.Authorization 有值才会执行后面的
  config.headers.Authorization && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config// 返回配置   // 将token统一注入到heardes
}, function (error) {
  return Promise.reject(error)// 返回一个错误，直接返回promise的错误，会直接进入到axios的.catch中
})
// -----============================================================================================================
// 响应拦截器，处理返回的数据，解构data,axios默认有一层data包裹，接口里有一层data
instance.interceptors.response.use(function (response) {
  try {
    return response.data.data
  } catch (error) {
    return response.data// 如果没有data就返回一层
  }
}, async function (error) {
  // 如果请求失败或者，或token过期，只要是401，token失效，因为有导航前置守卫，不会有没有token的情况，直接返回失败
  /** error配置里的三个参数
       * config,就是请求拦截器里的config配置参数
       * request请求对象
       * response响应对象，status（状态码）
       */
  if (error.response && error.response.status === 401) {
    const path = {
      path: '/login',
      // 参数，动态路由传参，query传参，query可以是一个对象，？也是可以
      query: {
        redirectUrl: router.currentRoute.fullPath// 表示登录页需要跳转的地址
      }
    }
    // refresh_token相当于一个救命药
    if (store.state.user.refresh_token) {
      try {
        // 如果有续命的药，如果有refreshtoken，换取新的token，调用刷新token接口
        //   发请求用axios还是instance，因为instance的token已经失效，也注入到headers中，需要用没有拦截器axios发请求
        const result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations', // 完整的地址
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`// 请求头中注入refreshtoken
          }
        })

        //   如果执行成功，await后面就是promise执行成功的逻辑
        //    如果成功更新失效的token，更新vuex的数据
        store.commit('updateUser', {
          //   载荷数据
          user: {
            token: result.data.data.token, // 新token
            refresh_token: store.state.user.refresh_token// 原来的refreshtoken，14天过期
          }
        })// 提交mutaitions,更新vuex数据，传入载荷，对象
        // 把之前的错误发送出去，执行之前出现错误的请求
        return instance(error.config)// return是执行这个请求执行链下面的代码
      } catch (error) {
        //   如果续命失败，token和refreshtoken都失效，十四天过期,删除token
        store.commit('delUser')
        router.push(path)
      }
    } else { // 如果没有refreshtoken直接死亡，跳到登录
      // 如果refreshtoken失效，跳转登录页，但是登录之后不一定能回到当前页面
      // 在跳到登录页过程中把当前页面的地址传给登录页，登录成功之后判断有没有地址，如果有跳到地址页，没有就跳到登录页
      //   router.push('/login')
      //   router.currentRoute当前路由信息对象，里面包含了路由地址和参数
      // 我们需要获取带参数的路由地址，router.currentRoute.fullPath,,push里面可以放对象,
      store.commit('delUser')// token失效删除
      router.push(path)
    }
  }
  return Promise.reject(error)
})
export default instance
