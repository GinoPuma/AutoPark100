"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tarifa extends Model {
    static associate(models) {
      Tarifa.belongsTo(models.VehiculoTipo, { foreignKey: "vehiculo_tipo_id" });
      Tarifa.belongsTo(models.Cliente, { foreignKey: "cliente_id" });
      Tarifa.hasMany(models.Ticket, { foreignKey: "tarifa_id" });
    }
  }

  Tarifa.init(
    {
      tarifa_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      vehiculo_tipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      tipo_tarifa: {
        type: DataTypes.ENUM("hora", "dia", "mes"),
        allowNull: false,
      },

      precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      descripcion: {
        type: DataTypes.STRING(150),
      },
    },
    {
      sequelize,
      modelName: "Tarifa",
      tableName: "Tarifas",
      timestamps: true,
    }
  );

  return Tarifa;
};

