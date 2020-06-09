<template>
  <div class="scrollview">
    <slot></slot>
    <div class="loadmore">
      <span class="loadmore-tips">{{loadEnd ? '已加载完毕':'正在加载...'}}</span>
    </div>
  </div>
</template>
<script>
  export default {
  name: 'scrollview',
  props:{
    readyToLoad: Boolean,
    isend: Boolean,
    dataList: Array
  },
  computed:{
    loadEnd(){
      return this.isend || this.dataList.length == 0
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onLoadPage.bind(this))
  },
  beforeDestroy () {
    // 在组件销毁时要移除scroll事件
    window.removeEventListener('scroll', this.onLoadPage.bind(this))
  },
  activated () {
    window.addEventListener('scroll', this.onLoadPage.bind(this))
  },
  deactivated () {
    // 在组件切换走时要移除scroll事件
    window.removeEventListener('scroll', this.onLoadPage.bind(this))
  },
  methods:{
    onLoadPage () {
      // 获取clientHeight
      let clientHeight = document.documentElement.clientHeight
      // 获取scrollHeight
      let scrollHeight = document.body.scrollHeight
      // 获取scrollTop这里注意要兼容一下，某些机型的document.documentElement.scrollTop可能为0
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      // 通知父组件触发滚动事件
      this.$emit('scroll', scrollTop)
      // 通知距离底部还有多少px的阈值
      let proLoadDis = 60
      // 判断是否页面滚动到底部
      if ((scrollTop + clientHeight) >= (scrollHeight - proLoadDis)) { // 560 1915
        // 是否已经滚动到最后一页
        if (!this.loadEnd) {
          // 判断在一个api请求未完成时不能触发第二次滚动到底部的回调
          if (!this.readyToLoad) {
            return
          }

          // 通知父组件触发滚动到底部事件
          this.$emit('loadCallback')
        }
      }
    }
  }

}
</script>
<style scoped>
.loadmore {
  width: 65%;
  margin: 20px auto;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
}
.loadmore-tips {
  display: inline-block;
  vertical-align: middle;
  color: #ababab;
}
</style>