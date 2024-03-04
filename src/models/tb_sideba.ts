import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tb_sideba_grupo, tb_sideba_grupoId } from './tb_sideba_grupo';
import type { tb_sidrol, tb_sidrolId } from './tb_sidrol';

export interface tb_sidebaAttributes {
  sideba_sideba: number;
  sideba_sidgru: number;
  sideba_nombre: string;
  sideba_iconox?: string;
  sideba_ventan: string;
  sideba_ordvis: number;
  sideba_estado: 'A' | 'I' | 'E';
  sideba_usucre: number;
  sideba_feccre: Date;
  sideba_usuact?: number;
  sideba_fecact?: Date;
  sideba_usueli?: number;
  sideba_feceli?: Date;
}

export type tb_sidebaPk = "sideba_sideba";
export type tb_sidebaId = tb_sideba[tb_sidebaPk];
export type tb_sidebaOptionalAttributes = "sideba_sideba" | "sideba_iconox" | "sideba_estado" | "sideba_feccre" | "sideba_usuact" | "sideba_fecact" | "sideba_usueli" | "sideba_feceli";
export type tb_sidebaCreationAttributes = Optional<tb_sidebaAttributes, tb_sidebaOptionalAttributes>;

export class tb_sideba extends Model<tb_sidebaAttributes, tb_sidebaCreationAttributes> implements tb_sidebaAttributes {
  sideba_sideba!: number;
  sideba_sidgru!: number;
  sideba_nombre!: string;
  sideba_iconox?: string;
  sideba_ventan!: string;
  sideba_ordvis!: number;
  sideba_estado!: 'A' | 'I' | 'E';
  sideba_usucre!: number;
  sideba_feccre!: Date;
  sideba_usuact?: number;
  sideba_fecact?: Date;
  sideba_usueli?: number;
  sideba_feceli?: Date;

  // tb_sideba hasMany tb_sidrol via sideba_sideba
  tb_sidrols!: tb_sidrol[];
  getTb_sidrols!: Sequelize.HasManyGetAssociationsMixin<tb_sidrol>;
  setTb_sidrols!: Sequelize.HasManySetAssociationsMixin<tb_sidrol, tb_sidrolId>;
  addTb_sidrol!: Sequelize.HasManyAddAssociationMixin<tb_sidrol, tb_sidrolId>;
  addTb_sidrols!: Sequelize.HasManyAddAssociationsMixin<tb_sidrol, tb_sidrolId>;
  createTb_sidrol!: Sequelize.HasManyCreateAssociationMixin<tb_sidrol>;
  removeTb_sidrol!: Sequelize.HasManyRemoveAssociationMixin<tb_sidrol, tb_sidrolId>;
  removeTb_sidrols!: Sequelize.HasManyRemoveAssociationsMixin<tb_sidrol, tb_sidrolId>;
  hasTb_sidrol!: Sequelize.HasManyHasAssociationMixin<tb_sidrol, tb_sidrolId>;
  hasTb_sidrols!: Sequelize.HasManyHasAssociationsMixin<tb_sidrol, tb_sidrolId>;
  countTb_sidrols!: Sequelize.HasManyCountAssociationsMixin;
  // tb_sideba belongsTo tb_sideba_grupo via sideba_sidgru
  sideba_sidgru_tb_sideba_grupo!: tb_sideba_grupo;
  getSideba_sidgru_tb_sideba_grupo!: Sequelize.BelongsToGetAssociationMixin<tb_sideba_grupo>;
  setSideba_sidgru_tb_sideba_grupo!: Sequelize.BelongsToSetAssociationMixin<tb_sideba_grupo, tb_sideba_grupoId>;
  createSideba_sidgru_tb_sideba_grupo!: Sequelize.BelongsToCreateAssociationMixin<tb_sideba_grupo>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tb_sideba {
    return tb_sideba.init({
    sideba_sideba: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sideba_sidgru: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tb_sideba_grupo',
        key: 'sidgru_sidgru'
      }
    },
    sideba_nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sideba_iconox: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    sideba_ventan: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sideba_ordvis: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sideba_estado: {
      type: DataTypes.ENUM('A','I','E'),
      allowNull: false,
      defaultValue: "A"
    },
    sideba_usucre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sideba_feccre: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    sideba_usuact: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sideba_fecact: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sideba_usueli: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sideba_feceli: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_sideba',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sideba_sideba" },
        ]
      },
      {
        name: "fk_sideba_to_sidgru_idx",
        using: "BTREE",
        fields: [
          { name: "sideba_sidgru" },
        ]
      },
    ]
  });
  }
}
