<template>
  <div @click="goDetail('commentlist')" class="item-wrap" :class="{detail:type=='detail'}">
    <div class="item-top">
      <avatar :user="mblog.user" class="left-avatar"></avatar>
      <div class="item-right">
        <div class="name">{{mblog.user.screen_name}}</div>
        <div class="time">{{mblog.created_at}}&nbsp;来自{{mblog.source}}</div>
      </div>
    </div>
    <div class="text-content" v-html="formatText(mblog.text)"></div>
    <repost v-if="mblog.retweeted_status" :mblog="mblog"/>
    <div v-else>
      <pics v-if="mblog.pics && mblog.pics.length > 0" :mblog="mblog" />
      <videopart v-else-if="mblog.page_info && mblog.page_info.type =='video'" :vid="mblog.id" :videoData="mblog.page_info"/>
    </div>
    <div v-if="type == 'list'" class="item-footer">
      <div class="footer-content" @click="goDetail('repostlist')">
        <div class="repost-icon icon"></div>
        <div class="repost-text" v-if="mblog.reposts_count">{{mblog.reposts_count}}</div>
        <div v-else>转发</div>
      </div>
      <div class="footer-content" @click="goDetail('commentlist')">
        <div class="comment-icon icon"></div>
        <div class="comment-text" v-if="mblog.comments_count">{{mblog.comments_count}}</div>
        <div v-else>评论</div>
      </div>
      <div class="footer-content" @click="doLike" :class="{liked:isLiked}">
        <div class="like-icon icon" :class="{hideAnim:showAnim}">
          <transition name="bounce" @after-enter="afterAnim">
            <div class="liked-icon-big icon" v-if="showAnim"></div>
          </transition>
        </div>
        <div class="like-text" v-if="likeCount">{{likeCount}}</div>
        <div v-else>赞</div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/avatar'
import pics from './pics'
import videopart from './videopart'
import repost from './repost'
export default {
  name: 'post',
  components:{
    avatar,
    pics,
    videopart,
    repost
  },
  props: {
    data: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    type:{
      type: String,
      default: 'list'
    }
  },
  data(){
    let mblog = this.data.mblog

    return {
      mblog: mblog,
      isLiked: false,
      showAnim: false,
      likeCount: mblog.attitudes_count
    }
  },
  methods:{
    formatText(value){
      // 过滤链接中可能引发跳转的逻辑
      let reg = /href=("|')(.+?)("|')/gi;

      return value.replace(reg, '').replace(/<br \/><br \/>/g, '<br />')
    },
    doLike(){
      if(this.isLiked) {
        this.isLiked = false
        this.showAnim = false
        this.likeCount--
      } else {
        this.showAnim = true
      }
    },
    afterAnim(){
      this.isLiked = true
      this.showAnim = false
      this.likeCount++
    },
    goDetail(page){
      // 确保只在列表页有跳转逻辑，详情页不跳转
      if (this.type !== 'list') return

      this.$store.dispatch('setDetailData', this.data)
      this.$router.push({
        path: '/detail/' + this.mblog.id + '/' + page
      })

    }
  }
}
</script>
<style scoped>
.item-wrap.detail{
  padding-bottom: 15px;
}
.item-wrap.detail .name{
  color: #333;
}
.item-top {
  display: flex;
}
.item-right {
  flex: 1;
}
.left-avatar {
  margin: 15px;
}
.name {
  margin-top: 18px;
  font-size: 17px;
  color: rgb(250,113,20);
}
.time {
  margin-top: 3px;
  font-size: 13px;
  color: rgb(134,134,134);
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

.item-footer {
  display: flex;
  font-size: 15px;
  height: 35px;
  border-top: 0.5px solid #e4e4e4;
  margin-top: 12px;
  color: #5e5e5e;
}
.item-footer .icon {
  width: 15px;
  height: 15px;
  background-size: cover;
  margin-right: 4px;
}
.footer-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer-content.liked .like-icon {
  background-image: url('./imgs/liked-icon.png');
}
.footer-content.liked .like-text {
  color: #ff7f00;
}
.repost-icon {
  background-image: url('./imgs/report-icon.png');
}
.comment-icon {
  background-image: url('./imgs/comment-icon.png');
}
.like-icon {
  background-image: url('./imgs/like-icon.png');
}
.like-icon.hideAnim {
  background-image: none;
}
.liked-icon-big {
  background-size: 13px 13px;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('./imgs/liked-icon-big.png');
}
.bounce-enter-active {
  animation: bounce-in 1s;
  animation-timing-function: ease-in-out;
}
@keyframes bounce-in {
  0% {
    transform: rotate(0deg) scale(1);
  }
  30% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(-10deg) scale(2.5);
  }

  100% {
    transform: rotate(0deg) scale(1);
  }
}

</style>