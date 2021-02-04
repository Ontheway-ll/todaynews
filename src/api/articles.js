// 处理文章模块
import request from '@/utils/request'
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: {
      with_top: 1, ...params// 因为1是固定的，不能置顶实际合并数据，把1合并到paramszhong ,只能放到前面，放到后面不行，只是1了，
    }
  })
}
// 封装不感兴趣的文章接口
export function unlikeArticle (data) {
  return request({
    url: '/article/dislikes',
    method: 'post',
    data// body参数位于data
  })
}
// 封装举报文章
export function reportArticles (data) {
  return request({
    url: '/article/reports',
    data,
    method: 'post'
  })
}
