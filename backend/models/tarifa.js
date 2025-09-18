'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarifa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tarifa.init({
    precio_hora: DataTypes.DECIMAL,
    precio_dia: DataTypes.DECIMAL,
    precio_mes: DataTypes.DECIMAL,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tarifa',
  });
  return Tarifa;
};