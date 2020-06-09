<template>
  <div class="img-wrap" :class="{vip:user.badge.user_name_certificate}">
    <img class="avatar" :src="user.profile_image_url" />
  </div>
</template>
<script>
  export default {
  name: 'avatar',
  props:{
    user: {
      type: Object,
      default: () =>{
        return {}
      }
    }
  }
}
</script>
<style scoped>
.img-wrap {
  width: 45px;
  height: 45px;
  position: relative;/*父元素设置relative，方便伪类子元素absolute定位*/
}
.vip.img-wrap::after {
  content: '';
  width: 13px;
  height: 13px;
  position: absolute;
  background-image: url('./imgs/vip-icon.png');
  background-size: cover;
  bottom: 0;
  right: 2px;
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
</style>