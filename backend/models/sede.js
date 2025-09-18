"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sede extends Model {
    static associate(models) {
      Sede.belongsTo(models.Empresa, { foreignKey: "empresa_id" });
      Sede.hasMany(models.Zona, { foreignKey: "sede_id" });
      Sede.hasMany(models.Reserva, { foreignKey: "sede_id" });
    }
  }
  Sede.init(
    {
      sede_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Empresas",
          key: "empresa_id",
        },
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Sede",
      tableName: "Sedes",
      timestamps: true,
    }
  );
  return Sede;
};
