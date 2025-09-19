"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clientes", {
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      empresa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Empresas",
          key: "empresa_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      doc_tipo: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      doc_num: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      nombre: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      apellido: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING(200),
        allowNull: true,
        unique: true,
      },

      telefono: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },

      createdAt: { 
        type: Sequelize.DATE,
        allowNull: false 
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false 
      }
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Clientes");
  },
};
