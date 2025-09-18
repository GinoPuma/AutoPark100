'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovimientoCaja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MovimientoCaja.init({
    fecha_creacion: DataTypes.DATE,
    tipo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    monto: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'MovimientoCaja',
  });
  return MovimientoCaja;
};