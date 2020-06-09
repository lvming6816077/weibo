<template>
  <scrollview
    @loadCallback="loadCallback"
    :isend="isend"
    :readyToLoad="readyToLoad"
    :dataList="dataList"
  >
    <div class="content-list">
      <citem v-for="(item,index) in dataList" :key="index" :data="item"></citem>
    </div>
  </scrollview>
</template>

<script>


import scrollview from '@/components/scrollview'
import citem from './citem'
import service from '@/utils/service'
export default {
  name: 'commentlist',
  components:{
    scrollview,
    citem
  },
  data() {

    return {
      isend: false,
      readyToLoad: true,
      pageIndex: 0
    }
  },
  computed: {
    dataList(){
      return this.$store.state.commentDataList
    }
  },
  async mounted(){
    this.loadCallback()
  },
  methods:{
    async loadCallback () {
      if (this.pageIndex == 2) {// 加载到第二页时，就结束加载，默认只有2页数据
        this.isend = true// isend=true表示停止scrollview的滚动加载功能
        return
      }
      this.readyToLoad = false// readyToLoad表示在发送ajax请求这段时间内不触发判断滚动到底部的行为
      let resp = await service.get('json/comment/' + this.$route.params.id + '.json')
      this.readyToLoad = true// 请求发送完成后，可以正常触发滚动到底部的行为
      let array = resp.data.data || []
      this.$store.dispatch('setCommentDataList', array)// 将加载的数据放入vuex中，便于后续的评论功能联动
      this.pageIndex++
    }
  }

}
</script>
<style scoped>

</style>
