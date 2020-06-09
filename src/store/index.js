import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,//严格模式，只能用action来修改state
  state: {
    // 存储当前用户的数据
    currentUser: window.localStorage.getItem('cuser') ? JSON.parse(window.localStorage.getItem('cuser')) : {},
    // 微博首页新鲜事列表数据
    weiboDataList: [],
    // 详情页使用的数据，使用对象形式以id为key保存每个微博的数据
    detailData: {},
    // 微博详情页评论列表数据
    commentDataList: [],
    // 转发微博的数据
    toRepostData: null
  },
  mutations: {
    /*
    * 设置当前用户mutations
    */
    currentUser (state, user) {
      state.currentUser = user
      // 登陆完成将用户信息存储在localStorage
      window.localStorage.setItem('cuser',JSON.stringify(user))
    },
    /*
    * 设置新鲜事列表数据mutations
    */
    weiboDataList (state, array) {
      state.weiboDataList = state.weiboDataList.concat(array)
    },
    /*
    * 创建一条新微博mutations
    */
    addPost (state, obj) {
      state.weiboDataList.unshift(obj)
    },
    /*
    * 设置详情页mutations
    */
    setDetailData (state, obj) {
      state.detailData[obj.mblog.id] = obj
    },
    /*
    * 设置微博详情页评论列表mutations
    */
    commentDataList (state, array) {
      state.commentDataList = state.commentDataList.concat(array)
    },
    /*
    * 创建一条新微博mutations
    */
    addComment (state, obj) {
      state.commentDataList.unshift(obj)
    },
    /*
    * 设置转发用的数据
    */
    setToRepostData(state, obj){
      state.toRepostData = obj
    }
  },
  actions: {
    setUser (context, user) {
      context.commit('currentUser', user)
    },
    setWeiboDataList(context, list){
      context.commit('weiboDataList', list)
    },
    addPost (context, obj) {
      context.commit('addPost', obj)
    },
    setDetailData (context, obj) {
      context.commit('setDetailData', obj)
    },
    setCommentDataList (context, obj) {
      context.commit('commentDataList', obj)
    },
    addComment (context, obj) {
      context.commit('addComment', obj)
    },
    setToRepostData (context, obj) {
      context.commit('setToRepostData', obj)
    }
  },
  getters: {
    getDatailData: function(state){
      // 提供参数，来根据id查到对应的数据
      return function(id){
        return state.detailData[id]||{};
      }
    }
  }
})
