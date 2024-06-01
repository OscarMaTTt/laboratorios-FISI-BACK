import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const laboratories = readJSON('./laboratories.json')

export class LaboratoryModel {
  static async getAll ({ genre }) {
    if (genre) {
      return laboratories.filter(
        laboratory => laboratory.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return laboratories
  }

  static async getById ({ id }) {
    const laboratory = laboratories.find(laboratory => laboratory.id === id)
    return laboratory
  }

  static async create ({ input }) {
    const newLaboratory = {
      id: randomUUID(),
      ...input
    }

    laboratories.push(newLaboratory)

    return newLaboratory
  }

  static async delete ({ id }) {
    const laboratoryIndex = laboratories.findIndex(laboratory => laboratory.id === id)
    if (laboratoryIndex === -1) return false

    laboratories.splice(laboratoryIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const laboratoryIndex = laboratories.findIndex(laboratory => laboratory.id === id)
    if (laboratoryIndex === -1) return false

    laboratories[laboratoryIndex] = {
      ...laboratories[laboratoryIndex],
      ...input
    }

    return laboratories[laboratoryIndex]
  }
}
