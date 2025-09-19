"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MovimientoCajas", {
      movimiento_caja_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      sesion_caja_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "SesionesCajas",
          key: "sesion_caja_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      pago_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pagos",
          key: "pago_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      fecha_creacion: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      tipo: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      descripcion: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
    await queryInterface.dropTable("MovimientoCajas");
  },
};
