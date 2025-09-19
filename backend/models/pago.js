"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pago.belongsTo(models.MetodosPago, { foreignKey: "metodo_pago_id" });
      Pago.belongsTo(models.Ticket, { foreignKey: "ticket_id" });
      Pago.hasOne(models.MovimientoCaja, { foreignKey: "pago_id" });
    }
  }
  Pago.init(
    {
      pago_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      metodo_pago_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "MetodosPagos",
          key: "metodo_pago_id",
        },
      },

      ticket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Tickets",
          key: "ticket_id",
        },
      },

      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      referencia: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "Pago",
      tableName: "Pagos",
      timestamps: true,
    }
  );
  return Pago;
};
