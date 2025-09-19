"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pagos", {
      pago_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      metodo_pago_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "MetodosPagos",
          key: "metodo_pago_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tickets",
          key: "ticket_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      referencia: {
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable("Pagos");
  },
};
