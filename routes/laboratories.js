import { Router } from 'express'
import { LaboratoryController } from '../controllers/laboratories.js'

export const createLaboratoryRouter = ({ laboratoryModel }) => {
  const laboratoriesRouter = Router()

  const laboratoryController = new LaboratoryController({ laboratoryModel })

  laboratoriesRouter.get('/', laboratoryController.getAll)
  laboratoriesRouter.post('/', laboratoryController.create)

  laboratoriesRouter.get('/:id', laboratoryController.getById)
  laboratoriesRouter.delete('/:id', laboratoryController.delete)
  laboratoriesRouter.patch('/:id', laboratoryController.update)

  return laboratoriesRouter
}
