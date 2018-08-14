import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('测试接口！')
})

export default router