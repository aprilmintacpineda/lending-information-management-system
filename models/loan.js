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
  interest_rate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  interest: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  profit: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  months_to_pay: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  per_month: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  per_day: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  fully_paid: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  apply_interest: {
    type: Sequelize.BOOLEAN,
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