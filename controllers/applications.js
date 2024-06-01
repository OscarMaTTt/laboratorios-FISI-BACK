import { validateApplication, validatePartialApplication } from '../schemas/applications.js'

export class ApplicationController {
  constructor ({ applicationModel }) {
    this.applicationModel = applicationModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const applications = await this.applicationModel.getAll({ genre })
    res.json(applications)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const application = await this.applicationModel.getById({ id })
    if (application) return res.json(application)
    res.status(404).json({ message: 'Application not found' })
  }

  create = async (req, res) => {
    const result = validateApplication(req.body)

    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newApplication = await this.applicationModel.create({ input: result.data })

    res.status(201).json(newApplication)
  }

  delete = async (req, res) => {
    const { id } = req.params

    const result = await this.applicationModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Application not found' })
    }

    return res.json({ message: 'Application deleted' })
  }

  update = async (req, res) => {
    const result = validatePartialApplication(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedApplication = await this.applicationModel.update({ id, input: result.data })

    return res.json(updatedApplication)
  }
}
