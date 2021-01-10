<template>
  <div class="container" >
     <van-nav-bar title="登录" left-arrow @click-left="$router.back()" >
     </van-nav-bar>
     <!-- 登录布局 -->
     <!-- 外层需要包裹van-cell-group -->
     <van-cell-group>
       <!-- trim去除手机号两边的空格 -->
       <van-field @blur="checkMoble" :error-message="errMessage.mobile" v-model.trim="loginForm.mobile" label="手机号" placeholder="请输入手机号" ></van-field>
       <van-field @blur="checkCode" :error-message="errMessage.code" v-model.trim="loginForm.code" label="验证码" placeholder="请输入验证码" >
         <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
          </template>
       </van-field>
     </van-cell-group>
     <div class="login-box" >
     <van-button @click="login" type="info" block size="small" round >登录</van-button>
     </div>
    </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'// 辅助函数，把mutations方法映射到methods方法中
export default {

  data () {
    return {
      loginForm: {
        mobile: '13911111111', // 手机号
        code: '246810'// 验证码
      },
      errMessage: {
        mobile: '', // 手机号错误提示
        code: ''// 验证码错误提示
      }
    }
  },
  methods: {
    ...mapMutations(['updateUser']), // 直接导入方法，把updateuser方法映射到当前的methods
    checkMoble () {
      // 校验手机号不能为空，和格式不正确，undifined,'',null取反为true
      if (!this.loginForm.mobile) {
        this.errMessage.mobile = '手机号不能为空'
        return false // false表示，不在往下进行了，校验没通过
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        // 1为开头，第二个数字是3到9，，9个连续的数字，$结尾,\d数字的意思
        this.errMessage.mobile = '手机号格式不正确'
        return false
      }
      // 到这个位置，说明通过，就没有消息了
      this.errMessage.mobile = ''
      return true
    },
    checkCode () {
      if (!this.loginForm.code) {
        this.errMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errMessage.code = '验证码必须为6位数字'
        return false
      }
      this.errMessage.code = ''
      return true
    },
    async login () {
      const validateMole = this.checkMoble()
      const validateCode = this.checkCode()
      if (validateMole && validateCode) {
        try {
          console.log('校验通过')
          // 校验成功之后调接口，，，，，
          const res = await login(this.loginForm)
          console.log(res)
          // 登录后得到token和refetoken，把token设置到vuex中的state中,修改state用mutations
          // 1 this.$store.commit('')2用mapMutations
          this.updateUser({ user: res })// 更新当前的token和reftoken
          // 跳转到主页，但是，有可能是401之后跳转过来的，登录后需要回到之前页面
          // 需要判断当前有没有需要跳转的路径有就去，否则直接登录
          const { redirectUrl } = this.$route.query// 当前路由信息对象，query参数，也就是？后面的参数
          // redireturl如果有值，跳他，没值的话跳登录
          this.$router.push(redirectUrl || '/')// 短路表达式，如果前面为true执行前面，false执行后面
        } catch (error) {
          // this.$notify({ message: '手机号或者验证码错误', durtation: 1000 })
          this.$llnotify({ message: '手机号或者验证码错误' })
        }
      }
    }
  }
}
</script>

<style>
.login-box{
  padding: 20px;
}
</style>
