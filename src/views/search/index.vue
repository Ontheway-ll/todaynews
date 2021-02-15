<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search  placeholder="请输入搜索关键词" shape="round" v-model.trim="q" />
    <van-cell-group class="suggest-box"  v-if="q" >
      <van-cell icon="search">
        <span>j</span>ava
      </van-cell>
    </van-cell-group>
    <div class="history-box" v-else >
      <!-- 有内容的时候显示历史记录 -->
      <div class="head" v-if="historyList.length">
        <span>历史记录</span>
        <van-icon name="delete"></van-icon>
      </div>
      <van-cell-group  >
        <van-cell v-for="(item,index) in historyList " :key="index" >
          <a class="word_btn">{{item}}</a>
          <!-- 删除，知道删除的那个索引 -->
          <van-icon @click="delhistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
const key = 'newlist'
export default {
  name: 'search',
  data () {
    return {
      q: '', // 搜索输入的内容
      historyList: JSON.parse(localStorage.getItem(key) || '[]')// 作为一个数据变量 接收 搜索历史记录
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
