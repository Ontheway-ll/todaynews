// 处理频道相关的
import store from '@/store'
// 游客登录
import request from '@/utils/request'
const CHANNELS_USR = 'channeluser'// 用户登录
const CHANNELS_T = 'channeltravel'
// 导出我的频道数据,没有参数
export function getMyChannels () {
  // return request({
  //   url: '/user/channels'
  // })
  // 对频道进行改造，如果是游客登录，频道数据缓存，如果是用户登录，需要缓存
  //  支持 本地化缓存  要区分当前是登录用户还是游客用户 如何登录还是游客  可以根据当前有没有token 来判断 是否是登录
  return new Promise(function (resolve, reject) {
    const key = store.state.user.token ? CHANNELS_USR : CHANNELS_T
    // 去缓存中读取数据
    const str = localStorage.getItem(key)// 通过缓存key获取缓存中的频道数据
    if (str) { // 如果缓存中有数据，/ 本地缓存有数据 应该把本地数据释放给 后面的执行结果
      resolve({ channels: JSON.parse(str) })// 这里的结构 是和 请求体中的结构一致的x`
    } else { // 如果缓存中没有数据，
      request({ url: '/user/channels' }).then(result => {
        // 获取结果后存入缓存
        localStorage.setItem(key, JSON.stringify(result.channels))
        resolve(result)// 这里表示直接 成功执行了 获取用户频道数据
      })
    }
  })
}
// 获取全部的频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
