import express from 'express'
import orgController from '../controllers/organization.controller'

const router = express.Router()

router.get('/:id', orgController.GetById)

router.get('/', orgController.GetAll)

router.post('/Insert', orgController.Insert)

router.put('/:id', orgController.Update)

router.delete('/:id', orgController.Delete)

module.exports = router;