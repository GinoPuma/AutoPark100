"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehiculo.belongsTo(models.VehiculoTipo, {
        foreignKey: "vehiculo_tipo_id",
      });
      Vehiculo.belongsTo(models.Cliente, { foreignKey: "cliente_id" });
      Vehiculo.hasMany(models.Ticket, { foreignKey: "vehiculo_id" });
    }
  }
  Vehiculo.init(
    {
      vehiculo_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      vehiculo_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "VehiculoTipos",
          key: "vehiculo_tipo_id",
        },
      },
      cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Clientes",
          key: "cliente_id",
        },
      },
      placa: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Vehiculo",
      tableName: "Vehiculos",
      timestamps: true,
    }
  );
  return Vehiculo;
};
