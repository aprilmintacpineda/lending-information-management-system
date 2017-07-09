'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('loans', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
      },
      borrower_id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      interest: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fully_paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    return queryInterface.dropTable('loans');
  }
};
