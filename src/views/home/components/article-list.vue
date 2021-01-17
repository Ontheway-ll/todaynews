<template>
  <div class="scroll-wrapper">
    <!-- 下拉刷新 -->
    <van-pull-refresh :success-text="successtext" @refresh="onRefresh" v-model="downloading">
      <!-- van-list默认加载，自动计算距离底部的距离，自动加载，uploading变成true -->
      <van-list
        finished-text="没有了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        offset="300"
        @load="onload"
        v-model="upLoading"
        :finished="finished"
      >
        <van-cell-group>
          <!-- art_id是一个大数字的对象，key需要用字符串或者数字代替， -->
          <van-cell v-for="item in articles" :key="item.art_id.toString()">
            <!-- 三图，无图，多图 -->
            <div class="article_item">
              <h3 class="van-ellipsis">{{item.title}}</h3>
              <div class="img_box" v-if="item.cover.type===3" >
                <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <div class="img_box" v-if="item.cover.type===1" >
                <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <div class="info_box">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}评论</span>
                <span>{{item.pubdate}}</span>
                <span class="close">
                  <van-icon name="cross"></van-icon>
                </span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
export default {
  data () {
    return {
      downloading: false, // 下拉刷新
      upLoading: false, // 上拉加载
      finished: false,
      articles: [],
      successtext: '',
      error: false,
      timestamp: null // 时间戳，定义时间戳对象，存储历史时间戳
    }
  },
  // props: ['channel_id'], //字符串数组的接收方式，比较简单，第一种
  props: {
    // key（props属性名）value(对象，配置)
    channel_id: {
      required: true, // 必填项，必须传值
      type: Number, // 传入props属性的类型,不对default约束
      default: null // 默认，加入你没有传入值，就用默认值,,props里的值
    }
  },
  methods: {
    // 下拉刷新
    async onRefresh () {
      await this.$sleep(1000)

      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now()// 永远传最新的时间戳
      })
      // 请求过来的数据全部替换当前数据，判断如果时间戳没有请求数据来，告诉大家没有新数据
      // 如果有返回的数据，将整个articles替换
      if (data.results.length) {
        this.articles = data.results// 如果有历史时间戳，可以继续拉取
        // 手动关闭加载状态
        this.downloading = false
        if (data.pre_timestamp) {
          this.finished = false// 唤醒列表，继续可以上拉加载
          this.timestamp = data.pre_timestamp// 记录历史时间戳
        }
        this.successtext = `更新了${data.results.length}条数据`
      } else {
        this.successtext = '当前已经是最新数据'
      }

      // setTimeout(() => {
      //   const arr = Array.from(
      //     Array(2),
      //     (value, index) => '追加' + (index + 1)
      //   )
      //   this.articles.unshift(...arr)
      //   this.downloading = false
      //   this.successtext = `刷新了${arr.length}数据`
      // }, 1000)
    },
    async onload () {
      await this.$sleep(1000)
      // 上拉加载，1引入请求,传入参数
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: this.timestamp || Date.now() // 如果有时间戳用时间戳，否则用当前的时间
      })
      this.articles.push(...data.results)// 解构出来，resuls是一个数组，push到一个数组，等于是数组套数组，需要解构...
      this.upLoading = false // 关闭加载状态
      // 判断时间戳，如果为0，没有内容了fiished为true,
      if (data.pre_timestamp) {
        this.timestamp = data.pre_timestamp
      } else {
        // 没有数据了
        this.finished = true
      }

      // if (this.articles.length > 50) {
      //   this.finished = true
      // } else {
      //   const arr = Array.from(
      //     Array(15),
      //     (item, index) => this.articles.length + index + 1
      //   )
      //   this.articles.push(...arr) // ...结构数组
      //   // 添加完数据手动关掉loading
      //   this.upLoading = false
      // }

      // setTimeout(() => {
      //   this.finished = true
      // }, 1000)
    }
  }
}
</script>

<style lang="less" scoped >
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
