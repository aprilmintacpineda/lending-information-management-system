import path from 'path';
import Sequelize from 'sequelize';
import Database from '../main_process/Database';

const DB = new Database;

export default DB.createModel('penalty', {
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
    type: Sequelize.FLOAT,
    allowNull: false
  },
  remarks: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  was_waved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  date_waved: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  date_given: {
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
  charset: 'latin1',
  timestamps: false,
  tableName: 'penalties'
});