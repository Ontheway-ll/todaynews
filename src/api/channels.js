// 处理频道相关的
import request from '@/utils/request'
// 导出我的频道数据,没有参数
export function getMyChannels () {
  return request({
    url: '/user/channels'
  })
}
