"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MovimientoCaja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MovimientoCaja.belongsTo(models.SesionCaja, {
        foreignKey: "sesion_caja_id",
      });
      MovimientoCaja.belongsTo(models.Pago, { foreignKey: "pago_id" });
    }
  }
  MovimientoCaja.init(
    {
      movimiento_caja_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      sesion_caja_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "SesionesCajas",
          key: "sesion_caja_id",
        },
      },

      pago_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pagos",
          key: "pago_id",
        },
      },

      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      descripcion: DataTypes.STRING(100),
      monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "MovimientoCaja",
      tableName: "MovimientoCajas",
      timestamps: true,
    }
  );
  return MovimientoCaja;
};
