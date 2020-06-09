<template>
  <div class="container">
    <headerbar :useBack="true"  title="微博正文"></headerbar>
    <post type="detail" v-if="itemData" :data="itemData"></post>
      <div class="tab-box" v-if="itemData">
        <router-link replace :to="'/detail/'+this.$route.params.id+'/repostlist'">
          <div class="tab-item">转发{{itemData.mblog.reposts_count | numFormat}}</div>
        </router-link>
        <router-link replace :to="'/detail/'+this.$route.params.id+'/commentlist'">
        <div class="tab-item">评论{{itemData.mblog.comments_count | numFormat}}</div>
        </router-link>
        <router-link replace :to="'/detail/'+this.$route.params.id+'/likelist'">
        <div class="tab-item">赞{{itemData.mblog.attitudes_count | numFormat}}</div>
        </router-link>
      </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="item-footer">
      <div class="footer-content" @click="goRepost">
        <div class="repost-icon icon"></div>
        <div>转发</div>
      </div>
      <div class="footer-content" @click="goComment">
        <div class="comment-icon icon"></div>
        <div>评论</div>
      </div>
      <div class="footer-content" @click="doLike" :class="{liked:isLiked}">
        <div class="like-icon icon" :class="{hideAnim:showAnim}">
          <transition name="bounce" @after-enter="afterAnim">
            <div class="liked-icon-big icon" v-if="showAnim"></div>
          </transition>
        </div>
        <div class="like-text">赞</div>
      </div>
    </div>
  </div>
</template>

<script>

import headerbar from '@/components/headerbar'
import post from '@/components/post'


import service from '@/utils/service'
export default {
  name: 'detail',
  components:{
    headerbar,
    post,
  },
  data() {

    return {
      isLiked: false,
      showAnim: false
    }
  },
  computed: {
    itemData(){
      return this.$store.getters.getDatailData(this.$route.params.id)
    }
  },
  async mounted(){

  },
  methods:{
    goRepost(){
      this.$store.dispatch('setToRepostData',this.itemData)
      this.$router.push({
        path: '/repost'
      })
    },
    goComment(){
      this.$store.dispatch('setToRepostData',this.itemData)
      this.$router.push({
        path: '/comment'
      })
    },
    doLike(){
      if(this.isLiked) {
        this.isLiked = false
        this.showAnim = false
      } else {
        this.showAnim = true
      }
    },
    afterAnim(){
      this.isLiked = true
      this.showAnim = false
    }
  }

}
</script>
<style scoped>
div{
  
}
.container {
  padding-top: 45px;
  background-color: #fff;
  padding-bottom: 45px;
}
.tab-box {
  display: flex;
  height: 40px;
  padding-left: 12px;
  font-size: 14px;
  align-items: center;
  box-shadow: 0 1px 0 0 #e6e6e6;
}
.tab-item {
  margin-right: 24px;
  position: relative;
  color: #a5aeb5;
}
.router-link-active .tab-item::after {
  content: '';
  display: block;
  width: 60%;
  height: 3px;
  background-color: #697480;
  margin: 0 auto;
  transform: translateY(8px);
}
.item-footer {
  display: flex;
  font-size: 15px;
  height: 50px;
  border-top: 0.5px solid #e4e4e4;
  margin-top: 12px;
  color: #5e5e5e;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
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
