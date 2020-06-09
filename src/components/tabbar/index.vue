<template>
  <nav class="bottom-bar">
    <router-link to="/" :class="{'tab-item':true, active:currentKey == 'index'}">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link to="/message" :class="{'tab-item':true, active:currentKey == 'message'}">
      <span class="mui-icon mui-icon-email"></span>
      <span class="mui-tab-label">消息</span>
    </router-link>
    <router-link to="/my" :class="{'tab-item':true, active:currentKey == 'my'}">
      <span class="mui-icon mui-icon-person"></span>
      <span class="mui-tab-label">我的</span>
    </router-link>
    <router-link to="/setting" :class="{'tab-item':true, active:currentKey == 'setting'}">
      <span class="mui-icon mui-icon-gear"></span>
      <span class="mui-tab-label">设置</span>
    </router-link>
  </nav>
</template>
<script>
  export default {
  name: 'tabbar',
  props: {
    currentKey: {
      type: String,
      default: 'index'
    }
  }
}
</script>
<style scoped>
.tab-item {
  flex: 1;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  color: #929292;
  font-size: 17px;
}
.tab-item.active {
  color: #ff7d15;
}
.bottom-bar {
  position: fixed;
  z-index: 10;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  background-color: rgba(255,255,255,0.95);
  border-top: 1px solid #ccc;
}
</style>