// 通过vuex解决前端持久化，专门处理vuex模块
import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '@/utils/auth.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // state专门放置共享的状态，
    // {token 和refresh_token}预设的，现在还没设置
    user: auth.getUser()// token的信息对象，，如果要做持久化，如果缓存有token读取token

  },
  mutations: {
    // 修改token只能通过mutations，修改和删除token
    // 修改token,传入state和payload载荷
    updateUser (state, payload) {
      state.user = payload.user// 定义载荷中的user给state
      // 更新vuex时候把最新数据存入缓存
      auth.setUser(payload.user)// 保持vuex和缓存同步
    },
    // 删除token,定义一个delUser方法，传入一个state，不用载荷了
    delUser (state) {
      state.user = {}// 将vuex的token设置空对象
      // 缓存数据也需要更新,直接删除本地缓存中的数据
      auth.delUser()
    }
  },
  actions: {
  },
  modules: {
  }
})
