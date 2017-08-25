import path from 'path';
import Sequelize from 'sequelize';
import Database from '../main_process/Database';

const DB = new Database;

let loan_payment = DB.createModel('loan_payment', {
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
  charset: 'latin1',
  timestamps: false,
  tableName: 'loan_payments'
});

export default loan_payment;