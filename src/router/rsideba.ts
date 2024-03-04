import { Router } from 'express'
import { getSidebaUsuario } from '../controllers/sideba'

const rsideba: Router = Router()

rsideba.get('/', getSidebaUsuario)

export default rsideba
