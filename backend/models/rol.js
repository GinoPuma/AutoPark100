"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasMany(models.Usuario, { foreignKey: "rol_id" });
    }
  }
  Rol.init(
    {
      rol_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.VARCHAR(100),
      },
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "Roles",
      timestamps: true,
    }
  );
  return Rol;
};
