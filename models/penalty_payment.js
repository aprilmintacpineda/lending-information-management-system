import path from 'path';
import Sequelize from 'sequelize';
import Database from '../main_process/Database';

const DB = new Database;

let penalty_payment = DB.createModel('penalty_payment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false
  },
  penalty_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false
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
  charset: 'latin1',
  timestamps: false,
  tableName: 'penalty_payments'
});

export default penalty_payment;