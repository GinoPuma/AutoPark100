'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      ticket_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      espacio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Espacios",
          key: "espacio_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      vehiculo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Vehiculos",
          key: "vehiculo_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tarifa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tarifas",
          key: "tarifa_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fecha_entrada: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_salida: {
        type: Sequelize.DATE
      },
      estado: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      monto_total: {
        type: Sequelize.DECIMAL(10, 2)
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
    await queryInterface.dropTable('Tickets');
  }
};