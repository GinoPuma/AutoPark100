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
      Vehiculo.hasMany(models.Ticket, { foreignKey: "vehiculo_id" });
      Vehiculo.belongsTo(models.Reserva, { foreignKey: "reserva_id", allowNull: true });
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
      reserva_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Reservas",
          key: "reserva_id",
        },
      },
      placa: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
      },
      descripcion: {
        type: DataTypes.STRING(50),
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
