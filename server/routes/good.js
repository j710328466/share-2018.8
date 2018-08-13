const router = require('express').Router()
import good from '../controller/v1/good'

// 发布商品
router.post('/publish', good.publish)

// 商品分类
router.post('/sort', good.sort)

// 商品购买
router.post('/buy', good.buy)

// 商品删除
router.post('/delete', good.delete)

// 商品关键字查询
router.post('/search', good.search)

module.exports = router
