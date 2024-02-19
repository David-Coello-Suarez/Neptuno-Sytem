import { Router } from 'express'
import { body } from 'express-validator'
import {
  deleteRolusu,
  getRolusu,
  getRolusuActivo,
  patchRolusu,
  postRolusu,
  putRolusu,
} from '../controllers/rolusu'
import { logAdvertencia } from '../helpers'
import { estados_mantenimiento } from '../middlewares/activos'

const validaciones = [
  body('rolusu_estado').custom(estados_mantenimiento),
  body('rolusu_descri', 'Descripción es requerido')
    .notEmpty()
    .toUpperCase()
    .isLength({ max: 100 })
    .withMessage('No debe superar los 100 caracteres'),
  body('rolusu_abrevi', 'Abreviatura es requerido')
    .notEmpty()
    .toUpperCase()
    .isLength({ max: 50 })
    .withMessage('No debe superar los 50 caracteres'),
]

const rrolusu: Router = Router()

rrolusu.get('/', getRolusu)

rrolusu.get('/active', getRolusuActivo)

rrolusu.post('/', [...validaciones, logAdvertencia], postRolusu)

rrolusu.put('/:id', [...validaciones, logAdvertencia], putRolusu)

rrolusu.patch('/:id', [...validaciones, logAdvertencia], patchRolusu)

rrolusu.delete('/:id', [...validaciones, logAdvertencia], deleteRolusu)

export default rrolusu
