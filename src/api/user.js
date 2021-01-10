// 处理用户相关的，引入方法import{login}from
// 或者 import * as obj from ,,,调用obj.login
import request from '@/utils/request'// 引入请求模块
// request 是axios 的一个实例，和axios一样有同样的方法和属性
export function login (data) {
  return request({
    url: '/authorizations',
    method: 'post',
    data// 接收传入的data
    //   boay参数放置data中，
    // 返回一个promise对象
  })
}
