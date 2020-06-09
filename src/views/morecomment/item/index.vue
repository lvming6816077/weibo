<template>
  <div class="item-wrap">
    <avatar :user="data.user" class="left-avatar"></avatar>
    <div class="item-right">
      <div class="nickname">{{data.user.screen_name}}</div>
      <div class="content">{{data.text}}</div>
      <div class="item-info">
        <div class="time-info">
          {{data.created_at | formatTime}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import avatar from '@/components/avatar'
export default {
  name: 'item',
  components:{
    avatar
  },
  props:{
    data:{
      type: Object,
      default: ()=>{
        return {}
      }
    }
  }

}
</script>
<style scoped>
.item-wrap {
  padding: 12px;
  display: flex;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 0;
  background-color: #eee;
}
.left-avatar {
  width: 30px;
  height: 30px;
  margin-right: 8px;
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
  font-size: 16px;
  color: #333;
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
</style>
