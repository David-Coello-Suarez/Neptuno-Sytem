import express, { Application } from 'express'
import { database } from '../database'
import cors from 'cors'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import routerApp from './routerApp'

dotenv.config()

class Server {
  private app: Application
  private version: string = process.env.VERSION || 'V1'
  private ruta: string = 'api'
  private puerto: number

  constructor() {
    this.app = express()
    this.puerto = Number(process.env.PORT || 3000)

    this.coneccionDB()
  }

  private async coneccionDB(): Promise<void> {
    try {
      await database.authenticate()

      console.log('Established connection')

      // if (String(process.env.AMBI_APPL) === 'dev') {
      database.sync({ force: true })
      // } else {
      // database.sync({ alter: true })
      // }

      // MIDDLEWARES
      this.middlewares()

      // RUTAS API
      this.router()
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  private middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan(String(process.env.AMBI_APPL)))
  }

  private router(): void {
    this.app.use(`/${this.version}/${this.ruta}/`, routerApp)
  }

  listening(): void {
    this.app.listen(this.puerto, () =>
      console.log(`Server listening on port: ${this.puerto}`),
    )
  }
}

export default Server
