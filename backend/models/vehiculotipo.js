"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class VehiculoTipo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VehiculoTipo.hasMany(models.Tarifa, { foreignKey: "vehiculo_tipo_id" });
      VehiculoTipo.hasMany(models.Vehiculo, { foreignKey: "vehiculo_tipo_id" });
    }
  }
  VehiculoTipo.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombre: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "VehiculoTipo",
    }
  );
  return VehiculoTipo;
};
