import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Activity from '@/pages/activity/activity'
import GoodEssay from '@/pages/goodEssay/goodEssay'
import Register from '@/pages/register/register'
import Share from '@/pages/share/share'
// import Test from '@/components/test'
// import OrderDetail from '@/pages/orderDetail'
// import OrderState from '@/pages/orderState'
// import Admin from '@/pages/admin'
// import AdminMenage from '@/pages/adminMenage'
// import UserMenage from '@/pages/userMenage'
// import Banner from '@/pages/banner'
// import OrderMenage from '@/pages/orderMenage'
// import GoodManage from '@/pages/goodMenage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
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
        }
      ]
    }, {
      path: 'register',
      name: 'register',
      component: Register
    }
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   component: Admin,
    //   children: [
    //     {
    //       path: '/adminMenage',
    //       component: AdminMenage
    //     },
    //     {
    //       path: '/userMenage',
    //       component: UserMenage
    //     },
    //     {
    //       path: '/orderMenage',
    //       component: OrderMenage
    //     },
    //     {
    //       path: '/goodMenage',
    //       component: GoodManage
    //     },
    //     {
    //       path: '/banner',
    //       component: Banner
    //     }
    //   ]
    // },
  ]
})
