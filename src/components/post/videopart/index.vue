<template>
  <div class="video-content" @click="prevent($event)">
    <div class="ply-btn" v-show="!played" @click="play"></div>
    <video :id="playid" class="video-js">
      <source :src="videoData.media_info.mp4_hd_url" type="video/mp4">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  name: 'videopart',
  components:{
    
  },
  props: {
    videoData: {
      type: Object,
      default: ()=>{
        return {}
      }
    },
    vid: {
      type: String,
      default: ''
    },
  },
  data(){
    let playid = 'id' + this.vid + Date.now()

    return {
      played: false,
      playid: playid
    }
  },
  mounted () {
    let options = {
      controls: true, // 设置是否显示视频控制器
      preload: 'auto', // 设置是否缓冲
      poster: this.videoData.page_pic.url, // 视频预览图
      fluid: true, // 自适应大小
      bigPlayButton: false// 隐藏默认的播放按钮
    }

    // 初始化videojs，第一个参数为video标签的ID，第二个参数是videojs接收的参数，第三个videojs初始化成功后执行的方法
    this.player = videojs(this.playid, options, () => {
      console.log('初始化成功')
    })

    // 当当前播放器播放时，暂停其他播放器
    this.player.on('play',()=>{
      this.played = true
      this.$videoPlayerList.forEach((item)=>{
        if (item.id_ != this.playid) { // 通过playid来判断是否是当前的播放器实例
          item.pause()// 暂停播放
        }
      })
    })

   // 存储播放器实例
   this.$videoPlayerList.push(this.player)
  },
  methods:{
    play(){
      this.player.play()
    },
    prevent(e){
      e.stopPropagation()
    }
  },
}
</script>
<style scoped>
.video-content {
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
}
.ply-btn {
  position: absolute;
  width: 64px;
  height: 64px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-image: url('./imgs/play.png');
  background-position: center center;
  background-repeat: no-repeat;
  z-index: 99;

}
</style>