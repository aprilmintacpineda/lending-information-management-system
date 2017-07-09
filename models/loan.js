import path from 'path';
import Sequelize from 'sequelize';
import Database from '../main_process/Database';

const DB = new Database;

export default DB.createModel('loan', {
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
  created_at: {
    type: Sequelize.NOW,
    allowNull: false
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false
  }
}, {
  charset: 'latin1',
  timestamps: false
});