"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Espacio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Espacio.belongsTo(models.Zona, { foreignKey: "zona_id" });
      Espacio.hasOne(models.Reserva, { foreignKey: "espacio_id" });
      Espacio.hasOne(models.Ticket, { foreignKey: "espacio_id" });
    }
  }
  Espacio.init(
    {
      espacio_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      zona_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Zonas",
          key: "zona_id",
        },
      },

      numero: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      estado: {
        type: DataTypes.STRING(20),
        defaultValue: "libre",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Espacio",
      tableName: "Espacios",
      timestamps: true,
    }
  );
  return Espacio;
};
