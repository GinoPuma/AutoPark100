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
      vehiculo_tipo_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING(150),
      },
    },
    {
      sequelize,
      modelName: "VehiculoTipo",
      tableName: "VehiculoTipos",
      timestamps: true,
    }
  );
  return VehiculoTipo;
};
