import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tb_compan_sucurs, tb_compan_sucursId } from './tb_compan_sucurs';
import type { tb_estado, tb_estadoId } from './tb_estado';

export interface tb_companAttributes {
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

export type tb_companPk = "compan_compan";
export type tb_companId = tb_compan[tb_companPk];
export type tb_companOptionalAttributes = "compan_compan" | "compan_usuact" | "compan_fecact" | "compan_usueli" | "compan_feceli";
export type tb_companCreationAttributes = Optional<tb_companAttributes, tb_companOptionalAttributes>;

export class tb_compan extends Model<tb_companAttributes, tb_companCreationAttributes> implements tb_companAttributes {
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

  // tb_compan hasMany tb_compan_sucurs via compan_compan
  tb_compan_sucurs!: tb_compan_sucurs[];
  getTb_compan_sucurs!: Sequelize.HasManyGetAssociationsMixin<tb_compan_sucurs>;
  setTb_compan_sucurs!: Sequelize.HasManySetAssociationsMixin<tb_compan_sucurs, tb_compan_sucursId>;
  addTb_compan_sucur!: Sequelize.HasManyAddAssociationMixin<tb_compan_sucurs, tb_compan_sucursId>;
  addTb_compan_sucurs!: Sequelize.HasManyAddAssociationsMixin<tb_compan_sucurs, tb_compan_sucursId>;
  createTb_compan_sucur!: Sequelize.HasManyCreateAssociationMixin<tb_compan_sucurs>;
  removeTb_compan_sucur!: Sequelize.HasManyRemoveAssociationMixin<tb_compan_sucurs, tb_compan_sucursId>;
  removeTb_compan_sucurs!: Sequelize.HasManyRemoveAssociationsMixin<tb_compan_sucurs, tb_compan_sucursId>;
  hasTb_compan_sucur!: Sequelize.HasManyHasAssociationMixin<tb_compan_sucurs, tb_compan_sucursId>;
  hasTb_compan_sucurs!: Sequelize.HasManyHasAssociationsMixin<tb_compan_sucurs, tb_compan_sucursId>;
  countTb_compan_sucurs!: Sequelize.HasManyCountAssociationsMixin;
  // tb_compan belongsTo tb_estado via compan_estado
  compan_estado_tb_estado!: tb_estado;
  getCompan_estado_tb_estado!: Sequelize.BelongsToGetAssociationMixin<tb_estado>;
  setCompan_estado_tb_estado!: Sequelize.BelongsToSetAssociationMixin<tb_estado, tb_estadoId>;
  createCompan_estado_tb_estado!: Sequelize.BelongsToCreateAssociationMixin<tb_estado>;

  static initModel(sequelize: Sequelize.Sequelize): typeof tb_compan {
    return tb_compan.init({
    compan_compan: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
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
      allowNull: false,
      references: {
        model: 'tb_estado',
        key: 'estado_estado'
      }
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
    tableName: 'tb_compan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "compan_compan" },
        ]
      },
      {
        name: "fk_compan_to_estado_idx",
        using: "BTREE",
        fields: [
          { name: "compan_estado" },
        ]
      },
    ]
  });
  }
}
