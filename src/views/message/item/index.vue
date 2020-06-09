<template>
  <div class="item-wrap">
    <avatar :user="user" class="left-avatar"></avatar>
    <div class="item-right">
      <div class="nickname">{{data.user.screen_name}}</div>
      <div class="content one-line">{{data.text}}</div>
    </div>
    <div class="time-info">
        {{data.created_at}}
    </div>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import headerbar from '@/components/headerbar'

import avatar from '@/components/avatar'
export default {
  name: 'item',
  components:{
    headerbar,
    tabbar,
    avatar
  },
  props:{
    data: {
      type : Object,
      default: ()=>{
        return {}
      }
    }
  },
  data(){
    let user = {
      profile_image_url: this.data.user.avatar_large,
      badge:{
        user_name_certificate: this.data.user.verified
      }
    }
    return {
      user
    }
  }

}
</script>
<style scoped>
.item-wrap {
  padding: 12px;
  display: flex;
  border-bottom: 5px solid #eee;
  position: relative;
}
.left-avatar {
  width: 50px;
  height: 50px;
  margin-right: 8px;
}
.item-right {
  flex: 1;
  overflow: hidden;
}
.nickname {
  font-size: 16px;
  color: #333;
  margin-bottom: 6px;
}
.content {
  font-size: 13px;
  color: #939393;
}
.time-info {
  position: absolute;
  right: 15px;
  top: 8px;
  color: #636363;
  font-size: 12px;
}
</style>
