import user from '../controller/user/user'
const router = require('express').Router()

// 登录
router.post('/login', user.login)

// 注册
router.post('/register', user.register)

// 选择用户
router.post('/detail', user.detail)

// 更新用户信息
router.post('/addAddress', user.addAddress)

// 列举所有用户
router.post('/all', user.all)

// 删除用户信息
router.post('/del', user.del)

module.exports = router
