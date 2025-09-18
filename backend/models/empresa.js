"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Empresa.hasMany(models.Sede, { foreignKey: "empresa_id" });
      Empresa.hasMany(models.Cliente, { foreignKey: "empresa_id" });
      Empresa.hasMany(models.Usuario, { foreignKey: "empresa_id" });
    }
  }
  Empresa.init(
    {
      empresa_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ruc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      razon_social: { 
        type: DataTypes.STRING,
        allowNull: false },
    },
    {
      sequelize,
      modelName: "Empresa",
      tableName: "Empresas",
      timestamps: true,
    }
  );
  return Empresa;
};
