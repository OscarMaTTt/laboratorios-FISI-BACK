import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const computers = readJSON('./computers.json')

export class ComputerModel {
  static async getAll ({ genre }) {
    if (genre) {
      return computers.filter(
        computer => computer.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return computers
  }

  static async getById ({ id }) {
    const computer = computers.find(computer => computer.id === id)
    return computer
  }

  static async create ({ input }) {
    const newComputer = {
      id: randomUUID(),
      ...input
    }

    computers.push(newComputer)

    return newComputer
  }

  static async delete ({ id }) {
    const computerIndex = computers.findIndex(computer => computer.id === id)
    if (computerIndex === -1) return false

    computers.splice(computerIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const computerIndex = computers.findIndex(computer => computer.id === id)
    if (computerIndex === -1) return false

    computers[computerIndex] = {
      ...computers[computerIndex],
      ...input
    }

    return computers[computerIndex]
  }
}
