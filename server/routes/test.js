import express from 'express'
import test from '../controller/test/test'
const router = express.Router()

router.post('/', test.test)

export default router