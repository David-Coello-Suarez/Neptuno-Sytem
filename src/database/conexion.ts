import { Sequelize } from 'sequelize-typescript'
import * as dotenv from 'dotenv'
import { Dialect } from 'sequelize'

dotenv.config()

const database = new Sequelize({
  host: process.env.DDBB_HOST,
  dialect: <Dialect>String(process.env.DDBB_DIAL),
  username: process.env.DDBB_USER,
  password: process.env.DDBB_PASS,
  database: process.env.DDBB_DDBB,
  models: [__dirname + '/models'], // Directorio donde se generan los modelos
  define: {
    timestamps: false, // Desactivar campos createdAt y updatedAt
  },
  timezone: '-05:00',
})

export default database
