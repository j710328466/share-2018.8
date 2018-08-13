const router = require('express').Router()
import order from '../controller/v1/order'

router.post('/create', order.create)

module.exports = router
