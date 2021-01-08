<template>
  <div class="container" >
     <van-nav-bar title="登录" left-arrow @click-left="$router.back()" >
     </van-nav-bar>
     <!-- 登录布局 -->
     <!-- 外层需要包裹van-cell-group -->
     <van-cell-group>
       <!-- trim去除手机号两边的空格 -->
       <van-field  :error-message="errMessage.mobile" v-model.trim="loginForm.mobile" label="手机号" placeholder="请输入手机号" ></van-field>
       <van-field :error-message="errMessage.code" v-model.trim="loginForm.code" label="验证码" placeholder="请输入验证码" >
         <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
          </template>
       </van-field>
     </van-cell-group>
     <div class="login-box" >
     <van-button type="info" block size="small" round >登录</van-button>
     </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      errMessage: {
        mobile: '', // 手机号错误提示
        code: ''// 验证码错误提示
      }
    }
  },
  methods: {
    checkMoble () {
      // 校验手机号不能为空，和格式不正确，undifined,'',null取反为true
      if (!this.loginForm.mobile) {
        this.errMessage.mobile = '手机号不能为空'
        return false // false表示，不在往下进行了，校验没通过
      }
      if (!/^1[3-9]\d{9}$/.text(this.loginForm.mobile)) {
        // 1为开头，第二个数字是3到9，，9个连续的数字，$结尾
        this.errMessage.mobile = '手机号格式不正确'
        return false
      }
      // 到这个位置，说明通过，就没有消息了
      this.errMessage.mobile = ''
      return true
    }
  }
}
</script>

<style>
.login-box{
  padding: 20px;
}
</style>
