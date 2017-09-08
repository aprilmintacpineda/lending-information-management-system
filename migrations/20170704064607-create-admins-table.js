'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('admins', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: false,
        autoIncrement: false
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      firstname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      middlename: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      gender: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      birth_date: {
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
    return queryInterface.dropTable('admins');
  }
};
