import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tb_rolusu, tb_rolusuId } from './tb_rolusu';
import type { tb_sideba, tb_sidebaId } from './tb_sideba';

export interface tb_sidrolAttributes {
  sidrol_sidrol: number;
  sideba_sideba: number;
  rolusu_rolusu: number;
  flg_actualizar: string;
  flg_eliminar: string;
  flg_borrar: string;
  flg_insertar: string;
  flg_buscar: string;
}

export type tb_sidrolPk = "sidrol_sidrol";
export type tb_sidrolId = tb_sidrol[tb_sidrolPk];
export type tb_sidrolOptionalAttributes = "sidrol_sidrol" | "flg_actualizar" | "flg_eliminar" | "flg_borrar" | "flg_insertar" | "flg_buscar";
export type tb_sidrolCreationAttributes = Optional<tb_sidrolAttributes, tb_sidrolOptionalAttributes>;

export class tb_sidrol extends Model<tb_sidrolAttributes, tb_sidrolCreationAttributes> implements tb_sidrolAttributes {
  sidrol_sidrol!: number;
  sideba_sideba!: number;
  rolusu_rolusu!: number;
  flg_actualizar!: string;
  flg_eliminar!: string;
  flg_borrar!: string;
  flg_insertar!: string;
  flg_buscar!: string;

  // tb_sidrol belongsTo tb_rolusu via rolusu_rolusu
  rolusu_rolusu_tb_rolusu!: tb_rolusu;
  getRolusu_rolusu_tb_rolusu!: Sequelize.BelongsToGetAssociationMixin<tb_rolusu>;
  setRolusu_rolusu_tb_rolusu!: Sequelize.BelongsToSetAssociationMixin<tb_rolusu, tb_rolusuId>;
  createRolusu_rolusu_tb_rolusu!: Sequelize.BelongsToCreateAssociationMixin<tb_rolusu>;
  // tb_sidrol belongsTo tb_sideba via sideba_sideba
  sideba_sideba_tb_sideba!: tb_sideba;
  getSideba_sideba_tb_sideba!: Sequelize.BelongsToGetAssociationMixin<tb_sideba>;
  setSideba_sideba_tb_sideba!: Sequelize.BelongsToSetAssociationMixin<tb_sideba, tb_sidebaId>;
  createSideba_sideba_tb_sideba!: Sequelize.BelongsToCreateAssociationMixin<tb_sideba>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tb_sidrol {
    return tb_sidrol.init({
    sidrol_sidrol: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sideba_sideba: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_sideba',
        key: 'sideba_sideba'
      }
    },
    rolusu_rolusu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_rolusu',
        key: 'rolusu_rolusu'
      }
    },
    flg_actualizar: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "0"
    },
    flg_eliminar: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "0"
    },
    flg_borrar: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "0"
    },
    flg_insertar: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "0"
    },
    flg_buscar: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'tb_sidrol',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sidrol_sidrol" },
        ]
      },
      {
        name: "fk_sidrol_to_rolusu_idx",
        using: "BTREE",
        fields: [
          { name: "rolusu_rolusu" },
        ]
      },
      {
        name: "FK_SIDROL_to_sidgru_idx",
        using: "BTREE",
        fields: [
          { name: "sideba_sideba" },
        ]
      },
    ]
  });
  }
}
