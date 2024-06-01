import { Router } from 'express'
import { ComputerController } from '../controllers/computers.js'

export const createComputerRouter = ({ computerModel }) => {
  const computersRouter = Router()

  const computerController = new ComputerController({ computerModel })

  computersRouter.get('/', computerController.getAll)
  computersRouter.post('/', computerController.create)

  computersRouter.get('/:id', computerController.getById)
  computersRouter.delete('/:id', computerController.delete)
  computersRouter.patch('/:id', computerController.update)

  return computersRouter
}
