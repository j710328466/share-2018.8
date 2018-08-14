import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('测试接口啊')
})

export default router