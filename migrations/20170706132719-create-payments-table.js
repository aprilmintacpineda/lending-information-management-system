'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
      },
      loan_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      period_paid: {
        type: Sequelize.DATE,
        allowNull: false
      },
      payment_coverage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quarter: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      date_paid: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('payments');
  }
};
