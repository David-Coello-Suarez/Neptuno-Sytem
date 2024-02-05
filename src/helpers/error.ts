import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const logAdvertencia = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    return res.status(500).json({
      estado: 3,
      mensaje: '',
      data: { ...error },
    })
  }

  next()
}
