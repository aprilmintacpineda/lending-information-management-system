import path from 'path';
import Sequelize from 'sequelize';
import contactNumber from './contactNumber';
import loan from './loan';
import Database from '../main_process/Database';

const DB = new Database;

let borrower = DB.createModel('borrower', {
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

borrower.hasMany(contactNumber, {
  foreignKey: 'borrower_id',
  localKey: 'id'
});

borrower.hasMany(loan, {
  foreignKey: 'borrower_id',
  localKey: 'id'
});

DB.sync();

export default borrower;