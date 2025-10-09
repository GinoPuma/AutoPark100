"use strict";

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Empresas",
      [
        {
          ruc: "20123456789",
          razon_social: "Compañía Ejemplo S.A.C.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ruc: "20456789012",
          razon_social: "Logística y Servicios Integrales S.A.C.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ruc: "20567890123",
          razon_social: "Transporte Nacional del Perú S.R.L.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ruc: "20678901234",
          razon_social: "Almacenes del Sur E.I.R.L.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ruc: "20789012345",
          razon_social: "Distribuciones Industriales Andinas S.A.C.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Empresas", null, {});
  },
};
