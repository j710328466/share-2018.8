import admin from '../controller/admin/admin'
const router = require('express').Router()

// 登录
router.post('/login', admin.login)

// 注册
router.post('/register', admin.register)

// 分类
router.post('/sort', admin.sort)

// 删除
router.post('/delete', admin.delete)


module.exports = router
