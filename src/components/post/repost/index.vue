<template>
  <div class="repost-content" @click="goDetail($event)">
    <span class="nickname">{{nickname}}</span>
    <div class="text-content" v-html="formatText(retweeted_status.text)"></div>
    <pics v-if="retweeted_status.pics" :mblog="retweeted_status"></pics>
    <videopart v-else-if="retweeted_status.page_info && retweeted_status.page_info.type =='video'" :vid="retweeted_status.id" :videoData="retweeted_status.page_info"></videopart>

  </div>
</template>

<script>
import pics from '../pics'
import videopart from '../videopart'

export default {
  name: 'repost',
  components:{
    videopart,
    pics
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

    let retweeted_status = this.mblog.retweeted_status || {}
    return {
      retweeted_status: retweeted_status
    }
  },
  computed:{
    nickname(){
      let nickname = this.retweeted_status.user ? '@' + this.retweeted_status.user.screen_name : ''

      return nickname + ':'
    }
  },
  methods:{
    formatText(value){
      // 过滤链接中可能引发跳转的逻辑
      let reg = /href=("|')(.+?)("|')/gi;

      return value.replace(reg, '').replace(/<br \/><br \/>/g, '<br />')
    },
    goDetail(e){
      e.stopPropagation()


      this.$store.dispatch('setDetailData', {
        mblog: this.retweeted_status
      })
      this.$router.push({
        path: '/detail/' + this.retweeted_status.id + '/' + 'commentlist'
      })
    }
  },
}
</script>
<style scoped>
.repost-content {
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #f7f7f7;
}
.text-content {
  font-size: 17px;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 6px;
  margin-bottom: 12px;
  line-height: 25px;
}
.text-content /deep/ a,.text-content /deep/ .surl-text {
  color: #3c6e9e;
}
.nickname {
  font-size: 17px;
  color: #3c6e9e;
  float: left;
  margin-top: 7px;
  margin-left: 12px;
}
</style>