'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rols', [
      {
        nombre: 'Administrador',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Secretaria',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Rols', null, {});
  },
};
