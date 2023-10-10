'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users',[
    {
      id: 'c850f0be-ef42-4dc1-a6bb-3903141e7305',
      name: 'John',
      email: 'john@altschool.com',
      password: 'John123',
      phone_number: '234567899',
      gender: 'male',
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', {
      email: 'john@altschool.com'
    })
  }
};
