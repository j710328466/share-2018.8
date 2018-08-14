import admin from './admin'
import users from './users'
import test from './test'
import good from './good'
import goodType from './goodType'
import banner from './banner'
import order from './order'

export default app => {
  // app.get('/', (req, res, next) => {
  //   res.redirect('/');
  // });
  // 管理员
  // app.use('/admin', admin)
  // 测试
  app.use('/test', test)
  // // 用户
  app.use('/users', users)
  // // 商品
  // app.use('/good', good)
  // // 商品类型
  // app.use('/goodType', goodType)
  // // 广告
  // app.use('/banner', banner)
  // // 订单
  // app.use('/order', order)
}
