import express from 'express'
import TribeController from '../controllers/tribe.controller'

const controller = new TribeController()
const router = express.Router()

router.get('/:id', controller.Filter)

router.get('/', controller.GetAll)

router.post('/', controller.Insert)

module.exports = router;