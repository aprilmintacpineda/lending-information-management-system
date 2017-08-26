import { ipcMain } from 'electron';
import models from '../../models';

ipcMain.on('SESSION_CHECK', (event, arg) => {
  models.admins.findAll().then(admins => {
    event.sender.send('SESSION_CHECK_SUCCESSFUL', {
      accounts: admins.length
    });
  });
});

ipcMain.on('SESSION_GET_USER_DATA', (event, arg) => {
  models.admins.findAll({
    limit: 1,
    offset: 0
  }).then(user_data => {
    event.sender.send('SESSION_GET_USER_DATA_SUCCESSFUL', {
      user_data: user_data[0].dataValues
    });
  });
});