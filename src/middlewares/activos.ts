import { Op } from 'sequelize'
import { tb_estado, tb_rolusu } from '../models/init-models'

const rolusu_activo = async (rolusu_rolusu: number) => {
  if (!/^\d+$/.test(String(rolusu_rolusu)))
    throw new Error('El parámetro :id debe ser un número entero')

  const activo = await tb_rolusu.count({
    where: { rolusu_rolusu, rolusu_estado: { [Op.in]: ['A', 'I'] } },
  })

  if (activo === 0) throw new Error('Rol no éxiste')

  return true
}

const estados_mantenimiento = async (estado_abrevi: string) => {
  if (estado_abrevi.length === 0) throw new Error('Debes establecer el estado')

  const permitido = await tb_estado.count({
    where: { estado_abrevi, estado_modulox: 'mantenimiento' },
  })

  if (permitido === 0) throw new Error(`Estado escojido '${estado_abrevi}', no permitido`)

  return true
}

export { rolusu_activo, estados_mantenimiento }
