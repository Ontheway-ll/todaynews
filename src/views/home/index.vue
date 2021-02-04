<template>
  <div class="container">
    <van-tabs v-model="activeIndex">
      <van-tab :title="item.name" v-for="item in channels " :key="item.id">
        <!-- <div class="scroll-wrapper">
          <van-cell-group>
            <van-cell title="单元格" value="内容" v-for="item in 20" :key="item" />
          </van-cell-group>
        </div>-->

        <!-- 频道id传递给articles-list，父传子props -->
        <ArticleList @showAction="ishowAction" :channel_id="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <span class="bar_btn" @click="showsheet=true" :round="false" >
      <van-icon name="wap-nav" />
    </span>
    <!-- 弹窗组件 -->
    <van-popup v-model="showMoveAction" style="width:80%">
      <!-- 子传父，给谁传就在谁的标签上写事件 -->
      <!-- @事件名="方法名"，@事件名="方法名()"@事件名="方法名($envet,参数)"@事件名="简单逻辑" -->
      <!-- $event是第一个参数,在h5中、$event是dom的事件参数，自定义事件中是传出的第一个参数，reportarticle，传过来的参数item.value -->
      <MoveAction @dislike="reportarticleOrReport('dislike')" @report="reportarticleOrReport('report',$event)" />
    </van-popup>
    <!-- 频道弹出面板，编辑组件 -->
    <van-action-sheet v-model="showsheet" title="编辑频道" >
      <!-- 父组件传递，channels -->
      <channelEdit :activeIndex="activeIndex"  @seletechannel="seletechannel" :channels="channels" ></channelEdit>
    </van-action-sheet>

  </div>
</template>

<script>
import MoveAction from './components/more-action'
import ArticleList from './components/article-list'
import { getMyChannels } from '@/api/channels'
import { unlikeArticle, reportArticles } from '@/api/articles'
import eventBus from '@/utils/eventbus'
import channelEdit from './components/channeledit'// 频道编辑组件
export default {
  name: 'container',
  components: {
    ArticleList,
    MoveAction,
    channelEdit
  },
  data () {
    return {
      showsheet: false, // 是否显示面板
      activeIndex: 0, // 激活的索引，van-tabs
      artId: null,
      showMoveAction: false,
      channels: [] // 接收频道的数据
    }
  },
  methods: {
    // 点击我的频道进入到当前频道
    // seletechannel (id) {
    //   // 找到当前的索引进行激活
    //   const index = this.channels.findIndex(item => item.id === id)
    //   this.activeIndex = index
    //   this.showsheet = false
    // },
    seletechannel (index) {
      // 找到当前的索引进行激活
      // const index = this.channels.findIndex(item => item.id === id)
      this.activeIndex = index
      this.showsheet = false
    },
    // 不喜欢的接口
    async reportarticleOrReport (disliekorport, type) {
      // alert(type)
      try {
        disliekorport === 'dislike' ? await unlikeArticle({
          target: this.artId
        }) : await reportArticles({
          target: this.artId,
          type: type
        })
        this.$llnotify({
          type: 'success',
          message: '操作成功'
        })
        // 父组件home中，触发一个事件，利用事件的广播机制，通知对应的tab删除文章数据，
        eventBus.$emit(
          'delArticles',
          this.artId,
          this.channels[this.activeIndex].id
        ) // 触发一个事件，事件名delArticles随便起，传入点击不喜欢的文章id
        //  监听了这个事件的组件，根据id删除对应的数据，，在articles中监听，
        // 除了传一个id后，还要告诉监听事件的人现在处于哪个频道，可以拿到这个频道的id,
        // this.activeIndex,就是this.channels[this.activeIndex].id
        this.showMoveAction = false
      } catch (error) {
        this.$llnotify({
          message: '操作失败'
        })
      }
    },
    // 举报文章
    // async reportarticle (type) {
    //   // alert(type)调接口,target接口要求传的代表是id,type是类型
    //   try {
    //     await reportArticles({
    //       target: this.artId,
    //       type: type
    //     })
    //     this.$llnotify({
    //       type: 'success',
    //       message: '操作成功'

    //     })
    //     // 同样也要删除举报的文章，不喜欢和局部接口不同其他都一样，封装一下
    //     // eventBus.$emit(
    //     //   'delArticles',
    //     //   this.artId,
    //     //   this.channels[this.activeIndex].id
    //     // ) // 触发一个事件，事件名delArticles随便起，传入点击不喜欢的文章id
    //     // this.showMoveAction = false
    //   } catch (error) {
    //     this.$llnotify({
    //       message: '操作失败'
    //     })
    //   }
    // },
    // 控制显示弹窗,接收article_list传出的id
    ishowAction (artid) {
      this.showMoveAction = true
      this.artId = artid // 把id存起来，点击弹窗的时候传
    },
    async getMyChannels () {
      const data = await getMyChannels()
      this.channels = data.channels
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>
<style lang="less" scoped>
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
