// import * as OfflinePluginRuntime from 'offline-plugin/runtime'

// // 注册Service Worker
// OfflinePluginRuntime.install({

//   onUpdateReady: () => {
//     // 当发现有需要的更新，调用applyUpdate()跳过等待立刻更新，相当于调用skipwaiting()方法
//     OfflinePluginRuntime.applyUpdate()
//   },
//   onUpdated: () => {
//     // 更新完成后刷新一下页面
//     window.location.reload()
//   }
// })