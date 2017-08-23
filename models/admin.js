import path from 'path';
import Sequelize from 'sequelize';
import Database from '../main_process/Database';

const DB = new Database;

export default DB.createModel('admin', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
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
  birth_date: {
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
  timestamps: false
});