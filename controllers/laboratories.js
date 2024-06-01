import { validateLaboratory, validatePartialLaboratory } from '../schemas/laboratories.js'

export class LaboratoryController {
  constructor ({ laboratoryModel }) {
    this.laboratoryModel = laboratoryModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const laboratories = await this.laboratoryModel.getAll({ genre })
    res.json(laboratories)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const laboratory = await this.laboratoryModel.getById({ id })
    if (laboratory) return res.json(laboratory)
    res.status(404).json({ message: 'Laboratory not found' })
  }

  create = async (req, res) => {
    const result = validateLaboratory(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newLaboratory = await this.laboratoryModel.create({ input: result.data })

    res.status(201).json(newLaboratory)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.laboratoryModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Laboratory not found' })
    }

    return res.json({ message: 'Laboratory deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialLaboratory(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedLaboratory = await this.laboratoryModel.update({ id, input: result.data })

    return res.json(updatedLaboratory)
  }
}
