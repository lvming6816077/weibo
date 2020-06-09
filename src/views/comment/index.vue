<template>
  <div class="container">
    <headerbar useRightBtn="提交" :useBack="true" title="评论微博" @rightBtnClick="submit"></headerbar>
    <textarea id="postContent"
      maxlength="30"
      placeholder="请输入文字..."
      @input="oninput"
      v-model="postContent"></textarea>
    <div class="text-count"><span class="left-count">{{textCount}}</span>/30</div>
    <div class="selected-images">
      <div class="image-item" v-for="(item,index) in imageList" :key="index" :style="imgStyle(item)">
        <div class="delete-icon" @click="deleteImage(index)"></div>
      </div>
      <div v-if="imageList.length == 0" class="plus-image" @click="openFileUploader"></div>
    </div>
    <input type="file" id="fileUploader" ref="fileUploader"
       @change="fileChange"
       accept="image/*"
       multiple="multiple"/>
    <div class="repost-content">
      <div class="mui-checkbox repost-btn">
        <input class="repost-checkbox" value="" v-model="isRepost" type="checkbox">
      </div>
      <div class="repost-text">同时转发</div>
    </div>
  </div>
</template>

<script>
import headerbar from '@/components/headerbar'
export default {
  name: 'comment',
  components:{
    headerbar
  },
  data(){
    return {
      postContent: '',
      textCount: 0,
      imageList: [],
      isRepost: false
    }
  },
  computed: {
    imgStyle () {
      return item => {
        return {
          backgroundImage: 'url(' + item.base64 + ')'
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
    openFileUploader(){
      if (this.imageList.length == 0) {
        this.$refs.fileUploader.click()
      }
      
    },
    fileChange (event) {
      let files = event.target.files; //获取文件对象
      for (let i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(files[i]); //将图片转换成base64字符串
        reader.onload = (e) => {
          let image = new Image() //转换成Image对象，为了获取图片大小
          image.onload = () => {
            // 保存到图片列表数组中
            this.imageList.push({
              base64: e.target.result,
              width: image.width,
              height: image.height
            })
          }
          image.src = e.target.result
        }
      }
      // 每次选完图片后要清除value
      event.target.value = null
    },
    deleteImage(index){
      this.imageList.splice(index, 1)
    },
    submit(){
      let text = this.postContent
      let id = Date.now() //指定唯一id
      if (this.imageList.length > 0) {//判断是否选择了图片
        let str = '<a data-preview-src="$$src" data-preview-group="$$id"><span class="surl-text">评论配图</span></a>'
        str = str.replace('$$src', this.imageList[0].base64).replace('$$id', id) // 使用base64字符串替换
        text += str
      }

      let obj = {
        created_at: Date.now(),
        id: id,
        like_count: 0,
        text: text,
        more_info_users: [],
        user: {
          screen_name: this.currentUser.screen_name,
          profile_image_url: this.currentUser.profile_image_url,
          badge:{
            user_name_certificate: this.currentUser.verified
          }
        }
      }

      this.$store.dispatch('addComment',obj)
      mui.toast('评论成功')

      if (this.isRepost) {
        this.doRepost()
      }
      this.$router.back()
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
#fileUploader {
  display: none;
}
.selected-images {
  display: flex;
  flex-wrap: wrap;
}
.image-item {
  width: 100px;
  height: 100px;
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-left: 20px;
  margin-bottom: 20px;
}
.plus-image {
  width: 100px;
  height: 100px;
  position: relative;
  background-size: 24px 24px;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('./imgs/plus.png');
  margin-left: 20px;
  border: 1px dashed #aaa;
}
.delete-icon {
  position: absolute;
  width: 15px;
  height: 15px;
  background-image: url('./imgs/delete.png');
  background-size: cover;
  top: -7px;
  right: -7px;
}
.repost-content {
  margin-top: 10px;
  overflow: hidden;
}
.repost-btn {
  float: left;
  width: 50px;
  height: 50px;
  margin-left: 15px;
}
.repost-checkbox:checked::before {
  color: #ff9f52 !important;
}
.repost-text {
  float: left;
  margin-top: 9px;
  font-size: 16px;
  color: #333;
  margin-left: -10px;
}
</style>
