import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 俺需要加载配置路由
const Layout = () => import('@/views/layout')// 安需要引入一级路由layout
const home = () => import('@/views/home')// 安需要引入二级路由home
const question = () => import('@/views/question')// 安需要引入二级路由question
const video = () => import('@/views/video')// 安需要引入二级路由home
const user = () => import('@/views/user')// 安需要引入二级路由home
const chat = () => import('@/views/user/chat')
const profile = () => import('@/views/user/profile')
const login = () => import('@/views/login')
const search = () => import('@/views/search')
const searchresult = () => import('@/views/search/result')
const article = () => import('@/views/article')

const routes = [
  {
    path: '/',
    component: Layout, // 布局组件，一级路由
    children: [{
      path: '', // 什么都不写默认是二级路由的默认组件
      component: home
    },
    {
      path: '/question',
      component: question
    },
    {
      path: '/video',
      component: video
    },
    {
      path: '/user',
      component: user
    }]
  },
  {
    path: '/user/chat', // 小智铜须一级路由
    component: chat
  },
  {
    path: '/user/profile', // 编辑资料一级路由
    component: profile
  },
  {
    path: '/login', // 登录一级路由
    component: login
  },
  {
    path: '/search', // 搜索一级路由
    component: search
  },
  {
    path: '/search/result', // 搜索结果一级路由
    component: searchresult
  },
  {
    path: '/article', // 文章详情一级路由
    component: article
  }
]

const router = new VueRouter({
  routes
})

export default router
