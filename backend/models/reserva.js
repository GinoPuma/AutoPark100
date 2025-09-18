'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reserva.init({
    inicio_reserva: DataTypes.DATE,
    fin_reserva: DataTypes.DATE,
    estado: DataTypes.STRING,
    anticipo: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};