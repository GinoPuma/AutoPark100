'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tarifas', {
      tarifa_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehiculo_tipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "VehiculoTipos",
          key: "vehiculo_tipo_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      precio_hora: {
        type: Sequelize.DECIMAL(10, 2)
      },
      precio_dia: {
        type: Sequelize.DECIMAL(10, 2)
      },
      precio_mes: {
        type: Sequelize.DECIMAL(10, 2)
      },
      descripcion: {
        type: Sequelize.STRING(150)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tarifas');
  }
};