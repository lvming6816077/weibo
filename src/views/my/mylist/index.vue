<template>
  <div class="content-list">
    <div class="item" v-for="(item,index) in dataList" :key="index">
      <post :data="item"></post>
    </div>
  </div>
</template>

<script>
import post from '@/components/post'
import service from '@/utils/service'
export default {
  name: 'mylist',
  components:{
    post
  },
  data(){
    return {
      dataList: []
    }
  },
  async created(){
    let resp = await service.get('json/mylist.json')

    this.dataList = resp.data.cards || []
  }

}
</script>
<style scoped>
.item {
  border-bottom: 10px solid #eee;
}
</style>
