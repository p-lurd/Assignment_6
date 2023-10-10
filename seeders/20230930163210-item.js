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
   await queryInterface.bulkInsert('items',[
    {
      name: 'rice',
      price:'200.00',
      size:'small',
      quantity: '4',
      category_id: '1'
    },
    {
      name: 'beans',
      price:'300.00',
      size:'small',
      quantity: '2',
      category_id: '1'
    },
    {
      name: 'fish',
      price:'500.00',
      size:'medium',
      quantity: '5',
      category_id: '1'
    },
    {
      name: 'egg',
      price:'150.00',
      size:'small',
      quantity: '2',
      category_id: '1'
    },
    {
      name: 'bread',
      price:'600.00',
      size:'large',
      quantity: '6',
      category_id: '1'
    },
    {
      name: 'onions',
      price:'300.00',
      size:'medium',
      quantity: '2',
      category_id: '1'
    },
    {
      name: 'yams',
      price:'3000.00',
      size:'small',
      quantity: '5',
      category_id: '1'
    },
    {
      name: 'milk',
      price:'1200.00',
      size:'small',
      quantity: '20',
      category_id: '1'
    },
    {
      name: 'milo',
      price:'800.00',
      size:'small',
      quantity: '12',
      category_id: '1'
    },
    {
      name: 'sugar',
      price:'300.00',
      size:'small',
      quantity: '2',
      category_id: '1'
    },{
      name: 'cray_fish',
      price:'300.00',
      size:'small',
      quantity: '15',
      category_id: '1'
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
  }
};
