import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const applications = readJSON('./applications.json')

export class ApplicationModel {
  static async getAll ({ genre }) {
    if (genre) {
      return applications.filter(
        application => application.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return applications
  }

  static async getById ({ id }) {
    const application = applications.find(application => application.id === id)
    return application
  }

  static async create ({ input }) {
    const newApplication = {
      id: randomUUID(),
      ...input
    }

    applications.push(newApplication)

    return newApplication
  }

  static async delete ({ id }) {
    const applicationIndex = applications.findIndex(application => application.id === id)
    if (applicationIndex === -1) return false

    applications.splice(applicationIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const applicationIndex = applications.findIndex(application => application.id === id)
    if (applicationIndex === -1) return false

    applications[applicationIndex] = {
      ...applications[applicationIndex],
      ...input
    }

    return applications[applicationIndex]
  }
}
