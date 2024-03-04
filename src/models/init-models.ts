import type { Sequelize } from "sequelize";
import { tb_compan as _tb_compan } from "./tb_compan";
import type { tb_companAttributes, tb_companCreationAttributes } from "./tb_compan";
import { tb_compan_sucurs as _tb_compan_sucurs } from "./tb_compan_sucurs";
import type { tb_compan_sucursAttributes, tb_compan_sucursCreationAttributes } from "./tb_compan_sucurs";
import { tb_estado as _tb_estado } from "./tb_estado";
import type { tb_estadoAttributes, tb_estadoCreationAttributes } from "./tb_estado";
import { tb_rolusu as _tb_rolusu } from "./tb_rolusu";
import type { tb_rolusuAttributes, tb_rolusuCreationAttributes } from "./tb_rolusu";
import { tb_sideba as _tb_sideba } from "./tb_sideba";
import type { tb_sidebaAttributes, tb_sidebaCreationAttributes } from "./tb_sideba";
import { tb_sideba_grupo as _tb_sideba_grupo } from "./tb_sideba_grupo";
import type { tb_sideba_grupoAttributes, tb_sideba_grupoCreationAttributes } from "./tb_sideba_grupo";
import { tb_sidrol as _tb_sidrol } from "./tb_sidrol";
import type { tb_sidrolAttributes, tb_sidrolCreationAttributes } from "./tb_sidrol";
import { tb_sucurs as _tb_sucurs } from "./tb_sucurs";
import type { tb_sucursAttributes, tb_sucursCreationAttributes } from "./tb_sucurs";
import { vw_compan as _vw_compan } from "./vw_compan";
import type { vw_companAttributes, vw_companCreationAttributes } from "./vw_compan";
import { vw_menu_acceso as _vw_menu_acceso } from "./vw_menu_acceso";
import type { vw_menu_accesoAttributes, vw_menu_accesoCreationAttributes } from "./vw_menu_acceso";
import { vw_rolusu as _vw_rolusu } from "./vw_rolusu";
import type { vw_rolusuAttributes, vw_rolusuCreationAttributes } from "./vw_rolusu";
import { vw_sucurs as _vw_sucurs } from "./vw_sucurs";
import type { vw_sucursAttributes, vw_sucursCreationAttributes } from "./vw_sucurs";

export {
  _tb_compan as tb_compan,
  _tb_compan_sucurs as tb_compan_sucurs,
  _tb_estado as tb_estado,
  _tb_rolusu as tb_rolusu,
  _tb_sideba as tb_sideba,
  _tb_sideba_grupo as tb_sideba_grupo,
  _tb_sidrol as tb_sidrol,
  _tb_sucurs as tb_sucurs,
  _vw_compan as vw_compan,
  _vw_menu_acceso as vw_menu_acceso,
  _vw_rolusu as vw_rolusu,
  _vw_sucurs as vw_sucurs,
};

export type {
  tb_companAttributes,
  tb_companCreationAttributes,
  tb_compan_sucursAttributes,
  tb_compan_sucursCreationAttributes,
  tb_estadoAttributes,
  tb_estadoCreationAttributes,
  tb_rolusuAttributes,
  tb_rolusuCreationAttributes,
  tb_sidebaAttributes,
  tb_sidebaCreationAttributes,
  tb_sideba_grupoAttributes,
  tb_sideba_grupoCreationAttributes,
  tb_sidrolAttributes,
  tb_sidrolCreationAttributes,
  tb_sucursAttributes,
  tb_sucursCreationAttributes,
  vw_companAttributes,
  vw_companCreationAttributes,
  vw_menu_accesoAttributes,
  vw_menu_accesoCreationAttributes,
  vw_rolusuAttributes,
  vw_rolusuCreationAttributes,
  vw_sucursAttributes,
  vw_sucursCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const tb_compan = _tb_compan.initModel(sequelize);
  const tb_compan_sucurs = _tb_compan_sucurs.initModel(sequelize);
  const tb_estado = _tb_estado.initModel(sequelize);
  const tb_rolusu = _tb_rolusu.initModel(sequelize);
  const tb_sideba = _tb_sideba.initModel(sequelize);
  const tb_sideba_grupo = _tb_sideba_grupo.initModel(sequelize);
  const tb_sidrol = _tb_sidrol.initModel(sequelize);
  const tb_sucurs = _tb_sucurs.initModel(sequelize);
  const vw_compan = _vw_compan.initModel(sequelize);
  const vw_menu_acceso = _vw_menu_acceso.initModel(sequelize);
  const vw_rolusu = _vw_rolusu.initModel(sequelize);
  const vw_sucurs = _vw_sucurs.initModel(sequelize);

  tb_compan_sucurs.belongsTo(tb_compan, { as: "compan_compan_tb_compan", foreignKey: "compan_compan"});
  tb_compan.hasMany(tb_compan_sucurs, { as: "tb_compan_sucurs", foreignKey: "compan_compan"});
  tb_compan.belongsTo(tb_estado, { as: "compan_estado_tb_estado", foreignKey: "compan_estado"});
  tb_estado.hasMany(tb_compan, { as: "tb_compans", foreignKey: "compan_estado"});
  tb_sucurs.belongsTo(tb_estado, { as: "sucurs_estado_tb_estado", foreignKey: "sucurs_estado"});
  tb_estado.hasMany(tb_sucurs, { as: "tb_sucurs", foreignKey: "sucurs_estado"});
  tb_sidrol.belongsTo(tb_rolusu, { as: "rolusu_rolusu_tb_rolusu", foreignKey: "rolusu_rolusu"});
  tb_rolusu.hasMany(tb_sidrol, { as: "tb_sidrols", foreignKey: "rolusu_rolusu"});
  tb_sidrol.belongsTo(tb_sideba, { as: "sideba_sideba_tb_sideba", foreignKey: "sideba_sideba"});
  tb_sideba.hasMany(tb_sidrol, { as: "tb_sidrols", foreignKey: "sideba_sideba"});
  tb_sideba.belongsTo(tb_sideba_grupo, { as: "sideba_sidgru_tb_sideba_grupo", foreignKey: "sideba_sidgru"});
  tb_sideba_grupo.hasMany(tb_sideba, { as: "tb_sidebas", foreignKey: "sideba_sidgru"});
  tb_compan_sucurs.belongsTo(tb_sucurs, { as: "sucurs_sucrs_tb_sucur", foreignKey: "sucurs_sucrs"});
  tb_sucurs.hasMany(tb_compan_sucurs, { as: "tb_compan_sucurs", foreignKey: "sucurs_sucrs"});

  return {
    tb_compan: tb_compan,
    tb_compan_sucurs: tb_compan_sucurs,
    tb_estado: tb_estado,
    tb_rolusu: tb_rolusu,
    tb_sideba: tb_sideba,
    tb_sideba_grupo: tb_sideba_grupo,
    tb_sidrol: tb_sidrol,
    tb_sucurs: tb_sucurs,
    vw_compan: vw_compan,
    vw_menu_acceso: vw_menu_acceso,
    vw_rolusu: vw_rolusu,
    vw_sucurs: vw_sucurs,
  };
}
