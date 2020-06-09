<template>
  <div class="container">
    <div class="close-icon" @click="close"></div>
    <div class="top-logo"></div>
    <p class="title">登录微博</p>
    <p class="sub-title">分享生活 发现世界abc</p>
    <form class="mui-input-group">
      <div class="mui-input-row">
        <label>手机号：</label>
        <input v-model="phoneNum" type="tel" placeholder="请输入手机号">
      </div>
      <div class="mui-input-row mui-password">
        <label>密码：</label>
        <input v-model="password" type="password" class="mui-input-password" placeholder="请输入密码"><span class="mui-icon mui-icon-eye"></span>
      </div>
    </form>
    <button type="button" class="mui-btn mui-btn-warning mui-btn-block login-btn" @click="login">登录</button>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      password: '',
      phoneNum: ''
    }
  },

  methods: {
    close(){
      // 关闭当前页返回上个页面
      this.$router.backFlag = true
      this.$router.back()
    },
    login(){
      console.log(this.phoneNum,this.password)
      const user = {
        description: '实践过，才懂得',
        follow_count: 315,
        followers_count: 425,
        gender: 'm',
        profile_image_url: 'http://wecircle.oss-cn-beijing.aliyuncs.com/image-1576550113681.jpg',
        screen_name: '吕小鸣javascript',
        verified: true
      }

      // 调用action来设置数据
      this.$store.dispatch('setUser', user)

      // 关闭当前页返回上个页面
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
.top-logo {
  height: 90px;
  width: 100%;
  background-image: url('./imgs/logo.png');
  background-repeat: no-repeat;
  background-size: 80px 70px;
  background-position: center;
  margin-top: 70px;
}
.close-icon {
  position: absolute;
  top: 18px;
  left: 18px;
  width: 20px;
  height: 20px;
  background-image: url('./imgs/close.png');
  background-size: cover;
}
.title {
  font-size: 20px;
  color: #000;
  text-align: center;
  margin-top: 15px;
}
.sub-title {
  text-align: center;
  color: #969696;
}
.mui-input-group {
  margin-top: 80px;
}
.login-btn {
  background-color:#ff7d15;
  border-radius: 7px;
  width: 93%;
  margin: 0 auto;
  margin-top: 35px;
}
</style>
