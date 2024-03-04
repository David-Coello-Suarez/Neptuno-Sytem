import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vw_menu_accesoAttributes {
  sideba_sidgru: number;
  sideba_sideba: number;
  sideba_nombre: string;
  sideba_iconox?: string;
  sideba_ventan: string;
  sideba_ordvis: number;
  sideba_estado: 'A' | 'I' | 'E';
}

export type vw_menu_accesoOptionalAttributes = "sideba_sideba" | "sideba_iconox" | "sideba_estado";
export type vw_menu_accesoCreationAttributes = Optional<vw_menu_accesoAttributes, vw_menu_accesoOptionalAttributes>;

export class vw_menu_acceso extends Model<vw_menu_accesoAttributes, vw_menu_accesoCreationAttributes> implements vw_menu_accesoAttributes {
  sideba_sidgru!: number;
  sideba_sideba!: number;
  sideba_nombre!: string;
  sideba_iconox?: string;
  sideba_ventan!: string;
  sideba_ordvis!: number;
  sideba_estado!: 'A' | 'I' | 'E';


  static initModel(sequelize: Sequelize.Sequelize): typeof vw_menu_acceso {
    return vw_menu_acceso.init({
    sideba_sidgru: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sideba_sideba: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    }
  }, {
    sequelize,
    tableName: 'vw_menu_acceso',
    timestamps: false
  });
  }
}
