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
        allowNull: false
      },
      loan_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      interest: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      interest_type: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      profit: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      interest_rate: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      months_to_pay: {
        type: Sequelize.INTEGER
      },
      payment_method: {
        type: Sequelize.INTEGER
      },
      expected_date_of_payment: {
        type: Sequelize.DATE
      },
      per_month: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      per_semi_month: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      per_day: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      condition_applied: {
        type: Sequelize.STRING(50),
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
    return queryInterface.dropTable('loans');
  }
};
