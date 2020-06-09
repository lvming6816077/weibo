<template>
  <div class="item-wrap">
    <img class="left-avatar" :src="data.user.profile_image_url" />
    <div class="nickname">{{data.user.screen_name}}</div>
  </div>
</template>

<script>



export default {
  name: 'litem',
  props:{
    data:{
      type: Object,
      default:()=>{
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
  align-items: center;
  border-bottom: 1px solid #eee;
}
.left-avatar {
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 50%;
}
.nickname {
  font-size: 15px;
  color: #333;
}
</style>
