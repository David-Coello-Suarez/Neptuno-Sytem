import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tb_sideba, tb_sidebaId } from './tb_sideba';

export interface tb_sideba_grupoAttributes {
  sidgru_sidgru: number;
  sidgru_nombre: string;
  sidgru_iconox?: string;
  sidgru_ordvis: number;
  sidgru_idpadr: number;
  sidgru_esmenu: 'S' | 'N';
  sidgru_estado: 'A' | 'I' | 'E';
  sidgru_usucre: number;
  sidgru_feccre: Date;
  sidgru_usuact?: number;
  sidgru_fecact?: Date;
  sidgru_usueli?: number;
  sidgru_feceli?: Date;
}

export type tb_sideba_grupoPk = "sidgru_sidgru";
export type tb_sideba_grupoId = tb_sideba_grupo[tb_sideba_grupoPk];
export type tb_sideba_grupoOptionalAttributes = "sidgru_sidgru" | "sidgru_iconox" | "sidgru_idpadr" | "sidgru_esmenu" | "sidgru_estado" | "sidgru_feccre" | "sidgru_usuact" | "sidgru_fecact" | "sidgru_usueli" | "sidgru_feceli";
export type tb_sideba_grupoCreationAttributes = Optional<tb_sideba_grupoAttributes, tb_sideba_grupoOptionalAttributes>;

export class tb_sideba_grupo extends Model<tb_sideba_grupoAttributes, tb_sideba_grupoCreationAttributes> implements tb_sideba_grupoAttributes {
  sidgru_sidgru!: number;
  sidgru_nombre!: string;
  sidgru_iconox?: string;
  sidgru_ordvis!: number;
  sidgru_idpadr!: number;
  sidgru_esmenu!: 'S' | 'N';
  sidgru_estado!: 'A' | 'I' | 'E';
  sidgru_usucre!: number;
  sidgru_feccre!: Date;
  sidgru_usuact?: number;
  sidgru_fecact?: Date;
  sidgru_usueli?: number;
  sidgru_feceli?: Date;

  // tb_sideba_grupo hasMany tb_sideba via sideba_sidgru
  tb_sidebas!: tb_sideba[];
  getTb_sidebas!: Sequelize.HasManyGetAssociationsMixin<tb_sideba>;
  setTb_sidebas!: Sequelize.HasManySetAssociationsMixin<tb_sideba, tb_sidebaId>;
  addTb_sideba!: Sequelize.HasManyAddAssociationMixin<tb_sideba, tb_sidebaId>;
  addTb_sidebas!: Sequelize.HasManyAddAssociationsMixin<tb_sideba, tb_sidebaId>;
  createTb_sideba!: Sequelize.HasManyCreateAssociationMixin<tb_sideba>;
  removeTb_sideba!: Sequelize.HasManyRemoveAssociationMixin<tb_sideba, tb_sidebaId>;
  removeTb_sidebas!: Sequelize.HasManyRemoveAssociationsMixin<tb_sideba, tb_sidebaId>;
  hasTb_sideba!: Sequelize.HasManyHasAssociationMixin<tb_sideba, tb_sidebaId>;
  hasTb_sidebas!: Sequelize.HasManyHasAssociationsMixin<tb_sideba, tb_sidebaId>;
  countTb_sidebas!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof tb_sideba_grupo {
    return tb_sideba_grupo.init({
    sidgru_sidgru: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sidgru_nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sidgru_iconox: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sidgru_ordvis: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sidgru_idpadr: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sidgru_esmenu: {
      type: DataTypes.ENUM('S','N'),
      allowNull: false,
      defaultValue: "N"
    },
    sidgru_estado: {
      type: DataTypes.ENUM('A','I','E'),
      allowNull: false,
      defaultValue: "A"
    },
    sidgru_usucre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sidgru_feccre: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    sidgru_usuact: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sidgru_fecact: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sidgru_usueli: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sidgru_feceli: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_sideba_grupo',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sidgru_sidgru" },
        ]
      },
    ]
  });
  }
}
