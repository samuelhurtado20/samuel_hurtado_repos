import express from 'express'
import RepositoryController from '../controllers/repository.controller'

const controller = new RepositoryController()
const router = express.Router()

router.get('/:id', controller.GetById) 

router.get('/', controller.GetAll)

router.post('/', controller.Insert)

router.put('/:id', controller.Update)

router.delete('/:id', controller.Delete)

module.exports = router;