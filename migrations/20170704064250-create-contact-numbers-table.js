'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('contact_numbers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
      },
      borrower_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      number: {
        type: Sequelize.STRING('20'),
        allowNull: false
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
