<template>
  <div class="container">
    <headerbar title="设置"></headerbar>
    我的
    <tabbar currentKey="setting"></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar'
import headerbar from '@/components/headerbar'
export default {
  name: 'index',
  components:{
    headerbar,
    tabbar
  }

}
</script>
<style scoped>

</style>
