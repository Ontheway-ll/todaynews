// 专门处理token的读写和删除
const USER_TOKEN = 'tadaynews'// 专门用来存储用户的信息
// 设置用户的token信息
export function setUser (user) {
  // user是一个对象，要把对象转化成字符串
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 读取用户的token
export function getUser () {
  // 读取，然后转化成对象，然后返回,如果token存在用token，如果为空可能报错
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')// 短路表达式
//   如果前面为true后面不执行，如果为false后面执行
}
// 删除用户的token
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
