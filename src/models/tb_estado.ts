import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tb_compan, tb_companId } from './tb_compan';
import type { tb_sucurs, tb_sucursId } from './tb_sucurs';

export interface tb_estadoAttributes {
  estado_estado: number;
  estado_nombre: string;
  estado_abrevi: string;
  estado_colorx: string;
  estado_modulox: string;
}

export type tb_estadoPk = "estado_estado";
export type tb_estadoId = tb_estado[tb_estadoPk];
export type tb_estadoOptionalAttributes = "estado_estado";
export type tb_estadoCreationAttributes = Optional<tb_estadoAttributes, tb_estadoOptionalAttributes>;

export class tb_estado extends Model<tb_estadoAttributes, tb_estadoCreationAttributes> implements tb_estadoAttributes {
  estado_estado!: number;
  estado_nombre!: string;
  estado_abrevi!: string;
  estado_colorx!: string;
  estado_modulox!: string;

  // tb_estado hasMany tb_compan via compan_estado
  tb_compans!: tb_compan[];
  getTb_compans!: Sequelize.HasManyGetAssociationsMixin<tb_compan>;
  setTb_compans!: Sequelize.HasManySetAssociationsMixin<tb_compan, tb_companId>;
  addTb_compan!: Sequelize.HasManyAddAssociationMixin<tb_compan, tb_companId>;
  addTb_compans!: Sequelize.HasManyAddAssociationsMixin<tb_compan, tb_companId>;
  createTb_compan!: Sequelize.HasManyCreateAssociationMixin<tb_compan>;
  removeTb_compan!: Sequelize.HasManyRemoveAssociationMixin<tb_compan, tb_companId>;
  removeTb_compans!: Sequelize.HasManyRemoveAssociationsMixin<tb_compan, tb_companId>;
  hasTb_compan!: Sequelize.HasManyHasAssociationMixin<tb_compan, tb_companId>;
  hasTb_compans!: Sequelize.HasManyHasAssociationsMixin<tb_compan, tb_companId>;
  countTb_compans!: Sequelize.HasManyCountAssociationsMixin;
  // tb_estado hasMany tb_sucurs via sucurs_estado
  tb_sucurs!: tb_sucurs[];
  getTb_sucurs!: Sequelize.HasManyGetAssociationsMixin<tb_sucurs>;
  setTb_sucurs!: Sequelize.HasManySetAssociationsMixin<tb_sucurs, tb_sucursId>;
  addTb_sucur!: Sequelize.HasManyAddAssociationMixin<tb_sucurs, tb_sucursId>;
  addTb_sucurs!: Sequelize.HasManyAddAssociationsMixin<tb_sucurs, tb_sucursId>;
  createTb_sucur!: Sequelize.HasManyCreateAssociationMixin<tb_sucurs>;
  removeTb_sucur!: Sequelize.HasManyRemoveAssociationMixin<tb_sucurs, tb_sucursId>;
  removeTb_sucurs!: Sequelize.HasManyRemoveAssociationsMixin<tb_sucurs, tb_sucursId>;
  hasTb_sucur!: Sequelize.HasManyHasAssociationMixin<tb_sucurs, tb_sucursId>;
  hasTb_sucurs!: Sequelize.HasManyHasAssociationsMixin<tb_sucurs, tb_sucursId>;
  countTb_sucurs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tb_estado {
    return tb_estado.init({
    estado_estado: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true
    },
    estado_nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    estado_abrevi: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    estado_colorx: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    estado_modulox: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tb_estado',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "estado_estado" },
        ]
      },
    ]
  });
  }
}
