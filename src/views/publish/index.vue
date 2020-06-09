<template>
  <div class="container">
    <headerbar useRightBtn="发表" :useBack="true" title="发表" @rightBtnClick="publish"></headerbar>
    <textarea id="postContent"
      maxlength="300"
      placeholder="分享新鲜事..."
      @input="oninput"
      v-model="postContent"></textarea>
    <div class="text-count"><span class="left-count">{{textCount}}</span>/300</div>
    <div class="selected-images">
      <div class="image-item" v-for="(item,index) in imageList" :key="index" :style="imgStyle(item)">
        <div class="delete-icon" @click="deleteImage(index)"></div>
      </div>
      <div class="plus-image" @click="openFileUploader"></div>
    </div>
    <input type="file" id="fileUploader" ref="fileUploader"
       @change="fileChange"
       accept="image/*"
       multiple="multiple"/>
  </div>
</template>

<script>

import headerbar from '@/components/headerbar'
export default {
  name: 'publish',
  components:{
    headerbar
  },
  data(){
    return {
      postContent: '',
      textCount: 0,
      imageList:[]
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
    currentUser () { // 计算属性获取vuex中的currentUser值
      return this.$store.state.currentUser
    }
  },
  methods:{
    oninput(){
      this.textCount = this.postContent.length
    },
    openFileUploader(){
      this.$refs.fileUploader.click()
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
    publish(){
      // 图片数据
      let pics = [];
      for (let i = 0 ; i < this.imageList.length ; i++) {
        pics.push({
          url: this.imageList[i].base64,
          geo:{
            width: this.imageList[i].width,
            height: this.imageList[i].height
          },
          large:{
            url: this.imageList[i].base64
          }
        })
      }

      // 正文数据
      let obj = {
        mblog: {
          id: Date.now(),
          reposts_count: 0,
          comments_count: 0,
          attitudes_count: 0,
          source: '微博mobile版',
          text: this.postContent,
          pics: pics,
          user: {
            screen_name: this.currentUser.screen_name,
            profile_image_url: this.currentUser.profile_image_url,
            badge:{
              user_name_certificate: this.currentUser.verified
            }
          }
        }
      }

      this.$store.dispatch('addPost', obj)
      mui.toast('发表成功')
      this.$router.back()
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
</style>
