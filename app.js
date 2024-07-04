import express, { json } from 'express' // require -> commonJS
import { createLaboratoryRouter } from './routes/laboratories.js'
import { createEquipmentRouter } from './routes/equipments.js'
import { createApplicationRouter } from './routes/applications.js'
import { createComputerRouter } from './routes/computers.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'
import { createClient } from '@libsql/client'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { date } from 'zod'

// después
export const createApp = async ({ laboratoryModel, equipmentModel, applicationModel, computerModel }) => {
  const app = express()
  app.use(logger('dev'))
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  const server = createServer(app)
  const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
      origin: 'http://localhost:5173', // Reemplaza con el puerto correcto de tu frontend
      methods: ['GET', 'POST']
    }
  })

  const db = createClient({
    url: 'libsql://labapp-oscarmattt.turso.io',
    authToken: process.env.DB_TOKEN
  })
  await db.execute(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    user TEXT,
    room TEXT,
    date DATE
  )
`)

  io.on('connection', async (socket) => {
    console.log('a user has connected!')

    socket.on('disconnect', () => {
      console.log('an user has disconnected')
    })

    socket.on('joinRoom', (room) => {
      socket.join(room)
      console.log(`Cliente unido a la sala: ${room}`)
    })

    socket.on('chat message', async ({ room, message }
    ) => {
      let result
      const username = socket.handshake.auth.username ?? 'anonymous'
      console.log({ username, room, message })
      const date = Date.now()
      try {
        result = await db.execute({
          sql: 'INSERT INTO messages (content, user, room, date) VALUES (:message , :username, :room, :date)',
          args: { message, username, room, date }
        })
      } catch (e) {
        console.error(e)
        return
      }
      console.log(result)
      const dateOutput = new Date(date).toLocaleString('es-PE')
      io.to(room).emit('chat message', { msg: message, serverOffset: result.lastInsertRowid.toString(), username, date: dateOutput })
    })

    if (!socket.recovered) { // <- recuperase los mensajes sin conexión
      try {
        const results = await db.execute({
          sql: 'SELECT id, content, user, date FROM messages WHERE id > ? AND room = ?',
          args: [socket.handshake.auth.serverOffset ?? 0, socket.handshake.auth.room ?? '']
        })
        console.log(results)
        results.rows.forEach(row => {
          const date = new Date(row.date).toLocaleString('es-PE')
          console.log(date)
          io.to(socket.handshake.auth.room).emit('chat message', { msg: row.content, serverOffset: row.id.toString(), username: row.user, date })
        })
      } catch (e) {
        console.error(e)
      }
    }
  })

  app.use('/laboratories', createLaboratoryRouter({ laboratoryModel }))
  app.use('/equipments', createEquipmentRouter({ equipmentModel }))
  app.use('/applications', createApplicationRouter({ applicationModel }))
  app.use('/computers', createComputerRouter({ computerModel }))

  const PORT = process.env.PORT ?? 1234

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}
