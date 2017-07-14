'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('contact_numbers', {
      borrower_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false
      },
      number: {
        type: Sequelize.STRING('20'),
        primaryKey: true
      },
      created_at: {
        type: Sequelize.NOW,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      charset: 'latin1'
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('contact_numbers');
  }
};
