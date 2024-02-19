import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tb_compan, tb_companId } from './tb_compan';
import type { tb_sucurs, tb_sucursId } from './tb_sucurs';

export interface tb_compan_sucursAttributes {
  comsuc_comsuc: number;
  compan_compan: number;
  sucurs_sucrs: number;
  compan_feccre?: Date;
}

export type tb_compan_sucursPk = "comsuc_comsuc";
export type tb_compan_sucursId = tb_compan_sucurs[tb_compan_sucursPk];
export type tb_compan_sucursOptionalAttributes = "comsuc_comsuc" | "compan_feccre";
export type tb_compan_sucursCreationAttributes = Optional<tb_compan_sucursAttributes, tb_compan_sucursOptionalAttributes>;

export class tb_compan_sucurs extends Model<tb_compan_sucursAttributes, tb_compan_sucursCreationAttributes> implements tb_compan_sucursAttributes {
  comsuc_comsuc!: number;
  compan_compan!: number;
  sucurs_sucrs!: number;
  compan_feccre?: Date;

  // tb_compan_sucurs belongsTo tb_compan via compan_compan
  compan_compan_tb_compan!: tb_compan;
  getCompan_compan_tb_compan!: Sequelize.BelongsToGetAssociationMixin<tb_compan>;
  setCompan_compan_tb_compan!: Sequelize.BelongsToSetAssociationMixin<tb_compan, tb_companId>;
  createCompan_compan_tb_compan!: Sequelize.BelongsToCreateAssociationMixin<tb_compan>;
  // tb_compan_sucurs belongsTo tb_sucurs via sucurs_sucrs
  sucurs_sucrs_tb_sucur!: tb_sucurs;
  getSucurs_sucrs_tb_sucur!: Sequelize.BelongsToGetAssociationMixin<tb_sucurs>;
  setSucurs_sucrs_tb_sucur!: Sequelize.BelongsToSetAssociationMixin<tb_sucurs, tb_sucursId>;
  createSucurs_sucrs_tb_sucur!: Sequelize.BelongsToCreateAssociationMixin<tb_sucurs>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tb_compan_sucurs {
    return tb_compan_sucurs.init({
    comsuc_comsuc: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    compan_compan: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'tb_compan',
        key: 'compan_compan'
      }
    },
    sucurs_sucrs: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      references: {
        model: 'tb_sucurs',
        key: 'sucurs_sucurs'
      }
    },
    compan_feccre: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'tb_compan_sucurs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comsuc_comsuc" },
        ]
      },
      {
        name: "fk_comsuc_to_compan_idx",
        using: "BTREE",
        fields: [
          { name: "compan_compan" },
        ]
      },
      {
        name: "fk_comsuc_to_sucur_idx",
        using: "BTREE",
        fields: [
          { name: "sucurs_sucrs" },
        ]
      },
    ]
  });
  }
}
