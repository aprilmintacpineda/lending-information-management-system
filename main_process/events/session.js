import { ipcMain } from 'electron';
import path from 'path';
import Admin from '../../models/admin';
import Database from '../Database';

ipcMain.on('SESSION_CHECK', (event, arg) => {
  const DB = new Database;

  Admin.findAll().then(admins => {
    DB.closeConnection();
    event.sender.send('SESSION_CHECK_SUCCESSFUL', {
      accounts: admins.length
    });
  });
});

ipcMain.on('SESSION_GET_USER_DATA', (event, arg) => {
  const DB = new Database;

  Admin.findAll({
    limit: 1,
    offset: 0
  }).then(user_data => {
    DB.closeConnection();
    event.sender.send('SESSION_GET_USER_DATA_SUCCESSFUL', {
      user_data: user_data[0].dataValues
    });
  });
});