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
          <van-cell v-for="item in articles" :key="item">
            <!-- 三图，无图，多图 -->
            <div class="article_item">
              <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
              <div class="img_box">
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
                <div class="img_box">
                <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <div class="info_box">
                <span>你像一阵风</span>
                <span>8评论</span>
                <span>10分钟前</span>
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
export default {
  data () {
    return {
      downloading: false, // 下拉刷新
      upLoading: false, // 上拉加载
      finished: false,
      articles: [],
      successtext: '',
      error: false
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        const arr = Array.from(
          Array(2),
          (value, index) => '追加' + (index + 1)
        )
        this.articles.unshift(...arr)
        this.downloading = false
        this.successtext = `刷新了${arr.length}数据`
      }, 1000)
    },
    onload () {
      console.log('开始加载')
      if (this.articles.length > 50) {
        this.finished = true
      } else {
        const arr = Array.from(
          Array(15),
          (item, index) => this.articles.length + index + 1
        )
        this.articles.push(...arr) // ...结构数组
        // 添加完数据手动关掉loading
        this.upLoading = false
      }

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
