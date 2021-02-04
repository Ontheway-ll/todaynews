<template>
  <div class="more-action">
    <van-cell-group v-if="!isReport">
      <!-- 查文档得知van-cell有click方法，HTML有点击事件，人家封装的，需要查文档 -->
      <!--子传父 -->
      <van-cell @click="$emit('dislike')" >不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <!-- 举报，触发自定义事件，report自定义名，传一个value代表那个类型 -->
      <van-cell @click="$emit('report',item.value)" v-for="item in reports" :key="item.value " >{{item.label}}</van-cell>

    </van-cell-group>
  </div>
</template>
<script>
import { reports } from '@/api/constants'// 引入常量变量
import eventBus from '@/utils/eventbus'

export default {
  data () {
    return {
      isReport: false, // 是否举报的意思
      reports: reports// 定义一个reports变量来源于引入的reports

    }
  },
  created () {
    eventBus.$on('delArticles', () => (this.isReport = false))// 只要你一开始删除 我就把弹层中反馈组件重置为初始状态
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
