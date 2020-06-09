<template>
  <header class="mui-bar mui-bar-nav headerbar">
    <button @click="goBack" v-if="useBack" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left"><span class="mui-icon mui-icon-left-nav"></span>返回</button>
    <h1 class="mui-title">{{title}}</h1>
    <div v-if="useAdd" class="add-icon mui-pull-right" @click="goPublish"></div>
    <button v-if="useRightBtn" class="mui-btn mui-btn-link mui-pull-right" @click="rightBtnClick">{{useRightBtn}}</button>
  </header>
</template>
<script>
  export default {
  name: 'headerbar',
  props: {
    useBack: {
      type: Boolean,
      default: false
    },
    useRightBtn: {
      type: String,
      default: ''
    },
    useAdd:{
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods:{
    goBack(){
      this.$router.backFlag = true
      this.$router.back()
    },
    rightBtnClick(){
      // 通知父组件
      this.$emit('rightBtnClick')
    },
    goPublish(){
      this.$router.push({
        path: '/publish'
      })
    }
  }
}
</script>
<style scoped>
.headerbar {
  z-index:999;
}
.mui-bar {
  background-color: #fff;
}
.mui-btn-link {
  color: #ff9f52;
}
.add-icon {
  width: 26px;
  height: 26px;
  background-image: url('./add.png');
  background-size: cover;
  margin-top: 9px;
}
</style>