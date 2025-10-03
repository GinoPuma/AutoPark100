'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vehiculos', {
      vehiculo_id: {
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
      reserva_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Reservas",
          key: "reserva_id",
        },
      },
      placa: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      color: {
        type: Sequelize.STRING(50)
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
    await queryInterface.dropTable('Vehiculos');
  }
};