import { Dialect, Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

const database = new Sequelize({
  host: process.env.DDBB_HOST,
  dialect: <Dialect>String(process.env.DDBB_DIAL),
  username: process.env.DDBB_USER,
  password: process.env.DDBB_PASS,
  database: process.env.DDBB_DDBB,
  logging: Boolean(String(process.env.AMBI_APPL) === 'dev'),
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    charset: 'utf8',
    freezeTableName: true,
    timestamps: false,
  },
  timezone: '-05:00',
})

export default database
