import { randomUUID } from 'node:crypto'
import { readJSON } from '../../utils.js'

const equipments = readJSON('./equipments.json')

export class EquipmentModel {
  static async getAll ({ genre }) {
    if (genre) {
      return equipments.filter(
        equipment => equipment.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return equipments
  }

  static async getById ({ id }) {
    const equipment = equipments.find(equipment => equipment.id === id)
    return equipment
  }

  static async create ({ input }) {
    const newEquipment = {
      id: randomUUID(),
      ...input
    }

    equipments.push(newEquipment)

    return newEquipment
  }

  static async delete ({ id }) {
    const equipmentIndex = equipments.findIndex(equipment => equipment.id === id)
    if (equipmentIndex === -1) return false

    equipments.splice(equipmentIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const equipmentIndex = equipments.findIndex(equipment => equipment.id === id)
    if (equipmentIndex === -1) return false

    equipments[equipmentIndex] = {
      ...equipments[equipmentIndex],
      ...input
    }

    return equipments[equipmentIndex]
  }
}
