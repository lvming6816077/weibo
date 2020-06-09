<template>
  <div class="item-wrap">
    <avatar :user="data.user" class="left-avatar"></avatar>
    <div class="item-right">
      <div class="nickname">{{data.user.screen_name}}</div>
      <div class="content" v-html="formatText(data.text)"></div>
      <div class="comment-inner" v-if="type=='list' && data.more_info_users && data.more_info_users[0]">
        <div class="text"><span class="inner-blue">{{data.more_info_users[0].screen_name}}</span>等人<span class="inner-spec inner-blue" @click="goMoreComment">共{{data.more_info_users.length}}条回复 &gt;</span></div>
      </div>
      <div class="item-info">
        <div class="time-info">
          {{data.created_at | formatTime}}
        </div>
        <div class="tool-box">
          <div class="like-content">
            <div class="like-icon"></div>
            <div class="like-num">{{data.like_count || ''}}</div>
          </div>
          <div class="comment-content">
            <div class="comment-icon"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>


import avatar from '@/components/avatar'


export default {
  name: 'citem',
  components:{
    avatar
  },
  props:{
    data:{
      type: Object,
      default: ()=>{
        return {}
      }
    },
    type: {
      type: String,
      default: 'list'
    }
  },
  methods:{
    goMoreComment(){
      // 采用vue-router的push方法进行传参，将数据塞入params对象中
      this.$router.push({
        name: 'morecomment',
        params: {
          mainCommentData: this.data
        }
      })
    },
    formatText (value) {
      let reg = /href=("|')(.+?)("|')/gi //匹配出含有href="xxx"的字符串
      let arr = value.match(reg)

      if (arr && arr[0]) {
        let imgStr = arr[0].replace(/^href="/, '').replace(/"$/, '')// 将href等号右边的内容提取出字符串
        if (/\.(gif|png|jpg)$/.test(imgStr)) { // 判断此字符串是否是一个图片链接
          // 构造MUI图片查看器需要的格式
          let str = 'data-preview-src="' + imgStr + '" data-preview-group="' + (this.data.id + Date.now()) + '"'
          value = value.replace(reg, str)
        }
      }
      // 将一些不需要的换行符，和图片占位符去掉
      return value.replace(/<br \/><br \/>/g, '<br />').replace(/<span.*?class='url-icon'.*?>.*?<\/span>/ig, '')
    }
  }

}
</script>
<style scoped>
.item-wrap {
  padding: 12px;
  display: flex;
  border-bottom: 5px solid #eee;
}
.left-avatar {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
.left-avatar.vip::after {
  bottom: 0;
  right: -3px;
}
.item-right {
  flex: 1;
}
.nickname {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}
.content {
  font-size: 15px;
  color: #333;
}
.content /deep/ a,.content /deep/ .surl-text {
  color: #3c6e9e;
}
.content /deep/ a[data-preview-src]::before {
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: text-top;
  margin-right: 3px;
  background-image: url('./imgs/comment-image.png');
  background-size: cover;
}
.comment-inner {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #f7f7f7;
  margin-top: 7px;
}
.text {
  color: #333;
  font-size: 14px;
}
.inner-spec {
  margin-left: 8px;
}
.inner-blue {
  color: #3c6e9e
}
.item-info {
  margin-top: 8px;
  color: #999;
  font-size: 12px;
  overflow: hidden;
}
.time-info {
  float: left;
}
.tool-box {
  display: flex;
  float: right;
  align-items: center;
  margin-right: 10px;
}
.like-content {
  display: flex;
  width: 50px;
  align-items: center;
}
.like-icon {
  width: 13px;
  height: 13px;
  background-image: url('./imgs/like.png');
  background-size: 100% 100%;
  margin-right: 4px;
}
.comment-icon {
  width: 13px;
  height: 13px;
  background-image: url('./imgs/comment.png');
  background-size: 100% 100%;
}
</style>
