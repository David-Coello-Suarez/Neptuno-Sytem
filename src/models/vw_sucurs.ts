import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vw_sucursAttributes {
  sucurs_sucurs: number;
  sucurs_numdoc: string;
  sucurs_nombre: string;
  sucurs_direcc: string;
  sucurs_estado: number;
  sucurs_usucre: number;
  sucurs_feccre: Date;
  sucurs_usuact?: number;
  sucurs_fecact?: Date;
  sucurs_usueli?: number;
  sucurs_feceli?: Date;
}

export type vw_sucursOptionalAttributes = "sucurs_feccre" | "sucurs_usuact" | "sucurs_fecact" | "sucurs_usueli" | "sucurs_feceli";
export type vw_sucursCreationAttributes = Optional<vw_sucursAttributes, vw_sucursOptionalAttributes>;

export class vw_sucurs extends Model<vw_sucursAttributes, vw_sucursCreationAttributes> implements vw_sucursAttributes {
  sucurs_sucurs!: number;
  sucurs_numdoc!: string;
  sucurs_nombre!: string;
  sucurs_direcc!: string;
  sucurs_estado!: number;
  sucurs_usucre!: number;
  sucurs_feccre!: Date;
  sucurs_usuact?: number;
  sucurs_fecact?: Date;
  sucurs_usueli?: number;
  sucurs_feceli?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof vw_sucurs {
    return vw_sucurs.init({
    sucurs_sucurs: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false
    },
    sucurs_numdoc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sucurs_nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sucurs_direcc: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    sucurs_estado: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false
    },
    sucurs_usucre: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false
    },
    sucurs_feccre: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    sucurs_usuact: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sucurs_fecact: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sucurs_usueli: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sucurs_feceli: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vw_sucurs',
    timestamps: false
  });
  }
}
