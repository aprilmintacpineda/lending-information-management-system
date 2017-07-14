import path from 'path';
import Sequelize from 'sequelize';
import Database from '../main_process/Database';

const DB = new Database;

export default DB.createModel('contact_number', {
  borrower_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: false
  },
  number: {
    type: Sequelize.STRING('20'),
    primaryKey: true
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