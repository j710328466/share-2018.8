import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('测试页面，别当真！')
})

export default router