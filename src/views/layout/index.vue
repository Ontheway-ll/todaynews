<template>
  <div class="container">
    <!-- 当页面地址/user是我的时候需要隐藏导航条 -->
    <!-- @可以跟一个简单的逻辑 -->
    <van-nav-bar title="今日新闻" right-text="搜索" @click-right="$router.push('/search')" fixed v-if="$route.path!=='/user'" />
      <!-- 二级路由容器 -->
      <!-- 判断当前地址如果是user给一个notop 样式 -->
  <div class="my-wrapper" :class="{noTop:$route.path=='/user'}" >
      <router-view> </router-view>
  </div>
  <!-- b标签栏组件 route开启路由模式-->
   <van-tabbar route >
      <!-- van-tabber-item相当于 router-link  to  -->
      <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {

  }
}
</script>

<style lang="less" scoped >
.container {
  width: 100%;
  height: 100%;
  position: relative;
  // 二级路由容器的高和宽
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }
}
</style>
