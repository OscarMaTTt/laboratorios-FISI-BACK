import { Router } from 'express'
import { ApplicationController } from '../controllers/applications.js'

export const createApplicationRouter = ({ applicationModel }) => {
  const applicationsRouter = Router()

  const applicationController = new ApplicationController({ applicationModel })

  applicationsRouter.get('/', applicationController.getAll)
  applicationsRouter.post('/', applicationController.create)

  applicationsRouter.get('/:id', applicationController.getById)
  applicationsRouter.delete('/:id', applicationController.delete)
  applicationsRouter.patch('/:id', applicationController.update)

  return applicationsRouter
}
