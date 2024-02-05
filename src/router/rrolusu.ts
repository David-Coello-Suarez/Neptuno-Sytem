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

const rrolusu: Router = Router()

rrolusu.get('/', getRolusu)

rrolusu.get('/activo', getRolusuActivo)

rrolusu.post(
  '/',
  [
    body('rolusu_descri', 'Descripción es requerido')
      .notEmpty()
      .isLength({ max: 100 })
      .withMessage('El campo debe tener como máximo 100 caracteres')
      .toUpperCase(),
    body('rolusu_abrevi', 'Abreviatura es requerida')
      .notEmpty()
      .isLength({ max: 50 })
      .withMessage('El campo debe tener como máximo 50 caracteres')
      .toUpperCase(),
    logAdvertencia,
  ],
  postRolusu,
)

rrolusu.put(
  '/:id',
  [
    body('rolusu_descri', 'Descripción es requerido')
      .notEmpty()
      .isLength({ max: 100 })
      .withMessage('El campo debe tener como máximo 100 caracteres')
      .toUpperCase(),
    body('rolusu_abrevi', 'Abreviatura es requerida')
      .notEmpty()
      .isLength({ max: 50 })
      .withMessage('El campo debe tener como máximo 50 caracteres')
      .toUpperCase(),
    logAdvertencia,
  ],
  putRolusu,
)

rrolusu.patch(
  '/:id',
  [
    body('rolusu_estado', 'Abreviatura es requerida').notEmpty().toUpperCase(),
    logAdvertencia,
  ],
  patchRolusu,
)

rrolusu.delete('/:id', deleteRolusu)

export default rrolusu
