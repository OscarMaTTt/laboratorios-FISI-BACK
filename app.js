import express, { json } from 'express' // require -> commonJS
import { createLaboratoryRouter } from './routes/laboratories.js'
import { createEquipmentRouter } from './routes/equipments.js'
import { createApplicationRouter } from './routes/applications.js'
import { createComputerRouter } from './routes/computers.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

// después
export const createApp = ({ laboratoryModel, equipmentModel, applicationModel, computerModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/laboratories', createLaboratoryRouter({ laboratoryModel }))
  app.use('/equipments', createEquipmentRouter({ equipmentModel }))
  app.use('/applications', createApplicationRouter({ applicationModel }))
  app.use('/computers', createComputerRouter({ computerModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
