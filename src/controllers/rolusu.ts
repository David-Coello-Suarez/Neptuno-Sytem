import { Request, Response } from 'express'
import { Op, WhereOptions } from 'sequelize'
import { database } from '../database'
import { Rolusu } from '../models'
import { irolusu } from '../interfaces'

const getRolusu = async (req: Request, res: Response) => {
  try {
    const pagina = Number(req.query.pagina) || 1,
      limit = Number(req.query.limite) || 10,
      offset = (pagina - 1) * limit

    let where: WhereOptions<irolusu> = {
      rolusu_estado: { [Op.in]: ['A', 'I'] },
    }

    const query = req.query.query

    if (query) {
      where = {
        ...where,
        [Op.or]: [
          { rolusu_descri: { [Op.like]: `%${query.toString().toLowerCase()}%` } },
          { rolusu_abrevi: { [Op.like]: `%${query.toString().toLowerCase()}%` } },
        ],
      }
    }

    const [total_rolusu, rolusu] = await Promise.all([
      Rolusu.count({ where }),
      Rolusu.findAll({ where, offset, limit }),
    ])

    if (total_rolusu === 0) {
      return res.status(200).json({
        estado: 2,
        mensaje: 'No hay datos para mostrar',
        data: {},
      })
    }

    return res.status(200).json({
      estado: 1,
      mensaje: '',
      data: {
        paginacion: {
          pagina,
          limite: limit,
          totalItems: total_rolusu,
          totalPages: Math.ceil(total_rolusu / limit),
        },
        rolusu,
      },
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Se a producido un error',
      data: {},
    })
  }
}

const getRolusuActivo = async (req: Request, res: Response) => {
  try {
    const where: WhereOptions<irolusu> = {
      rolusu_estado: { [Op.in]: ['A'] },
    }

    const rolusu = await Rolusu.findAll({ where })

    if (rolusu.length === 0) {
      return res.status(200).json({
        estado: 2,
        mensaje: 'No hay datos para mostrar',
        data: {},
      })
    }

    return res.status(200).json({
      estado: 1,
      mensaje: '',
      data: {
        rolusu,
      },
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Se a producido un error',
      data: {},
    })
  }
}

const postRolusu = async (req: Request, res: Response) => {
  const transaction = await database.transaction()
  try {
    const rolusu: irolusu = req.body

    const existe_rol = await Rolusu.count({
      where: {
        rolusu_descri: { [Op.eq]: rolusu.rolusu_descri.trim().toUpperCase() },
        rolusu_estado: { [Op.in]: ['A', 'I'] },
      },
      transaction,
    })

    if (existe_rol > 0) {
      await transaction.rollback()
      return res.status(200).json({
        estado: 2,
        mensaje: 'Rol ya existe',
        data: {},
      })
    }

    rolusu.rolusu_usucre = 1

    const crearRol: WhereOptions<irolusu> = { ...rolusu }

    await Rolusu.build(crearRol).save({ transaction })

    await transaction.commit()
    return res.status(200).json({
      estado: 1,
      mensaje: 'Rol creado con éxito',
      data: {},
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      estado: 3,
      mensaje: 'Se a producido un error',
      data: {},
    })
  }
}

const putRolusu = async (req: Request, res: Response) => {
  const transaction = await database.transaction()
  try {
    const rolusu_rolusu = Number(req.params.id)

    const rolusu: irolusu = req.body

    const existe_rol = await Rolusu.count({
      where: {
        rolusu_rolusu,
        rolusu_estado: { [Op.in]: ['A', 'I'] },
      },
      transaction,
    })

    if (existe_rol == 0) {
      await transaction.rollback()
      return res.status(200).json({
        estado: 2,
        mensaje: 'Rol no existe',
        data: {},
      })
    }

    rolusu.rolusu_usuact = 1
    rolusu.rolusu_fecact = new Date()

    const crearRol: WhereOptions<irolusu> = { ...rolusu }

    await Rolusu.update(crearRol, { where: { rolusu_rolusu }, transaction })

    await transaction.commit()
    return res.status(200).json({
      estado: 1,
      mensaje: 'Rol actualizado con éxito',
      data: {},
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      estado: 3,
      mensaje: 'Se a producido un error',
      data: {},
    })
  }
}

const patchRolusu = async (req: Request, res: Response) => {
  const transaction = await database.transaction()
  try {
    const rolusu_rolusu = Number(req.params.id)

    const rolusu: irolusu = req.body

    const existe_rol = await Rolusu.count({
      where: {
        rolusu_rolusu,
        rolusu_estado: { [Op.in]: ['A', 'I'] },
      },
      transaction,
    })

    if (existe_rol == 0) {
      await transaction.rollback()
      return res.status(200).json({
        estado: 2,
        mensaje: 'Rol no existe',
        data: {},
      })
    }

    rolusu.rolusu_usuact = 1
    rolusu.rolusu_fecact = new Date()

    const crearRol: WhereOptions<irolusu> = { ...rolusu }

    await Rolusu.update(crearRol, { where: { rolusu_rolusu }, transaction })

    await transaction.commit()
    return res.status(200).json({
      estado: 1,
      mensaje: 'Rol estado actualizado con éxito',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Se a producido un error',
      data: {},
    })
  }
}

const deleteRolusu = async (req: Request, res: Response) => {
  const transaction = await database.transaction()
  try {
    const rolusu_rolusu = Number(req.params.id)

    const rolusu: irolusu = req.body

    const existe_rol = await Rolusu.count({
      where: {
        rolusu_rolusu,
        rolusu_estado: { [Op.in]: ['A', 'I'] },
      },
      transaction,
    })

    if (existe_rol == 0) {
      await transaction.rollback()
      return res.status(200).json({
        estado: 2,
        mensaje: 'Rol no existe',
        data: {},
      })
    }

    rolusu.rolusu_estado = 'E'
    rolusu.rolusu_usueli = 1
    rolusu.rolusu_feceli = new Date()

    const crearRol: WhereOptions<irolusu> = { ...rolusu }

    await Rolusu.update(crearRol, { where: { rolusu_rolusu }, transaction })

    await transaction.commit()
    return res.status(200).json({
      estado: 1,
      mensaje: 'Rol eliminado con éxito',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Se a producido un error',
      data: {},
    })
  }
}

export { getRolusu, getRolusuActivo, postRolusu, putRolusu, patchRolusu, deleteRolusu }
