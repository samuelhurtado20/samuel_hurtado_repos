import express from 'express'
import MetricController from '../controllers/metric.controller'

const controller = new MetricController()
const router = express.Router()

router.get('/:id', controller.Filter)

router.post('/', controller.Insert)

module.exports = router;