"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.Empresa, { foreignKey: "empresa_id" });
      Usuario.belongsTo(models.Rol, { foreignKey: "rol_id" });
      Usuario.hasMany(models.SesionCaja, { foreignKey: "usuario_id" });
    }
  }
  Usuario.init(
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Rols",
          key: "rol_id",
        },
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
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password:{
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'activo'
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios",
      timestamps: true,
    }
  );
  return Usuario;
};
