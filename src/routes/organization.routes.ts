import express from 'express'
import OrganizationController from '../controllers/organization.controller'

const controller = new OrganizationController()
const router = express.Router()

router.get('/:id', controller.GetById) 

router.get('/', controller.GetAll)

router.post('/', controller.Insert)

router.put('/:id', controller.Update)

router.delete('/:id', controller.Delete)

module.exports = router;