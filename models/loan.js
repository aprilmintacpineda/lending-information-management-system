import path from 'path';
import Sequelize from 'sequelize';
import Database from '../main_process/Database';
import borrower from './borrower';
import payment from './payment';

const DB = new Database;

let loan = DB.createModel('loan', {
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
  loan_date: {
    type: Sequelize.DATE,
    allowNull: false
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
    type: Sequelize.INTEGER
  },
  payment_method: {
    type: Sequelize.INTEGER
  },
  per_month: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  per_day: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  terms_applied: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  fully_paid: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
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

loan.hasMany(payment, {
  foreignKey: 'loan_id',
  localKey: 'id'
});

export default loan;