<template>
  <div class="container" >
     <van-nav-bar title="登录" left-arrow @click-left="$router.back()" >
     </van-nav-bar>
     <!-- 登录布局 -->
     <!-- 外层需要包裹van-cell-group -->
     <van-cell-group>
       <van-field label="手机号" placeholder="请输入手机号" ></van-field>
       <van-field label="验证码" placeholder="请输入验证码" >
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

}
</script>

<style>
.login-box{
  padding: 20px;
}
</style>
