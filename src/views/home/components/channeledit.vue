<template>
  <div class="channel-edit">
    <div class="channel">
        <!-- 我的频道，一个是登录下的我的频道，还有没登录的我的频道 -->
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(item,index) in channels" :key="item.id">
          <!-- 1中直接传id，2可以传index -->
          <!-- <span @click="$emit('seletechannel',item.id)" class="f12">{{item.name}}</span> -->
          <span @click="$emit('seletechannel',index)" :class="{red:activeIndex==index}" class="f12">{{item.name}}</span>

          <!-- 以为第一个永远不显示 -->
          <van-icon v-if="index !== 0 && editing" class="btn" name="cross"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 可选频道是全部频道-我的频道 -->
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="item in optionschannels" :key="item.id">
          <span  class="f12">{{item.name}}</span>
          <van-icon  class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import { getAllChannels } from '@/api/channels'

export default {
  data () {
    return {
      editing: false,
      allchannels: []// 全部频道数据
    }
  },
  props: {
    channels: {
      required: true,
      type: Array,
      default: () => []// 此函数默认返回一个空数组，就是channels的value值
    },
    activeIndex: {
      type: Number
    }
  },
  // 计算属性，全部频道，- 我的频道，可选频道
  computed: {
    optionschannels () {
      return this.allchannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  },
  methods: {
    async  getAllChannels () {
      const data = await getAllChannels()
      this.allchannels = data.channels
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
