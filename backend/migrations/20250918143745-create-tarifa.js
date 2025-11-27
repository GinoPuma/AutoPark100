"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tarifas", {
      tarifa_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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

      tipo_tarifa: {
        type: Sequelize.ENUM("hora", "dia", "mes"),
        allowNull: false,
      },

      precio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },

      descripcion: {
        type: Sequelize.STRING(150),
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tarifas");
  },
};
