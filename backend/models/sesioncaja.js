'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SesionCaja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SesionCaja.init({
    saldo_inicial: DataTypes.DECIMAL,
    fecha_abierto: DataTypes.DATE,
    fecha_cierre: DataTypes.DATE,
    saldo_cierre: DataTypes.DECIMAL,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SesionCaja',
  });
  return SesionCaja;
};