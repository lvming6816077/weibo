import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
  },
  {
    path: '/',
    component: index// index新鲜事页面是整个APP的第一个页面，所以不采用懒加载，直接配置
  },
  {
    path: '/message',
    component: () => import(/* webpackChunkName: "message" */ '../views/message')
  },
  {
    path: '/my',
    component: () => import(/* webpackChunkName: "my" */ '../views/my')
  },
  {
    path: '/setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/setting')
  },
  {
    path: '/publish',
    component: () => import(/* webpackChunkName: "publish" */ '../views/publish')
  },
  {
    path: '/morecomment',
    name: 'morecomment',// 只有配置name才能是push({name:morecomment})
    component: () => import(/* webpackChunkName: "morecomment" */ '../views/morecomment')
  },
  {
    path: '/comment',
    component: () => import(/* webpackChunkName: "comment" */ '../views/comment')
  },
  {
    path: '/repost',
    component: () => import(/* webpackChunkName: "repost" */ '../views/repost')
  },
  {
    path: '/detail/:id',
    component: () => import(/* webpackChunkName: "detail" */ '../views/detail'),
    children: [
      {
        // 当 /detail/:id/likelist 匹配成功，
        path: 'likelist',
        component: () => import(/* webpackChunkName: "likelist" */ '../views/detail/likelist')
      },
      {
        // 当 /detail/:id/repostlist 匹配成功
        path: 'repostlist',
        component: () => import(/* webpackChunkName: "repostlist" */ '../views/detail/repostlist')
      },
      {
        // 当 /detail/:id/commentlist 匹配成功
        path: 'commentlist',

        component: () => import(/* webpackChunkName: "commentlist" */ '../views/detail/commentlist')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        // 跳转时保持可视范围
        try {
          document.getElementsByClassName('slideOutRight')[0].style.top = savedPosition.y + 'px'
        } catch (e) {}

        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
})

export default router
