"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MetodosPago extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MetodosPago.hasMany(models.Pago, { foreignKey: "metodo_pago_id" });
    }
  }
  MetodosPago.init(
    {
      metodo_pago_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "MetodosPago",
      tableName: "MetodosPagos",
      timestamps: true,
    }
  );
  return MetodosPago;
};
