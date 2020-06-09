<template>
   <div class="pic-content">
     <img :data-preview-src="mblog.pics[0].large.url" :data-preview-group="groupId" v-if="mblog.pics && mblog.pics.length == 1" :style="imgOneStyle(mblog.pics[0])" class="img-wrap-one" :src="mblog.pics[0].url">
      <div v-else class="img-content">
        <div
          class="img-item"
          :data-preview-src="item.large.url" :data-preview-group="groupId"
          :style="imgStyle(item)"
          v-for="(item,index) in mblog.pics"
          :key="index"
        >
        </div>
      </div>
   </div>
</template>

<script>

export default {
  name: 'pics',
  components:{
    
  },
  props: {
    mblog: {
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  data(){
    let groupId = this.mblog.id + Date.now()

    return {
      groupId: groupId
    }
  },
  computed:{
    imgStyle(){
      return item =>{
        return {
          backgroundImage: 'url('+item.url+')'
        }
      }
    },
    imgOneStyle(){
      return item => {
        let height = null
        let width = null

        // 如果图片是长图则给定最大的长度
        if (item.geo.height > item.geo.width) {
          height = Math.min(200, item.geo.height)
          // 根据比例设置宽度
          width = height * item.geo.width / item.geo.height
        } else { // 如果图片是宽图则给定固定的宽度
          width = Math.min(200, item.geo.width)
          // 根据比例设置高度
          height = width * item.geo.height / item.geo.width
        }
        // 转换成vw单位
        return {
          height: this.pxtovw(height),
          width: this.pxtovw(width)
        }
      }
    }
  },
  methods:{
    pxtovw(px){
      return (px / 375 * 100) + 'vw'
    }
  }
}
</script>
<style scoped>
.img-content {
  display: flex;
  flex-wrap: wrap;
  padding-left: 15px;
}
.img-item {
  width: 115px;
  height: 115px;
  border: 2px solid #fff;
  box-sizing: border-box;
  background-size: cover;
  background-position: center center;
  background-color: #e9e9e9;
}
.img-wrap-one {
  background-color: #e9e9e9;
  margin-left: 15px;
}
</style>