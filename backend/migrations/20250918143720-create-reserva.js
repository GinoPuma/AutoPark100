"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservas", {
      reserva_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Clientes",
          key: "cliente_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      sede_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Sedes",
          key: "sede_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

      inicio_reserva: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      fin_reserva: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      estado: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },

      anticipo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reservas");
  },
};
