import { Request, Response } from 'express'
import { Op, WhereOptions, Sequelize } from 'sequelize'
import { database } from '../database/'
import {
  initModels,
  tb_rolusu,
  vw_rolusu,
  vw_rolusuAttributes,
} from '../models/init-models'

initModels(database)

const rolusu_estado = { [Op.in]: ['A', 'I'] }

const getRolusu = async (req: Request, res: Response) => {
  try {
    const pagina = Number(req.query.pagina || 1),
      limit = Number(req.query.limite || 20),
      offset = (pagina - 1) * limit

    const query = req.query.query

    let where: WhereOptions<vw_rolusuAttributes> = {
      rolusu_estado,
    }

    if (query) {
      where = {
        ...where,
        [Op.or]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rolusu_descri')), {
            [Op.like]: `%${query.toString().toLowerCase()}%`,
          }),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rolusu_abrevi')), {
            [Op.like]: `%${query.toString().toLowerCase()}%`,
          }),
        ],
      }
    }

    const [total_rolusu, rolusu] = await Promise.all([
      vw_rolusu.count({ where }),

      vw_rolusu.findAll({
        attributes: { exclude: ['id'] },
        where,
        limit,
        offset,
      }),
    ])

    if (total_rolusu == 0) {
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
      mensaje: 'Error al procesar los datos',
      data: {},
    })
  }
}

const getRolusuActivo = async (req: Request, res: Response) => {
  try {
    const query = req.query.query

    let where: WhereOptions<vw_rolusuAttributes> = {
      rolusu_estado: { [Op.eq]: 'A' },
    }

    if (query) {
      where = {
        ...where,
        [Op.or]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rolusu_descri')), {
            [Op.like]: `%${query.toString().toLowerCase()}%`,
          }),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rolusu_abrevi')), {
            [Op.like]: `%${query.toString().toLowerCase()}%`,
          }),
        ],
      }
    }

    const [total_rolusu, rolusu] = await Promise.all([
      vw_rolusu.count({ where }),

      vw_rolusu.findAll({
        attributes: ['rolusu_rolusu', 'rolusu_descri'],
        where,
      }),
    ])

    if (total_rolusu == 0) {
      return res.status(404).json({
        estado: 2,
        mensaje: 'No hay datos para mostrar',
        data: {},
      })
    }

    return res.status(200).json({
      estado: 1,
      mensaje: '',
      data: { rolusu },
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Error al procesar los datos',
      data: {},
    })
  }
}

const postRolusu = async (req: Request, res: Response) => {
  const transaction = await database.transaction()
  try {
    const rolusu: tb_rolusu = req.body

    const { rolusu_descri, rolusu_abrevi } = rolusu

    const where: WhereOptions<vw_rolusuAttributes> = {
      rolusu_estado,
      [Op.or]: [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rolusu_descri')), {
          [Op.eq]: rolusu_descri.toLowerCase(),
        }),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('rolusu_abrevi')), {
          [Op.eq]: rolusu_abrevi?.toLowerCase(),
        }),
      ],
    }

    const existe_rol = await vw_rolusu.count({ where, transaction })

    if (existe_rol > 0) {
      await transaction.rollback()
      return res.status(409).json({
        estado: 2,
        mensaje: 'Rol ya existe',
        data: {},
      })
    }

    rolusu.rolusu_usucre = 1
    rolusu.rolusu_feccre = new Date()

    const crear_rol = await tb_rolusu.build(rolusu).save({ transaction })

    if (!crear_rol) {
      await transaction.rollback()
      return res.status(422).json({
        estado: 3,
        mensaje: 'Rol no puedo ser creado',
        data: {},
      })
    }

    await transaction.commit()
    return res.status(201).json({
      estado: 1,
      mensaje: 'Rol creado con éxito',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Error al procesar los datos',
      data: {},
    })
  }
}

const putRolusu = async (req: Request, res: Response) => {
  const transaction = await database.transaction()
  try {
    const rolusu_rolusu = Number(req.params.id)

    const existe_rol_creado = await vw_rolusu.count({
      where: { rolusu_rolusu, rolusu_estado },
      transaction,
    })

    if (existe_rol_creado === 0) {
      await transaction.rollback()
      return res.status(409).json({
        estado: 3,
        mensaje: 'Rol no éxiste',
        data: {},
      })
    }

    const rolusu: tb_rolusu = req.body

    rolusu.rolusu_usuact = 1
    rolusu.rolusu_fecact = new Date()

    const actualizar_rol = await tb_rolusu.update(rolusu, {
      where: { rolusu_rolusu },
      transaction,
    })

    if (!actualizar_rol) {
      await transaction.rollback()
      return res.status(500).json({
        estado: 2,
        mensaje: 'Rol no puedo ser actualizado',
        data: {},
      })
    }

    await transaction.commit()
    return res.status(200).json({
      estado: 1,
      mensaje: 'Rol actualizado con éxito',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Error al procesar los datos',
      data: {},
    })
  }
}

const patchRolusu = async (req: Request, res: Response) => {
  const transaction = await database.transaction()
  try {
    const rolusu_rolusu = Number(req.params.id)

    const existe_rol_creado = await vw_rolusu.count({
      where: { rolusu_rolusu, rolusu_estado },
      transaction,
    })

    if (existe_rol_creado === 0) {
      await transaction.rollback()
      return res.status(409).json({
        estado: 3,
        mensaje: 'Rol no éxiste',
        data: {},
      })
    }

    const { rolusu_estado: estado }: tb_rolusu = req.body

    const actualizar_rol = await tb_rolusu.update(
      { rolusu_estado: estado, rolusu_usuact: 1, rolusu_fecact: new Date() },
      {
        where: { rolusu_rolusu },
        transaction,
      },
    )

    if (!actualizar_rol) {
      await transaction.rollback()
      return res.status(500).json({
        estado: 2,
        mensaje: 'Rol: Estado no puedo ser actualizado',
        data: {},
      })
    }

    await transaction.commit()
    return res.status(200).json({
      estado: 1,
      mensaje: 'Rol: Estado actualizado con éxito',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Error al procesar los datos',
      data: {},
    })
  }
}

const deleteRolusu = async (req: Request, res: Response) => {
  const transaction = await database.transaction()
  try {
    const rolusu_rolusu = Number(req.params.id)

    const existe_rol_creado = await vw_rolusu.count({
      where: { rolusu_rolusu, rolusu_estado },
      transaction,
    })

    if (existe_rol_creado === 0) {
      await transaction.rollback()
      return res.status(409).json({
        estado: 3,
        mensaje: 'Rol no éxiste',
        data: {},
      })
    }

    const actualizar_rol = await tb_rolusu.update(
      { rolusu_estado: 'E', rolusu_usueli: 1, rolusu_feceli: new Date() },
      {
        where: { rolusu_rolusu },
        transaction,
      },
    )

    if (!actualizar_rol) {
      await transaction.rollback()
      return res.status(500).json({
        estado: 2,
        mensaje: 'Rol no puedo ser eliminado',
        data: {},
      })
    }

    await transaction.commit()
    return res.status(200).json({
      estado: 1,
      mensaje: 'Rol: eliminado con éxito',
      data: {},
    })
  } catch (error) {
    return res.status(500).json({
      estado: 3,
      mensaje: 'Error al procesar los datos',
      data: {},
    })
  }
}

export { getRolusu, getRolusuActivo, postRolusu, putRolusu, patchRolusu, deleteRolusu }
