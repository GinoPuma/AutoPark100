"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SesionCaja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SesionCaja.belongsTo(models.Usuario, { foreignKey: "usuario_id" });
      SesionCaja.hasMany(models.MovimientoCaja, {
        foreignKey: "sesion_caja_id",
      });
    }
  }
  SesionCaja.init(
    {
      sesion_caja_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "usuario_id",
        },
      },
      saldo_inicial: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      fecha_abierto: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fecha_cierre: {
        type: DataTypes.DATE,
      },
      saldo_cierre: {
        type: DataTypes.DECIMAL(10, 2),
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "SesionCaja",
      tableName: "SesionCajas",
      timestamps: true,
    }
  );
  return SesionCaja;
};
