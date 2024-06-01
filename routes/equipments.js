import { Router } from 'express'
import { EquipmentController } from '../controllers/equipments.js'

export const createEquipmentRouter = ({ equipmentModel }) => {
  const equipmentsRouter = Router()

  const equipmentController = new EquipmentController({ equipmentModel })

  equipmentsRouter.get('/', equipmentController.getAll)
  equipmentsRouter.post('/', equipmentController.create)

  equipmentsRouter.get('/:id', equipmentController.getById)
  equipmentsRouter.delete('/:id', equipmentController.delete)
  equipmentsRouter.patch('/:id', equipmentController.update)

  return equipmentsRouter
}
