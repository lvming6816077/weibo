<template>
  <div class="container">
    <headerbar title="新鲜事" :useAdd="true"></headerbar>
    <scrollview
      class="list-content"
      @loadCallback="loadCallback"
      :isend="isend"
      :readyToLoad="readyToLoad"
      :dataList="dataList"
    >
    <post v-for="(item) in dataList" :key="item.mblog.id" :data="item" class="item"></post>
  </scrollview>

    <tabbar currentKey="index"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import headerbar from '@/components/headerbar'
import post from '@/components/post'
import scrollview from '@/components/scrollview'

import service from '@/utils/service'
export default {
  name: 'index',
  components:{
    headerbar,
    tabbar,
    post,
    scrollview
  },
  data() {

    return {
      isend: false,
      readyToLoad: true,
      pageIndex: 0
    }
  },
  computed: {
    dataList () {
      return this.$store.state.weiboDataList // 从vuex的store获取数据
    }
  },
  async mounted(){
    this.loadCallback()
  },
  methods:{
    async loadCallback(){
      if (this.pageIndex == 2) { // 加载到第二页时，就结束加载，默认只有2页数据
        this.isend = true; // isend=true表示停止scrollview的滚动加载功能
        return;
      }
      this.readyToLoad = false;// readyToLoad表示在发送ajax请求这段时间内不触发判断滚动到底部的行为
      let resp = await service.get('json/list' + (this.pageIndex + 1) + '.json');
      this.readyToLoad = true;// 请求发送完成后，可以正常触发滚动到底部的行为
      let array = resp.data.cards || [];
      this.$store.dispatch('setWeiboDataList', array); // 将加载的数据放入vuex中，便于后续的发表功能联动

      this.pageIndex++;
    }
  }

}
</script>
<style scoped>
.container {
  padding-top: 50px;
  background-color: #fff;
}
.list-content {
  padding-bottom: 60px;
}
.item {
  border-bottom: 10px solid #eee;
}
.list-content .item:nth-last-child(2) {
  border-bottom: 0;
}
</style>
