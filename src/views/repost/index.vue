<template>
  <div class="container">
    <headerbar useRightBtn="提交" :useBack="true" title="转发微博" @rightBtnClick="doRepost"></headerbar>
    <textarea id="postContent"
      maxlength="300"
      placeholder="请输入文字..."
      @input="oninput"
      v-model="postContent"></textarea>
    <div class="text-count"><span class="left-count">{{textCount}}</span>/300</div>
    <div class="repost-info" v-if="toRepostData">
      <div v-if="toRepostData.pics.length" class="left-image" :style="imgStyle(toRepostData.pics[0].url)">
      </div>
      <div class="right-info">
        <div class="nickname">
          @{{toRepostData.user.screen_name}}
        </div>
        <div class="repost-content two-line" v-html="formatText(toRepostData.text)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import headerbar from '@/components/headerbar'
export default {
  name: 'repost',
  components:{
    headerbar
  },
  data(){
    return {
      postContent: '',
      textCount: 0,
      imageList: []
    }
  },
  computed: {
    imgStyle () {
      return url => {
        return {
          backgroundImage: 'url(' + url + ')'
        }
      }
    },
    currentUser(){
      return this.$store.state.currentUser
    },
    toRepostData(){
      if (this.$store.state.toRepostData) {
        return this.$store.state.toRepostData.mblog
      }

      return null
      
    }
  },
  methods:{
    oninput(){
      this.textCount = this.postContent.length
    },

    doRepost(){
      let obj = {
        mblog: {
          id: Date.now(),
          attitides_count: 0,
          reposts_count: 0,
          comments_count: 0,
          source: '微博mobile版',
          text: this.postContent,
          pics:[],
          retweeted_status: this.toRepostData,
          user: {
            screen_name: this.currentUser.screen_name,
            profile_image_url: this.currentUser.profile_image_url,
            badge:{
              user_name_certificate: this.currentUser.verified
            }
          }
        }
      }

      this.$store.dispatch('addPost',obj)
      mui.toast('转发成功')
      this.$router.back()
    },
    formatText(value){
      // 过滤链接中可能引发跳转的逻辑
      let reg = /href=("|')(.+?)("|')/gi;

      return value.replace(reg, '').replace(/<br \/><br \/>/g, '<br />')
    }
  }

}
</script>
<style scoped>
.container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: #fff;
}
#postContent {
  margin-top: 45px;
  border: none;
  font-size: 16px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
}
.text-count {
  font-size: 14px;
  color: #707070;
  position: absolute;
  right: 20px;
  top: 230px;
}
.repost-info {
  display: flex;
  background-color: #f7f7f7;
}
.left-image {
  width: 84px;
  height: 84px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.right-info {
  flex: 1px;
  padding-left: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
.nickname {
  color: #333;
  font-size: 14px;
}
.repost-content {
  color: #939393;
  font-size: 13px;
}
</style>
