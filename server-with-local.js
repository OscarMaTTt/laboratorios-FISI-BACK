import { createApp } from './app.js'
import { LaboratoryModel } from './models/local-file-system/laboratory.js'
import { EquipmentModel } from './models/local-file-system/equipment.js'
import { ApplicationModel } from './models/local-file-system/application.js'
import { ComputerModel } from './models/local-file-system/computer.js'

createApp({
  laboratoryModel: LaboratoryModel,
  equipmentModel: EquipmentModel,
  applicationModel: ApplicationModel,
  computerModel: ComputerModel
})
