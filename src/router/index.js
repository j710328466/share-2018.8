import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Activity from '@/pages/activity/activity'
// import Login from '@/pages/login'
// import Register from '@/pages/register'
// import Publish from '@/pages/publish'
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
      component: Home
    }, {
      path: '/activity',
      name: 'activity',
      component: Activity
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
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: Register
    // },
    // {
    //   path: '/publish',
    //   name: 'publish',
    //   component: Publish
    // },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test
    // },
    // {
    //   path: '/orderDetail/:_id',
    //   name: 'orderDetail',
    //   component: OrderDetail
    // },
    // {
    //   path: '/orderState/:_id',
    //   name: 'orderState',
    //   component: OrderState
    // }
  ]
})
