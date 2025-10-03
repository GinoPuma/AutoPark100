"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reserva.belongsTo(models.Cliente, { foreignKey: "cliente_id" });
      Reserva.belongsTo(models.Sede, { foreignKey: "sede_id" });
      Reserva.belongsTo(models.Espacio, { foreignKey: "espacio_id" });
      Reserva.hasMany(models.Vehiculo, { foreignKey: "reserva_id" });
    }
  }
  Reserva.init(
    {
      reserva_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Clientes",
          key: "cliente_id",
        },
      },
      sede_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Sedes",
          key: "sede_id",
        },
      },
      espacio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Espacios",
          key: "espacio_id",
        },
      },

      inicio_reserva: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      fin_reserva: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      anticipo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Reserva",
      tableName: "Reservas",
      timestamps: true,
    }
  );
  return Reserva;
};
