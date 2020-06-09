
<template>
  <div class="container">
    <headerbar :useBack="false"  title="消息列表"></headerbar>
    <div class="content-list">
      <item v-for="(item,index) in dataList" :key="index" :data="item"></item>
    </div>
    <tabbar currentKey="message"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import headerbar from '@/components/headerbar'

import service from '@/utils/service'
import item from './item'
export default {
  name: 'message',
  components:{
    headerbar,
    tabbar,
    item
  },
  data(){
    return {
      dataList: []
    }
  },
  async mounted(){
    let resp = await service.get('json/messagelist.json')
    this.dataList = resp.data || []
  }

}
</script>
<style scoped>
.container {
  background-color: #fff;
  padding-top: 50px;
}
.content-list {
  padding-bottom: 50px;
}
</style>
