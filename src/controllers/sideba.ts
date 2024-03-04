import { Request, Response } from 'express'
import { tb_sideba_grupo, vw_menu_acceso } from '../models/init-models'

//=====START INTERFACES=====//
interface Isubemnu {
  sideba_nombre: string
  sideba_iconox?: string
  sideba_ventan: string
}

interface IItemsModulos {
  [sideba_sideba: number]: Isubemnu[]
}

interface ISubGrupo {
  sidgru_sidgru: number
  sidgru_nombre: string
  sidgru_modulo: Isubemnu[]
  sidgru_submod: ISubGrupo[]
}
//=====END INTERFACES=====//

const getSidebaUsuario = async (req: Request, res: Response) => {
  try {
    const ObtenerModulos = await vw_menu_acceso.findAll({
      attributes: [
        'sideba_sidgru',
        'sideba_sideba',
        'sideba_nombre',
        'sideba_iconox',
        'sideba_ventan',
      ],
      raw: true,
    })

    if (ObtenerModulos.length == 0) {
      return res.status(404).json({
        estado: 1,
        mensaje: 'No tienes modulos asignados. Ponte en contacto con el administrador',
        data: {},
      })
    }

    const itemsModulos: IItemsModulos = {}

    for (const item of ObtenerModulos) {
      const sideba_sideba = item.sideba_sidgru

      if (!itemsModulos[sideba_sideba]) itemsModulos[sideba_sideba] = []

      itemsModulos[sideba_sideba].push(item)
    }

    const sideba = await getModulosGrupos(0, itemsModulos)

    return res.status(200).json({
      estado: 1,
      mensaje: '',
      data: { sideba },
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      estado: 3,
      mensaje: 'Error al procesar los datos',
      data: {},
    })
  }
}

export { getSidebaUsuario }

const getModulosGrupos = async (sidgru_idpadr: number, modulos: IItemsModulos) => {
  const sideba: ISubGrupo[] = []

  const menuPadre = await tb_sideba_grupo.findAll({
    where: { sidgru_idpadr, sidgru_estado: 'A' },
    order: [['sidgru_ordvis', 'ASC']],
  })

  if (menuPadre.length === 0) return []

  for (const item of menuPadre) {
    const { sidgru_sidgru, sidgru_nombre } = item
    sideba.push({
      sidgru_sidgru,
      sidgru_nombre,
      sidgru_modulo: modulos[sidgru_sidgru] || [],
      sidgru_submod: await getModulosGrupos(sidgru_sidgru, modulos),
    })
  }

  return sideba.filter(
    (grupo) => grupo.sidgru_modulo.length > 0 || grupo.sidgru_submod.length > 0,
  )
}
