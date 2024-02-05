import { DataTypes, NOW } from 'sequelize'
import { database } from '../database'
import { irolusu } from '../interfaces'
// import { Estado } from './'

export const Rolusu = database.define<irolusu>(
  'rolusu',
  {
    rolusu_rolusu: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER.ZEROFILL,
    },
    rolusu_descri: { allowNull: false, comment: 'NOMBRE', type: DataTypes.STRING(100) },
    rolusu_abrevi: { comment: 'ABREVIATURA', type: DataTypes.STRING(50) },

    rolusu_estado: {
      allowNull: false,
      defaultValue: 'A',
      type: DataTypes.ENUM('A', 'I', 'E'),
      comment: 'A: ACTIVO, I: INACTIVO, E: ELIMINADO',
      // references: {
      //   model: Estado,
      //   key: 'estado_abrevi',
      // },
    },

    rolusu_usucre: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'USUARIO CREACIÓN',
    },
    rolusu_feccre: {
      allowNull: false,
      type: DataTypes.DATE,
      comment: 'FECHA CREACIÓN',
      defaultValue: NOW(),
    },

    rolusu_usuact: {
      type: DataTypes.INTEGER,
      comment: 'USUARIO ACTUALIZACIÓN',
    },
    rolusu_fecact: {
      type: DataTypes.DATE,
      comment: 'FECHA ACTUALIZACIÓN',
    },

    rolusu_usueli: {
      type: DataTypes.INTEGER,
      comment: 'USUARIO ELIMINA',
    },

    rolusu_feceli: {
      type: DataTypes.DATE,
      comment: 'FECHA ELIMINA',
    },
  },
  { tableName: 'tb_rolusu' },
)

// Rolusu.hasMany(Estado, { foreignKey: 'estado_abrevi' })
