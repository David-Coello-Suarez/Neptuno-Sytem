import {  Model, Op } from 'sequelize'

export interface irolusu extends Model {
  rolusu_rolusu: number
  rolusu_descri: string
  rolusu_abrevi: string
  rolusu_estado: string | { [Op.in]: string[] }

  rolusu_usucre: number
  rolusu_feccre: Date

  rolusu_usuact: number
  rolusu_fecact: Date

  rolusu_usueli: number
  rolusu_feceli: Date
}
