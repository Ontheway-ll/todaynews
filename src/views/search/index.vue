<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <!-- 输入完点击手机的搜索按钮跳转搜索结果，van-search有一个search事件 -->
    <van-search @search="onSearch" placeholder="请输入搜索关键词" shape="round" v-model.trim="q" />
    <van-cell-group class="suggest-box"  v-if="q" >
      <!-- 点击搜索建议跳转结果页 -->
      <van-cell @click="toResult(item)" icon="search" v-for="(item,index) in suggesList" :key="index"  >
        {{item}}
      </van-cell>
    </van-cell-group>
    <div class="history-box" v-else >
      <!-- 有内容的时候显示历史记录 -->
      <div class="head" v-if="historyList.length">
        <span>历史记录</span>
        <!-- 清空历史记录 -->
        <van-icon @click="clear" name="delete"></van-icon>
      </div>
      <van-cell-group  >
        <van-cell @click="toResult(item)" v-for="(item,index) in historyList " :key="index" >
          <a class="word_btn">{{item}}</a>
          <!-- 删除，知道删除的那个索引 -->
          <!-- 阻止冒泡事件，原生的是event.stopPagenation() -->
          <van-icon @click.stop="delhistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/articles'
const key = 'newlist'
export default {
  name: 'search',
  data () {
    return {
      q: '', // 搜索输入的内容
      historyList: JSON.parse(localStorage.getItem(key) || '[]'), // 作为一个数据变量 接收 搜索历史记录
      suggesList: []// 联想搜索
    }
  },
  // 第一种
  // created () {
  //   this.historyList = JSON.parse(localStorage.getItem(key) || '[]')// 把数组转化成对象的形式
  // }
  methods: {
    delhistory (index) {
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))// 把数组转化成字符串存入
    },
    // 点击历史记录某项进入详情
    // this.$router路由实例对象
    // this.$route，当前页面路由对象信息，当前地址的params参数，query参数，fullpath
    // 路由传参，query和params
    // 从历史记录下的点击某项进入搜索结果页，直接用toRresult方法就可以
    // jumpdetail (text) {
    //   // this.$router.push('/search/result?q=' + text)// 第一种方式
    //   this.$router.push({ path: '/search/result', query: { q: text } })// 第二种方式
    // },
    async clear () {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '确定删除所有记录'
        })
        this.historyList = []
        localStorage.setItem(key, '[]')
      } catch (error) {

      }
    },
    onSearch () {
      // 跳转之前把搜索记录添加到历史记录
      // 先判断搜索结果是否为空，为空直接返回
      if (!this.q) return
      this.historyList.push(this.q)// 搜索内容放到数组同步到本地
      // this.historyList = Array.from(new Set(this.historyList)) // 去重
      this.historyList = Array.from(new Set(this.historyList))
      localStorage.setItem(key, JSON.stringify(this.historyList))
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    },
    // 搜索建议点击其中一项进入结果页
    toResult (text) {
      this.historyList.push(text)// 跳转之前先把搜索建议添加到历史记录
      this.historyList = Array.from(new Set(this.historyList)) // 数组去重
      localStorage.setItem(key, JSON.stringify(this.historyList))// 去重完然后存入本地
      this.$router.push({ path: '/search/result', query: { q: text } })// 第二种方式
    }
  },
  watch: {
    // 联想搜索监听输入内容，防抖
    q () {
      // clearTimeout(this.timer)
      // this.timer = setTimeout(async () => {
      //   // 但是需要判断当清空的时候，不能发送请求，但是把联想的建议清空
      //   if (!this.q) {
      //     this.suggesList = []
      //     return
      //   }
      //   const data = await getSuggestion({ q: this.q })
      //   this.suggesList = data.options
      // }, 500)
      // 函数的节流
      if (!this.timer) {
        setTimeout(async () => {
          this.timer = null
          if (!this.q) {
            this.suggesList = []
            return
          }
          const data = await getSuggestion({ q: this.q })
          this.suggesList = data.options
        }, 300)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
