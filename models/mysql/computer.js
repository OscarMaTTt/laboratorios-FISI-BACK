import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: '172.28.144.1',
  user: 'root',
  password: '123456',
  database: 'laboratoriesdb'
})

export class ComputerModel {
  static async getAll ({ genre }) {
    console.log('getAll')

    const [computers] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, code, cpu, ram, graphics, storage FROM computers'
    )

    return computers
  }

  static async getById ({ id }) {
  }

  static async create ({ input }) {
  }

  static async delete ({ id }) {
    // ejercio fácil: crear el delete
  }

  static async update ({ id, input }) {
    // ejercicio fácil: crear el update
  }
}
