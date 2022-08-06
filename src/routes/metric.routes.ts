import express from 'express'
import MetricController from '../controllers/metric.controller'

const controller = new MetricController()
const router = express.Router()

router.get('/filter/:id', controller.Filter)

router.get('/', controller.GetAll)

router.post('/', controller.Insert)

module.exports = router;