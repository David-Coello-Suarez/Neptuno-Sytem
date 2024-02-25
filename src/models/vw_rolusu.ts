import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vw_rolusuAttributes {
  rolusu_rolusu: number;
  rolusu_descri: string;
  rolusu_abrevi?: string;
  rolusu_estado: 'A' | 'I' | 'E';
  rolusu_usucre: number;
  rolusu_feccre: Date;
  rolusu_usuact?: number;
  rolusu_fecact?: Date;
  rolusu_usueli?: number;
  rolusu_feceli?: Date;
}

export type vw_rolusuOptionalAttributes = "rolusu_rolusu" | "rolusu_abrevi" | "rolusu_estado" | "rolusu_feccre" | "rolusu_usuact" | "rolusu_fecact" | "rolusu_usueli" | "rolusu_feceli";
export type vw_rolusuCreationAttributes = Optional<vw_rolusuAttributes, vw_rolusuOptionalAttributes>;

export class vw_rolusu extends Model<vw_rolusuAttributes, vw_rolusuCreationAttributes> implements vw_rolusuAttributes {
  rolusu_rolusu!: number;
  rolusu_descri!: string;
  rolusu_abrevi?: string;
  rolusu_estado!: 'A' | 'I' | 'E';
  rolusu_usucre!: number;
  rolusu_feccre!: Date;
  rolusu_usuact?: number;
  rolusu_fecact?: Date;
  rolusu_usueli?: number;
  rolusu_feceli?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof vw_rolusu {
    return vw_rolusu.init({
    rolusu_rolusu: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rolusu_descri: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "NOMBRE"
    },
    rolusu_abrevi: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "ABREVIATURA"
    },
    rolusu_estado: {
      type: DataTypes.ENUM('A','I','E'),
      allowNull: false,
      defaultValue: "A",
      comment: "A: ACTIVO, I: INACTIVO, E: ELIMINADO"
    },
    rolusu_usucre: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "USUARIO CREACIÓN"
    },
    rolusu_feccre: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "FECHA CREACIÓN"
    },
    rolusu_usuact: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "USUARIO ACTUALIZACIÓN"
    },
    rolusu_fecact: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "FECHA ACTUALIZACIÓN"
    },
    rolusu_usueli: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "USUARIO ELIMINA"
    },
    rolusu_feceli: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "FECHA ELIMINA"
    }
  }, {
    sequelize,
    tableName: 'vw_rolusu',
    timestamps: false
  });
  }
}
