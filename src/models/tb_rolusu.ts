import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface tb_rolusuAttributes {
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

export type tb_rolusuPk = "rolusu_rolusu";
export type tb_rolusuId = tb_rolusu[tb_rolusuPk];
export type tb_rolusuOptionalAttributes = "rolusu_rolusu" | "rolusu_abrevi" | "rolusu_estado" | "rolusu_feccre" | "rolusu_usuact" | "rolusu_fecact" | "rolusu_usueli" | "rolusu_feceli";
export type tb_rolusuCreationAttributes = Optional<tb_rolusuAttributes, tb_rolusuOptionalAttributes>;

export class tb_rolusu extends Model<tb_rolusuAttributes, tb_rolusuCreationAttributes> implements tb_rolusuAttributes {
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


  static initModel(sequelize: Sequelize.Sequelize): typeof tb_rolusu {
    return tb_rolusu.init({
    rolusu_rolusu: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
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
    tableName: 'tb_rolusu',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rolusu_rolusu" },
        ]
      },
    ]
  });
  }
}
