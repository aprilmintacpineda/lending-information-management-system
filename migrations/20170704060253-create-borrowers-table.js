'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('borrowers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: false,
        primaryKey: true
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
      address: {
        type: Sequelize.STRING(255),
        defaultValue: null
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
   return queryInterface.dropTable('borrowers');
  }
};
