const router = require('express').Router()
import banner from '../controller/v1/banner'

// 发布广告
router.post('/publish', banner.publish)

// 删除广告
router.post('/delete', banner.delete)

// 广告列表
router.post('/sort', banner.sort)

module.exports = router
