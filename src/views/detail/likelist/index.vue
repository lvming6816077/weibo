<template>
  <div class="content-list">
    <litem v-for="(item,index) in dataList" :key="index" :data="item"></litem>
  </div>
</template>

<script>


import litem from './litem'

import service from '@/utils/service'
export default {
  name: 'likelist',
  components:{
    litem
  },
  data() {

    return {
      dataList: []
    }
  },
  async mounted(){
    let resp = await service.get('json/likelist.json')
    this.dataList = resp.data.data || []
  }

}
</script>
<style scoped>

</style>
