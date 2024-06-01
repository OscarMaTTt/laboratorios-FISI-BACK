import { validateEquipment, validatePartialEquipment } from '../schemas/equipments.js'

export class EquipmentController {
  constructor ({ equipmentModel }) {
    this.equipmentModel = equipmentModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const equipments = await this.equipmentModel.getAll({ genre })
    res.json(equipments)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const equipment = await this.equipmentModel.getById({ id })
    if (equipment) return res.json(equipment)
    res.status(404).json({ message: 'Equipment not found' })
  }

  create = async (req, res) => {
    const result = validateEquipment(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newEquipment = await this.equipmentModel.create({ input: result.data })

    res.status(201).json(newEquipment)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.equipmentModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Equipment not found' })
    }

    return res.json({ message: 'Equipment deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialEquipment(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedEquipment = await this.equipmentModel.update({ id, input: result.data })

    return res.json(updatedEquipment)
  }
}
