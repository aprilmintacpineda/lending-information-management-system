import path from 'path';
import Sequelize from 'sequelize';
import Database from '../main_process/Database';
import borrower from './borrower';
import loan_payment from './loan_payment';
import penalty from './penalty';

const DB = new Database;

let loan = DB.createModel('loan', {
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
    type: Sequelize.BIGINT,
    allowNull: false
  },
  interest: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  interest_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  profit: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  interest_rate: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  months_to_pay: {
    type: Sequelize.INTEGER
  },
  payment_method: {
    type: Sequelize.INTEGER
  },
  per_month: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  per_semi_month: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  per_day: {
    type: Sequelize.INTEGER,
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
  charset: 'latin1',
  timestamps: false
});

loan.hasMany(loan_payment, {
  foreignKey: 'loan_id',
  localKey: 'id'
});

loan.hasMany(penalty, {
  foreignKey: 'loan_id',
  localKey: 'id'
});

export default loan;