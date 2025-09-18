"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Zona extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Zona.belongsTo(models.Sede, { foreignKey: "sede_id" });
      Zona.hasMany(models.Espacio, { foreignKey: "zona_id" });
    }
  }
  Zona.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sede_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Sedes",
          key: "sede_id",
        },
      },
      nombre: {
        type: DataTypes.STRING,
      },
      descripcion: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Zona",
      tableName: "Zonas",
      timestamps: true,
    }
  );
  return Zona;
};
