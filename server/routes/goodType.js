const router = require('express').Router()
import goodType from '../controller/good/goodType'

router.post('/add', goodType.add)
router.post('/sort', goodType.sort)
router.post('/delete', goodType.delete)

module.exports = router