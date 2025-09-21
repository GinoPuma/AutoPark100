"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ticket.belongsTo(models.Espacio, { foreignKey: "espacio_id" });
      Ticket.belongsTo(models.Vehiculo, { foreignKey: "vehiculo_id" });
      Ticket.belongsTo(models.Tarifa, { foreignKey: "tarifa_id" });
      Ticket.hasMany(models.Pago, { foreignKey: "ticket_id" });
    }
  }
  Ticket.init(
    {
      ticket_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      espacio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Espacios",
          key: "espacio_id",
        },
      },
      vehiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Vehiculos",
          key: "vehiculo_id",
        },
      },
      tarifa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tarifas",
          key: "tarifa_id",
        },
      },
      fecha_entrada: {
        type: DataTypes.DATE,
        allowNull: false
      },
      fecha_salida: {
        type: DataTypes.DATE,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false
      },
      monto_total: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      sequelize,
      modelName: "Ticket",
      tableName: "Tickets",
      timestamps: true,
    }
  );
  return Ticket;
};
