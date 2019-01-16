'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('eyeglasses', [{
          holder_name: 'Rayban',
          purchase_price: 20.0,
          price: 30.5,
          vat: '23%',
          availability: 3,
          color: 'red',
          size: 'small',
          salon: 'Piwniczna',
      },
          {
              holder_name: 'Belutti',
              purchase_price: 20.0,
              price: 30.5,
              vat: '23%',
              availability: 3,
              color: 'red',
              size: 'small',
              salon: 'Poniatowskiego',
          }
      ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
