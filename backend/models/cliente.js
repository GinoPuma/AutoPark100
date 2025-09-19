'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cliente.belongsTo(models.Empresa, { foreignKey: 'empresa_id' });
      Cliente.hasMany(models.Reserva, { foreignKey: ' cliente_id' });
    }
  }
  Cliente.init({
    cliente_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    empresa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Empresas',
        key: 'empresa_id'
      }
    },
    doc_tipo: DataTypes.STRING(20),
    doc_num: {
      type: DataTypes.STRING,
      unique: true,
    },
    nombre: DataTypes.STRING(100),
    apellido: DataTypes.STRING(100),
    email: {
      type: DataTypes.STRING(200),
      unique: true
    },
    telefono: DataTypes.STRING(20)
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'Clientes',
    timestamps: true
  });
  return Cliente;
};