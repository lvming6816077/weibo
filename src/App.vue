<template>
  <transition :enter-active-class="transitionNameIn" :leave-active-class="transitionNameOut" :duration="duration">
    <keep-alive :include="['index','message','my','setting']">
      <router-view :key="key"></router-view>
    </keep-alive>
  </transition>
</template>
<script>
export default {
  name: 'App',
  mounted(){
    mui.init()
    mui.previewImage()
  },
  data(){
    return {
      duration: 0,
      transitionNameOut: '',
      transitionNameIn: ''
    }
  },
  computed: {
    key () {
      // 判断是否为详情页
      let reg = /\/detail\/\d+/gi
      let arr = this.$route.path.match(reg)
      if (arr && arr.length > 0) {
        // 详情页使用/detail/:id作为key
        return arr[0]
      }
      return this.$route.fullPath// 其它使用完整路径
    }
  },
  watch: {
    // 使用watch 监听$router的变化
    $route (to, from) {
      let modelPage = ['/publish', '/login', '/comment', '/repost'] // 模态切换
      let normalPage = ['/', '/my', '/message', '/setting'] // 静止切换
      // 判断是返回操作还是进入操作
      if (this.$router.backFlag) {
        // 从模态型页面返回
        if (modelPage.indexOf(from.path) > -1) {
          this.duration = 500 // 持续时间
          this.transitionNameIn = ''
          this.transitionNameOut = 'animated faster slideOutDown'
        }
        // 从静止型页面返回
        else if (normalPage.indexOf(from.path) > -1) {
          this.duration = 0 // 持续时间为0，即不需要动画
          this.transitionNameOut = ''
          this.transitionNameIn = ''
        } else {// 从翻页型页面返回
          this.duration = 500 // 持续时间
          this.transitionNameOut = 'animated faster slideOutRight'
          this.transitionNameIn = 'animated faster slideInLeft'
        }
      } else {
        // 进入模态型页面
        if (modelPage.indexOf(to.path) > -1) {
          this.duration = 500 // 持续时间
          this.transitionNameIn = 'animated faster slideInUp'
          this.transitionNameOut = ''
        }
        // 进入静止型页面
        else if (normalPage.indexOf(to.path) > -1) {
          this.duration = 0 // 持续时间为0，即不需要动画
          this.transitionNameOut = ''
          this.transitionNameIn = ''
        } else {// 进入翻页型页面
          this.duration = 500 // 持续时间
          this.transitionNameIn = 'animated faster slideInRight'
          this.transitionNameOut = 'animated faster slideOutLeft'
        }
      }
      // 重置返回的标志位
      this.$router.backFlag = false
    }
  }

}
</script>
<style>
.slideOutRight,.slideOutLeft {
  position: absolute;
  left: 0;
  right: 0;
  bottom:0;
  top: 0;
}
</style>
