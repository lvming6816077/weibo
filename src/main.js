import './assets/mui/css/mui.css'
import './assets/mui/css/mui.previewimage.css'
import './assets/common.css'
import './assets/animate.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from '@/utils/filters'

Vue.config.productionTip = false

Vue.prototype.$videoPlayerList = [] // 存储视频播放器实例

import './registerServiceWorker.js'

Object.keys(filters).forEach(key=>{
    Vue.filter(key, filters[key])
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
