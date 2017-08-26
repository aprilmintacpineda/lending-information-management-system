import { ipcMain } from 'electron';
import PasswordHash from 'password-hash';
import models from '../../../models';

ipcMain.on('LOGIN', (event, arg) => {
  models.admins.findAll({
    limit: 1,
    offset: 0
  }).then(user_data => {
    if(PasswordHash.verify(arg.password, user_data[0].dataValues.password)) {
      event.sender.send('LOGIN_SUCCESSFUL');
    } else {
      event.sender.send('LOGIN_FAILED', {
        errors: ['Password is incorrect.']
      });
    }
  });
});