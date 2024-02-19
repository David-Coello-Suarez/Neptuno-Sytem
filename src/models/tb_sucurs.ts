import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { tb_compan_sucurs, tb_compan_sucursId } from './tb_compan_sucurs';
import type { tb_estado, tb_estadoId } from './tb_estado';

export interface tb_sucursAttributes {
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

export type tb_sucursPk = "sucurs_sucurs";
export type tb_sucursId = tb_sucurs[tb_sucursPk];
export type tb_sucursOptionalAttributes = "sucurs_feccre" | "sucurs_usuact" | "sucurs_fecact" | "sucurs_usueli" | "sucurs_feceli";
export type tb_sucursCreationAttributes = Optional<tb_sucursAttributes, tb_sucursOptionalAttributes>;

export class tb_sucurs extends Model<tb_sucursAttributes, tb_sucursCreationAttributes> implements tb_sucursAttributes {
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

  // tb_sucurs belongsTo tb_estado via sucurs_estado
  sucurs_estado_tb_estado!: tb_estado;
  getSucurs_estado_tb_estado!: Sequelize.BelongsToGetAssociationMixin<tb_estado>;
  setSucurs_estado_tb_estado!: Sequelize.BelongsToSetAssociationMixin<tb_estado, tb_estadoId>;
  createSucurs_estado_tb_estado!: Sequelize.BelongsToCreateAssociationMixin<tb_estado>;
  // tb_sucurs hasMany tb_compan_sucurs via sucurs_sucrs
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

  static initModel(sequelize: Sequelize.Sequelize): typeof tb_sucurs {
    return tb_sucurs.init({
    sucurs_sucurs: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull: false,
      primaryKey: true
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
      allowNull: false,
      references: {
        model: 'tb_estado',
        key: 'estado_estado'
      }
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
    tableName: 'tb_sucurs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sucurs_sucurs" },
        ]
      },
      {
        name: "fk_sucurs_to_estado_idx",
        using: "BTREE",
        fields: [
          { name: "sucurs_estado" },
        ]
      },
    ]
  });
  }
}
