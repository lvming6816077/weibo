<template>
  <div class="container">
    <headerbar :useBack="true"  title="更多回复"></headerbar>
    <citem v-if="mainCommentData" :data="mainCommentData" type="morecomment"></citem>
    <div class="content-list">
      <item v-for="(item,index) in dataList" :key="index" :data="item"></item>
    </div>
  </div>
</template>

<script>
import citem from '@/views/detail/commentlist/citem'
import service from '@/utils/service'
import headerbar from '@/components/headerbar'
import item from './item'
export default {
  name: 'morecomment',
  components:{
    headerbar,
    item,
    citem
  },
  data(){
    let dataList = []
    return {
      dataList,
      mainCommentData: this.$route.params.mainCommentData
    }
  },
  async created(){
    let resp = await service.get('json/morecomment.json')
    this.dataList = resp.data || []
  }

}
</script>
<style scoped>
.container {
  background-color: #fff;
  padding-top: 50px;
}
</style>
