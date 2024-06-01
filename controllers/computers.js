import { validateComputer, validatePartialComputer } from '../schemas/computers.js'

export class ComputerController {
  constructor ({ computerModel }) {
    this.computerModel = computerModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const computers = await this.computerModel.getAll({ genre })
    res.json(computers)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const computer = await this.computerModel.getById({ id })
    if (computer) return res.json(computer)
    res.status(404).json({ message: 'Computer not found' })
  }

  create = async (req, res) => {
    const result = validateComputer(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newComputer = await this.computerModel.create({ input: result.data })

    res.status(201).json(newComputer)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.computerModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Computer not found' })
    }

    return res.json({ message: 'Computer deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialComputer(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedComputer = await this.computerModel.update({ id, input: result.data })

    return res.json(updatedComputer)
  }
}
