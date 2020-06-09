<template>
  <div class="content-list">
    <ritem v-for="(item,index) in dataList" :key="index" :data="item"></ritem>
  </div>
</template>

<script>


import ritem from './ritem'

import service from '@/utils/service'
export default {
  name: 'repostlist',
  components:{
    ritem
  },
  data() {

    return {
      dataList: []
    }
  },
  async created(){
    let resp = await service.get('json/repostlist.json')
    this.dataList = resp.data.data || []
  }

}
</script>
<style scoped>

</style>
