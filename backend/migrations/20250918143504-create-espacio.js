'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Espacios', {
      espacio_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      zona_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Zonas",
          key: "zona_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      numero: {
        type: Sequelize.STRING(20),
        allowNull: false
      },

      estado: {
        type: Sequelize.STRING(20),
        defaultValue: "libre",
        allowNull: false
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
    await queryInterface.dropTable('Espacios');
  }
};