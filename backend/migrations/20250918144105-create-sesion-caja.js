'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SesionCajas', {
      sesion_caja_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "usuario_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      saldo_inicial: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull:false
      },
      fecha_abierto: {
        type: Sequelize.DATE,
        allowNull:false
      },
      fecha_cierre: {
        type: Sequelize.DATE
      },
      saldo_cierre: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull:false
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull:false
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
    await queryInterface.dropTable('SesionCajas');
  }
};