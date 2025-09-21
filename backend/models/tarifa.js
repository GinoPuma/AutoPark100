"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tarifa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
        references: {
          model: "VehiculoTipos",
          key: "vehiculo_tipo_id",
        },
      },
      precio_hora: {
        type: DataTypes.DECIMAL,
      },
      precio_dia: {
        type: DataTypes.DECIMAL,
      },
      precio_mes: {
        type: DataTypes.DECIMAL,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Tarifa",
    }
  );
  return Tarifa;
};
