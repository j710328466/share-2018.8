import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Activity from '@/pages/activity/activity'
import GoodEssay from '@/pages/goodEssay/goodEssay'
import Register from '@/pages/register/register'
import Share from '@/pages/share/share'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'goodEssay',
          component: GoodEssay
        }, {
          path: 'activity',
          name: 'activity',
          component: Activity
        }, {
          path: 'share',
          name: 'share',
          component: Share
        }, {
          path: '/register',
          name: 'register',
          component: Register
        }
      ]
    }
  ]
})
