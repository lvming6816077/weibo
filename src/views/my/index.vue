<template>
  <div class="container">
    <headerbar :useBack="false"  title="我的"></headerbar>
     <div class="top-info" v-if="myInfo">
       <avatar :user="user" class="left-avatar"></avatar>
       <div class="right-info">
         <div class="nickname" :class="myInfo.user.gender">{{myInfo.user.screen_name}}</div>
         <div class="desc">简介：{{myInfo.user.description}}</div>
       </div>
     </div>
     <div class="other-info" v-if="myInfo">
       <div class="other-conent">
         <div class="count">{{myInfo.user.statuses_count}}</div>
         <div class="text">微博</div>
       </div>
      <div class="other-conent">
        <div class="count">{{myInfo.user.follow_count}}</div>
        <div class="text">关注</div>
      </div>
      <div class="other-conent">
        <div class="count">{{myInfo.user.followers_count}}</div>
        <div class="text">粉丝</div>
      </div>
     </div>
     <mylist></mylist>
    <tabbar currentKey="my"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import headerbar from '@/components/headerbar'
import avatar from '@/components/avatar'
import service from '@/utils/service'
import mylist from './mylist'
export default {
  name: 'my',
  components:{
    headerbar,
    tabbar,
    avatar,
    mylist
  },
  data(){
    return {
      myInfo: null,
      user: null
    }
  },
  async created(){
    let resp = await service.get('json/my.json')
    this.myInfo = resp.data || {}

    this.user = {
      profile_image_url: this.myInfo.user.profile_image_url,
      badge:{
        user_name_certificate: this.myInfo.user.verified
      }
    }
  }

}
</script>
<style scoped>
.container {
  background-color: #fff;
  padding-top: 50px;
}
.top-info {
  display: flex;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 30px;
  padding-bottom: 15px;
  border-bottom: 0.5px solid #eee;
}
.left-avatar {
  width: 64px;
  height: 64px;
}
.left-avatar.vip::after {
  width: 15px;
  height: 15px;
}
.right-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 17px;
}
.nickname {
  font-size: 21px;
  color: #333;
  position: relative;
  font-weight: bold;
}
.nickname::after {
  content: '';
  display: block;
  width: 15px;
  height: 15px;
  background-size: cover;
  background-position: center;
  position: absolute;
  right: -18px;
  top: 0;
}
.f::after {
  background-image: url('./imgs/female.png');
}
.m::after {
  background-image: url('./imgs/male.png');
}
.desc {
  margin-top: 4px;
  color: #999;
  font-size: 13px;
}
.other-info {
  display: flex;
  margin-top: 10px;
  justify-content: space-around;
  padding-bottom: 10px;
  border-bottom: 5px solid #eee;
}
.other-conent {
  display: flex;
  flex-direction: column;
}
.other-conent .text {
  color: #999;
  font-size: 13px;
}
.other-conent .count {
  color: #333;
  font-size: 15px;
  font-weight: bold;
}
</style>
