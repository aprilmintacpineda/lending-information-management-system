import { ipcMain } from 'electron';
import path from 'path';
import Database from '../../Database';
import Admin from '../../../models/admin';
import PasswordHash from 'password-hash';

ipcMain.on('LOGIN', (event, arg) => {
  const DB = new Database;

  Admin.findAll({
    limit: 1,
    offset: 0
  }).then(user_data => {
    DB.closeConnection();

    if(PasswordHash.verify(arg.password, user_data[0].dataValues.password)) {
      event.sender.send('LOGIN_SUCCESSFUL');
    } else {
      event.sender.send('LOGIN_FAILED', {
        errors: ['Password is incorrect.']
      });
    }
  });
});