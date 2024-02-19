import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vw_companAttributes {
  compan_compan: number;
  compan_numdoc: string;
  compan_nombre: string;
  compan_direcc: string;
  compan_estado: number;
  compan_usucre: number;
  compan_feccre: Date;
  compan_usuact?: number;
  compan_fecact?: Date;
  compan_usueli?: number;
  compan_feceli?: Date;
}

export type vw_companOptionalAttributes = "compan_compan" | "compan_usuact" | "compan_fecact" | "compan_usueli" | "compan_feceli";
export type vw_companCreationAttributes = Optional<vw_companAttributes, vw_companOptionalAttributes>;

export class vw_compan extends Model<vw_companAttributes, vw_companCreationAttributes> implements vw_companAttributes {
  compan_compan!: number;
  compan_numdoc!: string;
  compan_nombre!: string;
  compan_direcc!: string;
  compan_estado!: number;
  compan_usucre!: number;
  compan_feccre!: Date;
  compan_usuact?: number;
  compan_fecact?: Date;
  compan_usueli?: number;
  compan_feceli?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof vw_compan {
    return vw_compan.init({
    compan_compan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    compan_numdoc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    compan_nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    compan_direcc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    compan_estado: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false
    },
    compan_usucre: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    compan_feccre: {
      type: DataTypes.DATE,
      allowNull: false
    },
    compan_usuact: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    compan_fecact: {
      type: DataTypes.DATE,
      allowNull: true
    },
    compan_usueli: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    compan_feceli: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vw_compan',
    timestamps: false
  });
  }
}
