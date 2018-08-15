import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('最后一次sdff')
})

export default router
